const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) =>{
    //extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});
    try {
        //verify the JWT token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to the request object
        req.user = decoded
        next();
    } catch (err) {
        console.error(err)
        res.status(401).json({error:'invalid token'});
    }
}

//Function to generate JWT token
const generatetoken = (userData)=>{
    //Generate a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET);
}


module.exports = {jwtAuthMiddleware,generatetoken}