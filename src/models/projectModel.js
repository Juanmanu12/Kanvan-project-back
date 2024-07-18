import mongoose from "../config/database.config.js";

const projectSchema = mongoose.Schema({
    id: String,
    title: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    tasks:[ {
        type: mongoose.Types.ObjectId,
        ref: "Tasks"
        
    } ]
})

const Project = mongoose.model("Project", projectSchema);

export default Project;