import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./config/database.mjs";
import logger from "./utils/logger.mjs";
import UserRouter from "./routes/userRoute.mjs";

const app = express();
let PORT = process.env.PORT || "8080";

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    logger.info(`Server is up and running on port ${PORT}`);
    databaseConnection();
});

// Routes
app.use("/v1/users", UserRouter);


// Export the server instance for testing
export default server;