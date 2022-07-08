
import { AppDataSource } from "../ormconfig"
import { Express, Request, Response, NextFunction } from 'express';
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute"
import loginRoute from "./routes/auth/LoginRoute"
import RefreshTokenRoute from "./routes/auth/RefreshTokenRoute"
import logoutRoute from "./routes/auth/LogoutRoute"
import cellsRoute from "./routes/cellsRoute"
import auditoriumRoute from "./routes/auditoriumRoute"
import restaurantRoutes from "./routes/restaurantRoute"
import foodItemRoutes from "./routes/FoodItemRoutes"
import orderRoute from "./routes/orderRoute"
import meetingRoute from "./routes/meetingsRoute"
import forgetPasswordRoute from "./routes/forgetPasswordRoute"
import resetPasswordRoute from "./routes/resetPasswordRoute"
import dotenv from "dotenv"
import { verifyJWT } from "./middleware/verifyAuth";
// import { AuthRequest } from "./types/AuthRequest";
dotenv.config()
const app: Express = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
const base = '/api/v1'
app.get(`${base}/hi`, (req, res) => {
    res.send("Hi there")
})

AppDataSource.initialize().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())


app.use(`${base}/reset-password`, resetPasswordRoute)
app.use(`${base}/register`, UserRoute)
app.use(`${base}/login`, loginRoute)
app.use(`${base}/refresh`, RefreshTokenRoute)
app.use(`${base}/logout`, logoutRoute)
app.use(`${base}/forget-password`, forgetPasswordRoute)

app.use(verifyJWT)

app.use(`${base}/cells`, cellsRoute)
app.use(`${base}/auditorium`, auditoriumRoute)
app.use(`${base}/meetings`, meetingRoute)
app.use(`${base}/restaurant`, restaurantRoutes)
app.use(`${base}/fooditem`, foodItemRoutes)
app.use(`${base}/order`, orderRoute)

app.use(`*`, (req, res) => {
    res.send("route not found")
})

// const PORT = process.env.PORT || 4000
const PORT = 4000
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})