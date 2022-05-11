import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import * as dotenv from "dotenv"
import { User } from '../../Entities/User';
dotenv.config()

export const Refresh = async (req: Request, res: Response) => {
    const cookie = req.cookies;
    console.log("cookie", cookie);

    if (!cookie?.jwt) return res.sendStatus(401);
    const refreshToken = cookie.jwt;

    const foundUser = await User.findOne({ where: { refreshToken } })
    if (!foundUser) return res.sendStatus(403);

    return jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET || '',
        (err: any, decode: any) => {
            if (err || foundUser.email !== decode.email) return res.sendStatus(403)
            const accessToken = jwt.sign({
                "email": foundUser.email
            },
                process.env.ACCESS_TOKEN_SECRET || "",
                { expiresIn: '5m' })

            return res.json({ roles: foundUser.role, accessToken })
        }
    )

}