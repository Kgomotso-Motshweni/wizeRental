const jwt = require("jsonwebtoken");
const random = require('../Controllers/authentication')
module.exports = (req, res) => {
    try {
        const token = req.header("token");
        var decoded = jwt.verify(token, random.SECRET_KEY );
        res.status(200).json({decoded})
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};

