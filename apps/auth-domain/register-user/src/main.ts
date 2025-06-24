import express from "express";
import userRoutes from "./routes/user.routes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/frontend", express.static(path.join(__dirname, "../frontend")));
app.use("/register", userRoutes);

app.get("/", (_, res) => res.json({ message: "Register User Microservice is running" }));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
