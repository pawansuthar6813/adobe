import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import connectDb from './DB/connectDb.js';

import app from './app.js';

const port = process.env.PORT || 4000;

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log('Mongodb connected successfully, server is running on port : ', port);
        })
    })
    .catch((err) => {
        console.log("server not started because mongodb connection failed");
        console.log(err.message);
    })


