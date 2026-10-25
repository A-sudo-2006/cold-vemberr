import jwt from "jsonwebtoken"
import User from "../model/auth.model.js"

export const authMiddleware = async(req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            msg: "Bearer token is required"
        })
    }

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not configured")
        return res.status(500).json({
            success: false,
            msg: "Server configuration error"
        })
    }

    let decodedToken
    try {
        decodedToken = jwt.verify(authorization.slice(7), process.env.JWT_SECRET)
    } catch {
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token"
        })
    }

    try {
        const user = await User.findById(decodedToken.userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "User not found"
            })
        }

        req.user = user
        next()
    } catch (err) {
        console.error("auth middleware error:", err.message)
        return res.status(500).json({
            success: false,
            msg: "Server error"
        })
    }
}
