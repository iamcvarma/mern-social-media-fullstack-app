import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//register
export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      ...req.body,
      password: passwordHash,
      viewedProfile: 0,
      impressions: 0,
    });

    const newSavedUser = await newUser.save();
    delete newSavedUser._doc.password
    res.status(201).json({ data: newSavedUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


//logging

export const login  = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({
            email:email
        })

        if (!user) return res.status(400).json({message:'user not found'})
        
        const isMatch = bcrypt.compare(password,user.password)

        if (!isMatch) return res.status(400).json({message:"invalid credentials"})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        
        delete user._doc.password;
        
        res.status(200).json({token,user})

    } catch(e){
        res.status(500).json({err:e.message})
    }
}