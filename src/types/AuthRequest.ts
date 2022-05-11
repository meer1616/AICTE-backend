// import { User } from './../Entities/User';
// import { Request } from "express";
import { Request as ExpressRequest } from 'express';


// export type AuthRequest = Request & { email: string };

export interface Request extends ExpressRequest {
    email: string;
}