import express from 'express';
import cors from 'cors'
import handleAsyncErrors from './Utils/handleAsyncErrors.js';
import appRouter from './Routes/app.routes.js';



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json())

app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}))

app.use('/uploads', express.static('uploads'));


// <---------------------------------------------------------------------------------------->


app.use("/api", appRouter);

app.use(handleAsyncErrors);

export default app;