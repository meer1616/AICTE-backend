"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const User_1 = require("./src/Entities/User");
const typeorm_1 = require("typeorm");
const Cells_1 = require("./src/Entities/Cells");
const Auditorium_1 = require("./src/Entities/Auditorium");
const Restaurant_1 = require("./src/Entities/Restaurant");
const FoodItem_1 = require("./src/Entities/FoodItem");
const Order_1 = require("./src/Entities/Order");
const dotenv_1 = __importDefault(require("dotenv"));
const Meetings_1 = require("./src/Entities/Meetings");
const Address_1 = require("./src/Entities/Address");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.Host,
    port: Number(process.env.Port),
    username: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
    entities: [User_1.User, Cells_1.Cells, Auditorium_1.Auditorium, Restaurant_1.Restaurant, FoodItem_1.FoodItems, Order_1.Order, Meetings_1.Meeting, Address_1.Address],
    synchronize: true,
    logging: true,
    migrations: ["src/migration/**/*{.js,.ts}"],
    subscribers: ["src/subscriber/**/*{.js,.ts}"],
    ssl: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=ormconfig.js.map