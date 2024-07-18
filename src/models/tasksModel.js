import mongoose from "../config/database.config.js";

const tasksSchema = mongoose.Schema({
    id: String,
    title: String,
    description: String
});

const Tasks = mongoose.model("Tasks", tasksSchema);

export default Tasks;
