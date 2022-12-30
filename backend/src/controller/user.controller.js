const express = require('express');
const {users,validate} = require("../models/user.model");
const bycrypt = require("bcrypt");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validObjectId");

 const router = express.Router();

  //create user
  router.post("/createuser",async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});

    const user = await users.findOne({email:req.body.email});
    if(user) return res.status(403).send({message:"User with given email already in use"});

    const salt = await bycrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bycrypt.hash(req.body.password, salt);
    let newUser = await new users({
        ...req.body,
        password:hashPassword
    }).save();
    newUser.password = undefined;
    newUser._v = undefined;

    res.status(200).send({data:newUser, message:"Account got created"});
  })


  // get all users
router.get("/allUsers", admin, async (req, res) => {
	const user = await users.find().select("-password -__v");
	res.status(200).send({ data: user });
});

// get user by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await users.findById(req.params.id).select("-password -__v");
	res.status(200).send({ data: user });
});

// update user by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await users.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200).send({ data: user, message: "Profile updated successfully" });
});

// delete user by id
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await users.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Successfully deleted user." });
});
//  router.get('/getDepartment',async (req,res)=>{
//      const departmentInstance = await department.find({});
//      res.send(departmentInstance);
//  })
 
// router.post('/department',async(req,res)=>{
//     console.log("reuest came",req.body);
//     let departmentName = await department.create(req.body);
//     res.status(201).send(departmentName);  //63a849a47d8553978be2c04e //63a849a47d8553978be2c04ec
// })

module.exports = router;