import { Request, Response } from "express"
import { User } from "../Entities/User";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

export const getUserEmail = async (req: Request, res: Response) => {
    console.log("forget password", req.body);

    const { email } = req.body
    const userWithEmail = await User.findOne({ where: { email: email } });
    console.log("userWithEmail", userWithEmail);
    if (!userWithEmail) {
        return res.status(404).json({ success: false, message: "User not found" })
    }

    const secret = `${process.env.ACCESS_TOKEN_SECRET}${userWithEmail.hashedPassword}`
    const payload = {
        email,
        id: userWithEmail.id
    }

    const token = jwt.sign(payload, secret, { expiresIn: '15m' })
    const link = `http://localhost:4000/api/v1/reset-password/${userWithEmail.id}/${token}`
    console.log("link", link);

    res.status(200).json({ success: true, message: "password reset link sent to your email successfully" })

}