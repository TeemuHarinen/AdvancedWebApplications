const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const autHeader = req.headers["authorization"]
    console.log(autHeader);
    let token;
    if(autHeader) {
        token = autHeader.split(" ")[1];
    } else {
        token = null;
    }
    if(token == null) return res.sendStatus(401);
    console.log("Token found");
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}
