import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
    methods: "GET,PUT,POST,DELETE", // Allow specific methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
};
// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// Routes
app.use("/api/v1", appRouter);
// Handle preflight requests
app.options("*", cors(corsOptions));
export default app;
//# sourceMappingURL=app.js.map