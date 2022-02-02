const express = require("express");
require("dotenv").config();

const app = express();

// pre-route middlewares
// app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

// post-route middlewares
app.set("x-powered-by", false);

// server setup
const server = app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

module.exports = server;
