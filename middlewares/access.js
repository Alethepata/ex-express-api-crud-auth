const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({status: 401, error:"Non hai i permessi"});
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => { 
        if (err) {
            res.status(403).json({status: 403, error:"Token non valido"});
        }
        req.user = data;
        next();
    })


}