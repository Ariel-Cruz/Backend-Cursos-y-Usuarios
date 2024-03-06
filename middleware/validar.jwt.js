
import jwt from "jsonwebtoken";

export const  isAuth = (req, res, next) => {
    const access_token = req.headers.token;
    if(!access_token) return res.status(401).json({message: "No hay token"});

    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        req.user = decoded;
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message});
    }
    next()  
}