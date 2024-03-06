import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes";
import { connectDB } from "./configs/dbConfig";
import cookieConfig from "./configs/cookieConfig";
import cookieParser from "cookie-parser";
import corsOptions from "./configs/corsConfig";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(session(cookieConfig));
app.use(cookieParser());
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
