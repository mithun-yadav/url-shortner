import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
