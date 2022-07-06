import { Response, NextFunction } from "express";
import { AuthRequest, Request } from "../types/AuthRequest";
import { Role } from "../utilitiy/Roles";


// export const authRoles = async (role: number) => {
//     return async (req: AuthRequest, res: Response, next: NextFunction) => {
//         // if (req.user.role !== role) {
//         // return res.status(401).json({ message: 'Unauthorized' });
//         // }
//         // console.log("role", role);

//         console.log("req in authrole", req.email);
//         // return res.status(401).json({ message: 'ok' });
//         next()
//     }

// }

export const authSuperAdminRole = async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("req in authSuperrole", req.roles);
    try {

        if (req.roles?.toString().includes(Role.SUPERADMIN)) {
            console.log(`you can access `);
            next()
        }
        else {
            console.log(`you cannot access with email ${req.email}`);
            return res.status(401).json({ message: 'unauthorized user' });
        }
    } catch (error) {
        console.log("error in authSuperrole", error.message);

    }
}


export const authAdminRole = async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("req in authadminrole", req.roles);
    try {

        if (req.roles?.toString().includes(Role.ADMIN)) {
            console.log(`you can access `);
            next()
        }
        else {
            console.log(`you cannot access with email ${req.email}`);
            return res.status(401).json({ message: 'unauthorized user' });
        }
    } catch (error) {
        console.log("error in authadminrole", error.message);

    }
}

export const authUserRole = async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("req in authUserrole", req.roles);
    try {

        if (req.roles?.toString().includes(Role.User)) {
            console.log(`you can access `);
            next()
        }
        else {
            console.log(`you cannot access with email ${req.email}`);
            return res.status(401).json({ message: 'unauthorized user' });
        }
    } catch (error) {
        console.log("error in authUserrole", error.message);

    }
}
