// import { User } from './../Entities/User';
// import { Request } from "express";
import { Request as ExpressRequest } from 'express';
import { reqUserType } from './reqUserType';


// export type AuthRequest = ExpressRequest & { email?: string, roles?: number[] };
export type AuthRequest = ExpressRequest & { userId?: string, user?: reqUserType };

export interface Request extends ExpressRequest {
    roles: number[];
    email: string;
}