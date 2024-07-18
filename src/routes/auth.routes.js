import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {configDotenv } from "dotenv";

const router = Router();

router.post("/auth/register", async (req, res) => {
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

router.post("/auth/login", async function login(req, res){
    try{
        const user = await User.findOne({email: req.body.email});
        if(user !== null){
            const hashValido = await bcrypt.compare(req.body.password, user.password);
        if(hashValido){
            const tokenPayload = {
                sub: user.id,
                iat: Date.now()
            };
            const token = jwt.sign(tokenPayload, `${process.env.JWT_SECRET_KEY}`);
            res.json({token: token});
        }else {
            res.json("Incorrect credentials");
        }
        }else {
            res.json("Cannot find user");
        }
    }catch(error){
        res.status(500).json("Server error");
        console.log(error)
    }
});

router.get("/user/validate", async (req, res) => {
if(req.auth){
    return true
} else {
    return false
}
});





const authRouter = router;

export default authRouter;
