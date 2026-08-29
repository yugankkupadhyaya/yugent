import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    duration: {
        type: String,
        required: true,
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    youtube: {
        type: String,
        default: "",
    },

    article: {
        type: String,
        default: "",
    },
},
    {
        _id: false,
    })

const roadmapSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },

    title: {
        type: String,
        required: true,
    },

    targetPackage: {
        type: String,
        required: true,
    },

    duration: {
        type: String,
        required: true,
    },

    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },

    modules: {
        type: [moduleSchema],
        default: [],
    },

}, { timestamps: true })


const Roadmap = mongoose.model("Roadmap",roadmapSchema)

export default Roadmap