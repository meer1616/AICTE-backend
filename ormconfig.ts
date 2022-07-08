import { User } from "./src/Entities/User";
import { DataSource } from "typeorm";
import { Cells } from "./src/Entities/Cells";
import { Auditorium } from "./src/Entities/Auditorium";
import { Restaurant } from "./src/Entities/Restaurant";
import { FoodItems } from "./src/Entities/FoodItem";
import { Order } from "./src/Entities/Order";
import dotenv from "dotenv"
import { Meeting } from "./src/Entities/Meetings";
import { Address } from "./src/Entities/Address";
import { ContactInfo } from "./src/Entities/ContactInfo";
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
    entities: [User, Cells, Auditorium, Restaurant, FoodItems, Order, Meeting, Address],
    synchronize: true,
    logging: true,
    migrations: ["src/migration/**/*{.js,.ts}"],
    subscribers: ["src/subscriber/**/*{.js,.ts}"],
    ssl: {
        rejectUnauthorized: false
    }
})