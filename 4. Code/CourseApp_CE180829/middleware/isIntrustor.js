module.exports = (req, res, next) => {
    if (req.user.role !== "instructor") {
        return res.status(403).json({ message: "Instructor only" });
    }
    next();
};