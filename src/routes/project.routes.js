import Project from "../models/projectModel.js";
import { Router } from "express";

const router = Router();

router.post("/project", async (req, res) => {
    try{
        const newProject = await Project.create({
            title: req.body.title,
            user: req.body.user,
            tasks: req.body.tasks
        })
        res.json(newProject);
    }catch(error){
        res.status(500).json("Server error")
    }
});

router.get("/project", async (req, res) => {
    try {
        const listProject = await Project.find(req.body);
        res.json(listProject);
    } catch(error){
        res.status(500).json("Server error")
    }
});

router.get("/project/:id", async (req, res) => {
    try{
        const findProject = await Project.findById(req.params.id);
         res.json(findProject);
    }catch(error){
        res.status(500).json("Server error")
    }
});

router.patch("/project/:id", async (req, res) => {
    try{
        const getProject = await Project.findById(req.params.id);
        const newProject = req.body;

        getProject.title = newProject.title || getProject.title;
        getProject.user = newProject.user || getProject.user;
        getProject.tasks = newProject.tasks || getProject.tasks;

        await getProject.save();
        res.json(getProject);
    }catch(error){
        res.status(500).json("Server error");
        console.log(error)
    }
})

router.delete("/project/:id", async (req, res) => {
    try{
        const deleteProject = await Project.findByIdAndDelete(req.params.id);
        res.json("Projecto eliminado");
    }catch (error){
        res.status(500).json("Server error");
        console.log(error)
    }
})

const projectRouter = router;
export default projectRouter;