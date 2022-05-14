import { User } from "./src/Entities/User";
import { DataSource } from "typeorm";
import { Cells } from "./src/Entities/Cells";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "KSP135246@m",
    database: "aicte",
    entities: [User, Cells],
    synchronize: true,
    logging: true,
})