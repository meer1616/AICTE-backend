import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../Entities/User";
import { Request } from "../types/AuthRequest";

declare module 'express-serve-static-core' {
    interface AuthRequest {
        newResp: Request & { email: string }
    }

}

interface JWT_DECODE {
    email: string;
}
export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers['authorization']?.split(" ")[1];
        if (!token) return res.status(401).json({ messsage: "Unauthorized" })
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '') as JWT_DECODE
        const user = await User.findOne({
            where: { email: data.email }
        });
        if (!user) return res.status(401).json({ message: "Unauthorized User" })
        req.email = user.email
        next()
        return res.sendStatus(200)

    } catch (error) {

        return res.status(500).json({ message: "Server error" })
    }


}
