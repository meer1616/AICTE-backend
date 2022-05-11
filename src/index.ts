import { AppDataSource } from "../ormconfig"
import { Express, Request, Response, NextFunction } from 'express';
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute"
import loginRoute from "./routes/auth/LoginRoute"
import RefreshTokenRoute from "./routes/auth/RefreshTokenRoute"
import logoutRoute from "./routes/auth/LogoutRoute"
import dotenv from "dotenv"
import { verifyJWT } from "./middleware/verifyAuth";
// import { AuthRequest } from "./types/AuthRequest";
dotenv.config()
const app: Express = express();

AppDataSource.initialize().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/register', UserRoute)
app.use('/api/v1/login', loginRoute)
app.use('/api/v1/refresh', RefreshTokenRoute)
app.use('/api/v1/logout', logoutRoute)

app.use(verifyJWT as unknown as express.RequestHandler)
// app.use('/api/v1/logout', logoutRoute)

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');

})