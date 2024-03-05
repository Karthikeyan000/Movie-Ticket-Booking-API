const jwt =require('jsonwebtoken')

const generateToken=(user)=>jwt.sign({id:user.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'7d'})

module.exports=generateToken