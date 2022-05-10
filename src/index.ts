import { AppDataSource } from "../ormconfig"
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute"
import loginRoute from "./routes/auth/LoginRoute"
import dotenv from "dotenv"
dotenv.config()
const app = express();

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

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');

})