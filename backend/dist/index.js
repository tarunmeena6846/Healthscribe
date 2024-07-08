"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./auth/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", index_1.default);
// app.use("/data", dataRoute);
// app.use("/stripe", stripeRoutes);
// app.use("/post", postRoute);
// app.use("/swot", swotRoute);
// app.use("/event", eventRoute);
app.get("/", (req, res) => {
    res.status(200).json("server is healthy");
});
app.listen(3001, () => {
    console.log("listeing to server at port", 3001);
});
