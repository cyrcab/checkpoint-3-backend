const userRouter = require("./user");
const reservationRouter = require("./reservation");

const setupRoutes = (app) => {
	app.use("/api", userRouter);
	app.use("/api", reservationRouter);
};

module.exports = setupRoutes;
