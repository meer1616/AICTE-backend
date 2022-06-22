"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const User_1 = require("./src/Entities/User");
const typeorm_1 = require("typeorm");
const Cells_1 = require("./src/Entities/Cells");
const Auditorium_1 = require("./src/Entities/Auditorium");
const Restaurant_1 = require("./src/Entities/Restaurant");
const FoodItem_1 = require("./src/Entities/FoodItem");
const Order_1 = require("./src/Entities/Order");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "KSP135246@m",
    database: "aicte",
    entities: [User_1.User, Cells_1.Cells, Auditorium_1.Auditorium, Restaurant_1.Restaurant, FoodItem_1.FoodItems, Order_1.Order],
    synchronize: true,
    logging: true,
});
//# sourceMappingURL=ormconfig.js.map