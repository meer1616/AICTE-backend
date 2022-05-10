import { User } from "./src/Entities/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "KSP135246@m",
    database: "aicte",
    entities: [User],
    synchronize: true,
    logging: true,
})