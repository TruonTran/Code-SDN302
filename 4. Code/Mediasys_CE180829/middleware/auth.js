const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

function verifyToken(req, res, next) {

    const header = req.headers["authorization"];

    if (!header) {
        return res.status(403).json("Token required");
    }

    const token = header.split(" ")[1];

    jwt.verify(token, SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json("Invalid token");
        }

        req.user = decoded;

        next();
    });
}

module.exports = verifyToken;