import { User } from './../../Entities/User';
import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(204);
    const refreshToken = cookie.jwt;

    const foundUser = await User.findOne({ where: { refreshToken } })
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = ""
    const result = await foundUser.save()
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);

}