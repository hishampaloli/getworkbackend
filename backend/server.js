import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import UserRouter from "./routes/UserRouter.js";
import EmployeeRouter from "./routes/EmployeeRoutes.js";
import EmployerRouter from "./routes/EmplyerRoutes.js";
import JobsRouter from "./routes/jobsRoute.js";
import AdminRouter from "./routes/AdminRoutes.js";
import ProposalRouter from "./routes/ProposalRoutes.js";
import PaymentRouter from "./routes/paymentRoutes.js";
import ChatRouter from "./routes/ChatRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import nodemailer from "nodemailer";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import sockets from "./sockets/routes.js";
import { sendMail } from "./utils/mail.js";

mongoDB();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();

export const instance = new Razorpay({
  key_id: "rzp_test_7wPhwS45ZkJnjR",
  key_secret: "KxL3P87LVayeD69Aav20mHjU",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", async (req, res) => {
  res.send("Please go back to your home Page : )");
});

app.use("/api", UserRouter);
app.use("/api/employee", EmployeeRouter);
app.use("/api/employer", EmployerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api", JobsRouter);
app.use("/api", ProposalRouter);
app.use("/api/credit", PaymentRouter);
app.use("/api/chat", ChatRouter);

app.use(notFound);
app.use(errorHandler);

io.on("connection", sockets);

httpServer.listen(process.env.PORT || 3001, () => {
  console.log("SERVER STARTED");
});






