import redis from "../../../shared/redis/redis.js";
import graph from "../graph/roadmap.graph.js";
import Roadmap from "../models/roadmap.model.js";

const trustedUserId = (req) => req.headers["x-clerk-user-id"];
const validUserId = (userId) => typeof userId === "string" && userId.trim().length > 0;

const cacheGet = async (key) => {
  try { return await redis.get(key); }
  catch (error) { console.error("Roadmap cache read failed:", error.message); return null; }
};
const cacheSet = async (key, value) => {
  try { await redis.set(key, value); }
  catch (error) { console.error("Roadmap cache write failed:", error.message); }
};
const cacheDelete = async (key) => {
  try { await redis.del(key); }
  catch (error) { console.error("Roadmap cache invalidation failed:", error.message); }
};

export const generateRoadmap = async (req, res) => {
  try {
    const {
      role,
      targetPackage,
      useResume = false,
      resume,
    } = req.body;

    const userId = trustedUserId(req);

    if (!validUserId(userId)) {
      return res.status(400).json({
        success: false,
        message: "User identity is required",
      });
    }

    if (!role || !targetPackage) {
      return res.status(400).json({
        success: false,
        message: "Role and Target Package are required.",
      });
    }

    if (useResume && !resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required.",
      });
    }

    const result = await graph.invoke({
      role,
      targetPackage,
      useResume,
      resume,
    });

    const roadmap = await Roadmap.create({
      userId,
      ...result.roadmap,
    });

    await cacheSet(`roadmap:${userId}:${roadmap._id}`, JSON.stringify(roadmap));
    await cacheDelete(`roadmaps:${userId}`);

    return res.status(201).json({
      success: true,
      message: "Roadmap generated successfully.",
      data: roadmap,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRoadmap = async (req, res) => {
  try {
    const userId = trustedUserId(req);

    if (!validUserId(userId)) {
      return res.status(400).json({
        success: false,
        message: "User identity is required",
      });
    }

    const cache = await cacheGet(`roadmaps:${userId}`);
    if (cache) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cache),
      });
    }

    const roadmaps = await Roadmap.find({ userId }).sort({ createdAt: -1 });

    await cacheSet(`roadmaps:${userId}`, JSON.stringify(roadmaps));

    return res.json({
      success: true,
      data: roadmaps,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoadmapbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = trustedUserId(req);

    if (!validUserId(userId)) {
      return res.status(400).json({
        success: false,
        message: "User identity is required",
      });
    }

    const cache = await cacheGet(`roadmap:${userId}:${id}`);
    if (cache) {
      return res.json({
        success: true,
        fromCache: true,
        data: JSON.parse(cache),
      });
    }

    const roadmap = await Roadmap.findOne({
      _id: id,
      userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    await cacheSet(`roadmap:${userId}:${id}`, JSON.stringify(roadmap));

    return res.json({
      success: true,
      fromCache: false,
      data: roadmap,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
