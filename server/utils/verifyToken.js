const jwt =  require('jsonwebtoken')

const verifyToken = async (req ,res ,next)=>{
    const token = req.cookies.access_token;
    if(!token){
       return next(new Error("You are not authenticated!"));
    }
    jwt.verify(token, process.env.jwt_secretKey,(err,user)=>{
        if(err) return next(new Error("Token is not valid!"));
        req.user = user; // asign a property in the req his name is user 
        next();
        
    })
}
module.exports.verifyToken = verifyToken ;
module.exports.verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(new Error("You are not authorized!"));
      }
    });
  };
  
  module.exports.verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(new Error("You are not authorized!"));
      }
    });
  };