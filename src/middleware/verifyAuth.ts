import { AuthRequest } from './../types/AuthRequest';
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


export const verifyJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        // let dataOfUser
        // console.log("req header", req.headers)
        console.log("req header auth", req.headers['authorization']);

        const token = req.headers['authorization']?.split(" ")[1];
        if (!token) return res.status(401).json({ messsage: "Unauthorized" })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', async (err, user: any) => {
            // console.log(err);
            // console.log(user, "userrrrr");

            if (user) {

                const findemail = async (data: any) => {
                    // verify that user exist or not
                    const verifyUser = await User.findOne({
                        where: { email: data.UserInfo.useremail }
                    });
                    // console.log("finding", data);

                    if (!verifyUser) return res.status(401).json({ message: "Unauthorized User" })
                    req.email = verifyUser.email
                    req.roles = verifyUser.role

                    next()
                }
                findemail(user)
            }
            else if (err?.message === 'jwt expired') {
                return res.json({ statuscode: 190, success: false, message: err.message })
            }
            else {
                return res.status(403).json({ success: false, message: "user not authenticated" })
            }
        }



        )

    } catch (error) {

        return res.status(500).json({ message: "Server error" })
    }


}
