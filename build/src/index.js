"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../ormconfig");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const LoginRoute_1 = __importDefault(require("./routes/auth/LoginRoute"));
const RefreshTokenRoute_1 = __importDefault(require("./routes/auth/RefreshTokenRoute"));
const LogoutRoute_1 = __importDefault(require("./routes/auth/LogoutRoute"));
const cellsRoute_1 = __importDefault(require("./routes/cellsRoute"));
const auditoriumRoute_1 = __importDefault(require("./routes/auditoriumRoute"));
const restaurantRoute_1 = __importDefault(require("./routes/restaurantRoute"));
const FoodItemRoutes_1 = __importDefault(require("./routes/FoodItemRoutes"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const meetingsRoute_1 = __importDefault(require("./routes/meetingsRoute"));
const forgetPasswordRoute_1 = __importDefault(require("./routes/forgetPasswordRoute"));
const resetPasswordRoute_1 = __importDefault(require("./routes/resetPasswordRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyAuth_1 = require("./middleware/verifyAuth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};
const base = '/api/v1';
app.get(`${base}/hi`, (req, res) => {
    res.send("Hi there");
});
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
});
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(`${base}/reset-password`, resetPasswordRoute_1.default);
app.use(`${base}/register`, UserRoute_1.default);
app.use(`${base}/login`, LoginRoute_1.default);
app.use(`${base}/refresh`, RefreshTokenRoute_1.default);
app.use(`${base}/logout`, LogoutRoute_1.default);
app.use(`${base}/forget-password`, forgetPasswordRoute_1.default);
app.use(verifyAuth_1.verifyJWT);
app.use(`${base}/cells`, cellsRoute_1.default);
app.use(`${base}/auditorium`, auditoriumRoute_1.default);
app.use(`${base}/meetings`, meetingsRoute_1.default);
app.use(`${base}/restaurant`, restaurantRoute_1.default);
app.use(`${base}/fooditem`, FoodItemRoutes_1.default);
app.use(`${base}/order`, orderRoute_1.default);
app.use(`*`, (req, res) => {
    res.send("route not found");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
//# sourceMappingURL=index.js.map