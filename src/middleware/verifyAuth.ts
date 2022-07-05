import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../Entities/User";
import { Request } from "../types/AuthRequest";

declare module 'express-serve-static-core' {
    interface AuthRequest {
        newResp: Request & { email: string }
    }
}

// interface JWT_DECODE {
//     UserInfo: {
//         useremail: string;
//         roles: string[];
//     }
// }


export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // let dataOfUser
        // console.log("req header", req.headers)
        console.log("req header auth", req.headers['authorization']);

        const token = req.headers['authorization']?.split(" ")[1];
        if (!token) return res.status(401).json({ messsage: "Unauthorized" })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, user) => {
            // console.log(err);
            if (user) {

                const findemail = async (data: any) => {

                    const user = await User.findOne({
                        where: { email: data.UserInfo.useremail }
                    });
                    // console.log("finding", data);

                    if (!user) return res.status(401).json({ message: "Unauthorized User" })
                    req.email = user.email
                    // console.log("req email", user.email);
                }

                findemail(user)

                next()

            }
            else if (err?.message === 'jwt expired') {
                return res.json({ statuscode: 190, success: false, message: err.message })
            }
            else {
                return res.status(403).json({ success: false, message: "user not authenticated" })
            }
        }

            // if (err) {
            //     if (err?.message === 'jwt expired') {
            //         res.json({ message: 'Token expired' })
            //     }
            //     res.json({ message: err.message })
            // }
            // else {
            //     console.log("reached");
            //     // const findemail = async (data: any) => {

            //     //     const user = await User.findOne({
            //     //         where: { email: data.UserInfo.useremail }
            //     //     });
            //     //     console.log("finding", data);

            //     //     if (!user) return res.status(401).json({ message: "Unauthorized User" })
            //     //     req.email = user.email
            //     //     console.log("req email", user.email);
            //     // }

            //     // findemail(user)

            // }


        )
        // console.log("data", data);

        // return next()

    } catch (error) {

        return res.status(500).json({ message: "Server error" })
    }


}
