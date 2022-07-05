import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import * as dotenv from "dotenv"
import { User } from '../../Entities/User';
dotenv.config()

export const Refresh = async (req: Request, res: Response) => {
    // const cookie = req.cookies;
    // console.log("cookie", cookie);

    // if (!cookie?.jwt) return res.sendStatus(401);
    // const refreshToken = cookie.jwt;
    console.log(req.body.token);

    const refreshToken = req.body.token

    const foundUser = await User.findOne({ where: { refreshToken } })
    console.log("foundUser", foundUser);

    if (!foundUser) return res.send("getting 403 what to do")
    // if (!foundUser) return res.sendStatus(403);
    console.log("process.env.REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET);
    console.log("refreshToken", refreshToken);


    return jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET || '',
        (err: any, decode: any) => {
            console.log("decode", decode);
            if (err || foundUser.email !== decode.UserInfo.useremail) return res.status(403).json({ err })
            const accessToken = jwt.sign({
                "UserInfo": {
                    "useremail": foundUser.email,
                    "roles": foundUser.role
                }
            },
                process.env.ACCESS_TOKEN_SECRET || "",
                { expiresIn: '25m' })
            return res.json({ roles: foundUser.role, accessToken })
        }
    )
}