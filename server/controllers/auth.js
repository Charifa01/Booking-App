const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken')

module.exports.register = async(req,res,next)=>{
    try{
        const {username ,email ,password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            ...req.body,
            password : hashPassword
        })
        await newUser.save()
        res.status(200).json('user has been created')
    }catch(err){
        next(err);
    }
}
module.exports.login = async (req, res, next) => {
    try {
      const user = await Users.findOne({ username: req.body.username });
      if (!user) return res.status(404).json({ error: "User not found!" });
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
      return res.status(400).json({ error: "Wrong password or username!" });
  
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.jwt_secretKey
      );
  
      const { password, isAdmin, ...otherDetails } = user._doc;
      res.cookie("access_token", token, {
        httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
      next(err);
    }
  };