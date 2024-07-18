import Tasks from "../models/tasksModel.js";
import { Router } from "express";

const router = Router();

router.post("/tasks", async (req, res) => {
    try{
        const newTask = await Tasks.create({
            title: req.body.title,
            description: req.body.description
        })
        res.json(newTask);
    }catch(error){
        res.status(500).json("Something went wrong");
        console.log(error);
    }
});

router.get("/tasks", async (req, res) => {
    try {
        const listTasks = Tasks.find(req.body);
        res.status(200).json("Lista de usuarios");
    } catch(error) {
        res.status(500).json("Something went wrong");
        console.log(error);
    }
});

router.get("/tasks/:id", async (req, res) => {
    try {
        const findTask = await Tasks.findById(req.params.id)
        res.status(200).json(findTask);
    } catch(error){
        res.status(500).json("Something went wrong");
        console.log(error);
    }
});

router.patch("/tasks/:id", async(req, res) => {
    try{
        const getTask = await Tasks.findById(req.params.id);
        const newTask = req.body;

        getTask.title = newTask.title || getTask.title;
        getTask.description = newTask.description || getTask.description;

        await getTask.save();
        res.json(getTask);
    }catch(error){
        res.status(500).json("Something went wrong");
        console.log(error);
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try{
        const deleteTask = await Tasks.findByIdAndDelete(req.params.id);
        res.json("Task eliminado");
    }catch(error) {
        res.status(500).json("Something went wrong");
        console.log(error);
    }
})

const tasksRouter = router;

export default tasksRouter;