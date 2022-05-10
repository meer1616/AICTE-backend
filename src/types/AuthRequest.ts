import { User } from './../Entities/User';
import { Request } from "express";

export type AuthRequest = Request & { userId?: number; user?: User };