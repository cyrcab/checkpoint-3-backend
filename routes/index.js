const userRouter = require("./user");
const reservationRouter = require("./reservation");

const setupRoutes = (app) => {
	app.use("/api/users", userRouter);
	app.use("/api/reservations", reservationRouter);
};

module.exports = setupRoutes;
