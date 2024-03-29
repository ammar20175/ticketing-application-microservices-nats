import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
	currentUserMiddleware,
	errorHandlerMiddleware,
	NotFoundError,
} from "@ammarahmad/common";
import ticketsRouter from "./routes";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
	cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUserMiddleware);

app.get("/api/ticket", (req, res) => {
	res.status(200).json("hello from tickets");
});

app.use(ticketsRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

export default app;
