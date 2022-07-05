import { User } from './../../Entities/User';
import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
    console.log("hit logout");

    // const cookie = req.cookies;
    // if (!cookie?.jwt) return res.sendStatus(204);
    // const refreshToken = cookie.jwt;

    const { refreshToken } = req.body;

    const foundUser = await User.findOne({ where: { refreshToken } })
    if (!foundUser) {
        // res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });
        return res.status(404).json({ success: true, message: "user not found" });
    }

    foundUser.refreshToken = ""
    const result = await foundUser.save()
    console.log("logout res", result);

    // res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ success: true, message: `user is successfully logout ` });

}