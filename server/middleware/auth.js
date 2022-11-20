import jwt from "jsonwebtoken";


export const verifyToken = async(req,res,next) =>{
    try{
        const token = req.header("Authorization").split(' ')[1].trimLeft()
        if (!token) return res.status(403).send("access denied")

        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified
        next()
        
    } catch(err){
        res.status(500).json({err:err.message})
    }
}