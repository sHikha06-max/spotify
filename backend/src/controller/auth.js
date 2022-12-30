const express = require("express");
const router = express.Router();
const {users} = require("../models/user.model");
const bycrypt = require("bcrypt");


router.post("/createuser", async(req,res)=>{
    const user = await users.findOne({email:req.body.email});
    if(!user) res.status(400).send({message:"Invalid email or password"});

    const validPassword = await bycrypt.compare(req.body.password,user.password);
    if(!validPassword) res.status(400).send({message:"Invalid email or password"});

    const token = user.generateAuthToken();
    res.status(200).send({data:token,message:"Signin In, please wait....."})
})


module.exports = router;