import { User } from "./src/Entities/User";
import { DataSource } from "typeorm";
import { Cells } from "./src/Entities/Cells";
import { Auditorium } from "./src/Entities/Auditorium";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "KSP135246@m",
    database: "aicte",
    entities: [User, Cells, Auditorium],
    synchronize: true,
    logging: true,
})