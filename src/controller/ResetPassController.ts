import { Request, Response } from "express"
import { User } from "../Entities/User";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { hash } from "bcrypt";
import { AppDataSource } from "../../ormconfig";
dotenv.config()


export const resetPassword = async (req: Request, res: Response) => {

    const { id, token } = req.params
    const { password, confirmPassword } = req.body
    console.log("resetPassword", { id, token });

    const userWithEmail = await User.findOne({ where: { id } });

    if (userWithEmail?.id !== id) {
        res.status(404).json({ message: `user with ${id} not found` })
    }
    const secret = `${process.env.ACCESS_TOKEN_SECRET}${userWithEmail?.hashedPassword}`
    try {
        if (password !== confirmPassword) {
            return res.json({ message: "password does not match" })
        }
        const payload = jwt.verify(token, secret)
        console.log("payload in reset password", payload);

        const hashPass = await hash(password, 10);

        await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set({ hashedPassword: hashPass })
            .where("id = :id", { id })
            .execute();
        return res.json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        res.json({ error: error.message })
    }
}

export const getTokenForResetPassword = async (req: Request, res: Response) => {

    const { id, token } = req.params
    console.log("get token for reset password", { id, token });

    const userWithEmail = await User.findOne({ where: { id } });
    console.log("uer with email", userWithEmail);

    if (userWithEmail?.id !== id) {
        res.status(404).json({ message: `user with ${id} not found` })
    }

    const secret = `${process.env.ACCESS_TOKEN_SECRET}${userWithEmail?.hashedPassword}`
    try {
        const payload = jwt.verify(token, secret)
        console.log("payload", payload);

        res.json({ success: true, message: "token verified", data: payload })

    } catch (error) {
        res.json({ error: error.message })
    }
}