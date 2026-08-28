

// pdf  ---->  pdf Storage  ---> text ---> llm ---> agent ---> promt ---> data ---> save mongoDb ---> redis -->pdf delete ---> resume data ( score , missing skills , recommen.)

import redis from "../../../shared/redis/redis.js";
import { resumeAgent } from "../agents/resume.agent.js";
import extractText from "../config/pdf.js";
import Resume from "../models/resume.model.js";
import fs from "fs"

const resumeKey = (userId) => `resume:${String(userId)}`;
const trustedUserId = (req) => req.headers["x-clerk-user-id"];
const validUserId = (userId) => typeof userId === "string" && userId.trim().length > 0;

const cacheGet = async (key) => {
    try { return await redis.get(key); }
    catch (error) { console.error("Resume cache read failed:", error.message); return null; }
};
const cacheSet = async (key, value) => {
    try { await redis.set(key, value); }
    catch (error) { console.error("Resume cache write failed:", error.message); }
};
const cacheDelete = async (key) => {
    try { await redis.del(key); }
    catch (error) { console.error("Resume cache invalidation failed:", error.message); }
};
const cleanupFile = (file) => {
    if (!file) return;
    try { fs.unlinkSync(file.path); }
    catch (error) { console.error("Resume file cleanup failed:", error.message); }
};

const humanizeKey = (key) =>
    String(key)
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const formatValue = (value) => {
    if (value === null || value === undefined) return "";
    if (Array.isArray(value)) return value.map(formatValue).filter(Boolean).join("; ");
    if (typeof value === "object") return objectToSentence(value);
    return String(value).trim();
};

const objectToSentence = (value) =>
    Object.entries(value)
        .map(([key, item]) => {
            const formatted = formatValue(item);
            return formatted ? `${humanizeKey(key)}: ${formatted}` : "";
        })
        .filter(Boolean)
        .join(". ");

const toStringList = (value) => {
    if (!Array.isArray(value)) {
        const formatted = formatValue(value);
        return formatted ? [formatted] : [];
    }

    return value.flatMap((item) => {
        const formatted = formatValue(item);
        return formatted ? [formatted] : [];
    });
};

const toStringField = (value) => formatValue(value);

const toScore = (value) => {
    const score = Number(value);
    if (!Number.isFinite(score)) return 0;
    return Math.max(0, Math.min(100, Math.round(score)));
};

export const normalizeResumeData = (resumeData) => {
    const {
        userId: _ignoredUserId,
        _id: _ignoredId,
        score,
        name,
        email,
        phone,
        summary,
        suggestedRole,
        education,
        skills,
        projects,
        experience,
        strengths,
        weaknesses,
        missingSkills,
        recommendations,
    } = resumeData || {};

    return {
        score: toScore(score),
        name: toStringField(name),
        email: toStringField(email),
        phone: toStringField(phone),
        summary: toStringField(summary),
        suggestedRole: toStringField(suggestedRole),
        education: toStringList(education),
        skills: toStringList(skills),
        projects: toStringList(projects),
        experience: toStringList(experience),
        strengths: toStringList(strengths),
        weaknesses: toStringList(weaknesses),
        missingSkills: toStringList(missingSkills),
        recommendations: toStringList(recommendations),
    };
};

export const uploadResume = async (req,res) => {
    let file;
    try {
        file = req.file;
        if(!file){
            return res.status(400).json({
                success:false,
                message:"Resume PDF is required"
            })
        }
        const userId = trustedUserId(req);

          if(!validUserId(userId)){
            cleanupFile(file);
            return res.status(400).json({
                success:false,
                message:"User identity is required"
            })
        }

        const resumeText = await extractText(file.path)

        const aiResponse = await resumeAgent(resumeText)

        const resumeData = JSON.parse(aiResponse)
        const safeResumeData = normalizeResumeData(resumeData);

        let resume = await Resume.findOne({userId})

        if(resume){
            Object.assign(resume,{
                ...safeResumeData,
                extractedText:resumeText

            }    
            )
            await resume.save()
        }else{
            resume = await Resume.create({
                userId,
                extractedText:resumeText,
                ...safeResumeData
            })
        }

        await cacheSet(resumeKey(userId), JSON.stringify(resume));
        cleanupFile(file);

        return res.status(200).json({
            success:true,
            message:"Resume analyzed successfully",
            data:resume
        })

        
    } catch (error) {
        console.log(error)

        cleanupFile(file);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}


export const getResume = async (req,res) => {
    try {
    const userId = trustedUserId(req);
    if (!validUserId(userId)) return res.status(400).json({ success:false, message:"Valid user identity is required" });

    const cache = await cacheGet(resumeKey(userId));

    if(cache){
        try {
        return res.status(200).json({
            success:true,
            source:"redis",
            data:JSON.parse(cache)
        })
        } catch (parseError) {
            await cacheDelete(resumeKey(userId));
        }
    }
    const resume = await Resume.findOne({userId})

    if(!resume){
        return res.status(404).json({
            success:false,
            message:"resume not found"
        })
    }

    await cacheSet(resumeKey(userId), JSON.stringify(resume));
   

     return res.status(200).json({
            success:true,
            source:"mongoDb",
            data:resume
        })
        
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    


}

export const deleteResume = async (req, res) => {
    try {
        const userId = trustedUserId(req);
        if (!validUserId(userId)) return res.status(400).json({ success:false, message:"Valid user identity is required" });
        const deleted = await Resume.findOneAndDelete({ userId });
        await cacheDelete(resumeKey(userId));
        if (!deleted) return res.status(404).json({ success:false, message:"resume not found" });
        return res.status(200).json({ success:true, message:"Resume deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success:false, message:error.message });
    }
};
