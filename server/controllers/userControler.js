const Users = require('../models/userModel');


    module.exports.updateUser = async (req,res,next)=>{
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.json({ status: true, updatedUser });
      } catch (err) {
        next(err);
      }
}
    module.exports.deleteUser = async (req,res,next)=>{
    try{
        await Users.findByIdAndDelete(req.params.id)
        res.json({ status: true, response : 'the user was deleted' });
    }catch(err){
        next(err);
    }
}
    module.exports.getUser = async (req, res, next) => {
    try {
      const user = await Users.findById(req.params.id);
      res.status(200).json(user )
    } catch (err) {
      next(err);
    }
  };
    module.exports.getAllUsers = async (req,res,next)=>{
    try{
        const users = await Users.find()
         res.status(200).json(users);
     }catch(err){
        next(err);
     }
}