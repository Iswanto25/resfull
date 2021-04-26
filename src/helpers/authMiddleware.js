const jwt = require("jsonwebtoken");

module.exports={
    checkLogin : (req,res, next)=>{
        const bearer = req.header("x-access-token");

        if (!bearer) {
            res.status(401). send({
                msg : "Can't Access",
                status : 401,
                Error : "you must be logged"
            })
        } else {
            const token = bearer.split("")[1]
            try{
            const decodedToken = jwt.verify(token, process.env. SECRET_KEY);
            req.decodedToken = decodedToken;
            next();
            }
            catch(Error){
                res.status(401).send({
                    msg : "Can't Access",
                    status : 401,
                    Error: "invalid token",
                });
            }
        }
        
    }
}