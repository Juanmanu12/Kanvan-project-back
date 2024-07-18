import User from "../models/userModel.js"
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.get("/user", async (req, res) => {
    try{
        const userList = await User.find(req.body);
        res.status(200).json(userList);
    }catch(error){
        res.status(500).json("Server error");
        console.log(error)
    }
});

router.get("/user/:id", async (req, res) => {
    try{
        const findUser = await User.findById(req.params.id)
        res.status(200).json(findUser);
    }catch(error){
        res.status(500).json("Server error")
    }
});

router.post("/user", async (req, res) => {
    try{
        const newPassword = req.body.password;
        const hash = await bcrypt.hash(newPassword, 10);
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        });
        res.status(200).json(newUser);
    }catch(error){
        res.status(500).json("Server error");
        console.log(error)
    }
});

router.patch("/user/:id", async (req, res) => {
    try{
        const getUser = await User.findById(req.params.id);
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = req.body;

        getUser.firstname = newUser.firstname || getUser.firstname;
        getUser.lastname = newUser.lastname || getUser.lastname;
        getUser.email = newUser.email || getUser.email;
        getUser.password = newPassword || getUser.password;

        await getUser.save();
        res.json(getUser);
    }catch(error){
        res.status(500).json("Server error")
        console.log(error);
    }
});

router.delete("/user/:id", async (req, res) =>{
    try{
        const findUser = await User.findByIdAndDelete(req.params.id);
        res.json("Usuario Eliminado");
    }catch(error){
        res.status(500).json("Server error");
        console.log(error);
    }
})

const userRouter = router;

export default userRouter;
