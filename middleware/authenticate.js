const jwt = require('jsonwebtoken');

const authenticate = (req, res, next)=>{
    
    const token = req.header('x-auth-token');

    // check for token
    if(!token){
        res.status(401).json({ message: "No token found, unauthorized User"});
    }
    try{
    // verify token
    const decode = jwt.verify(token, "keepulike" );
    req.user = decode;
    next();
   }
   catch{
       res.status(401).json({
           message: "Invalid Token"
       })
   }
}

module.exports = authenticate;