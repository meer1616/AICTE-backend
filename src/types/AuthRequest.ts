// import { User } from './../Entities/User';
// import { Request } from "express";
import { Request as ExpressRequest } from 'express';


export type AuthRequest = ExpressRequest & { email?: string, roles?: number[] };

export interface Request extends ExpressRequest {
    roles: number[];
    email: string;
}