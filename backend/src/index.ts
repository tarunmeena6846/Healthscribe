import express from "express";
import cors from "cors";
import index from "./auth/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", index);
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
