import { User } from "./src/Entities/User";
import { DataSource } from "typeorm";
import { Cells } from "./src/Entities/Cells";
import { Auditorium } from "./src/Entities/Auditorium";
import { Restaurant } from "./src/Entities/Restaurant";
import { FoodItems } from "./src/Entities/FoodItem";
import { Order } from "./src/Entities/Order";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "KSP135246@m",
    database: "aicte",
    entities: [User, Cells, Auditorium, Restaurant, FoodItems, Order],
    synchronize: true,
    logging: true,
})