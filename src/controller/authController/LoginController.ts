import { User } from './../../Entities/User';
import { Request, Response } from "express"
import { compare } from 'bcrypt';
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
// declare namespace NodeJS { export interface ProcessEnv { HOST: string; DB_URL: string; DB_NAME?: string; } }
dotenv.config();


export const LoginRoute = async (req: Request, res: Response) => {

    const { email, password } = req.body
    console.log(email, password);
    if (!email || !password) return res.status(400).json({ message: "Username and Password are required." })

    const foundUser = await User.findOne({ where: { email: email } })
    if (!foundUser) return res.status(401).json({ message: "Unauthorized user" })

    const match = await compare(password, foundUser.hashedPassword)
    if (match) {

        const accessToken = jwt.sign({
            "userName": foundUser.email
        },
            process.env.ACCESS_TOKEN_SECRET || "",
            { expiresIn: '50s' }
        )

        const refreshToken = jwt.sign({
            "userName": foundUser.email
        },
            process.env.REFRESH_TOKEN_SECRET || "",
            { expiresIn: '1hr' }
        )

        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result);
        return res.json({ foundUser, accessToken })
    }
    // else {
    return res.sendStatus(401)
    // }

}

