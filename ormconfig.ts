import { User } from "./src/Entities/User";
import { DataSource } from "typeorm";
import { Cells } from "./src/Entities/Cells";
import { Auditorium } from "./src/Entities/Auditorium";
import { Restaurant } from "./src/Entities/Restaurant";
import { FoodItems } from "./src/Entities/FoodItem";
import { Order } from "./src/Entities/Order";
import dotenv from "dotenv"
dotenv.config()




export const AppDataSource = new DataSource({
    // type: "postgres",
    // host: process.env.Host,
    // port: process.env.Port,
    // username: "postgres",
    // password: "KSP135246@m",
    // database: "aicte",
    // entities: [User, Cells, Auditorium, Restaurant, FoodItems, Order],
    // synchronize: true,
    // logging: true,
    type: "postgres",
    host: process.env.Host,
    port: Number(process.env.Port),
    username: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
    entities: [User, Cells, Auditorium, Restaurant, FoodItems, Order],
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false
    }
})