const reservationRouter = require("express").Router();
const {
	getAllReservation,
	getUniqueReservation,
	updateReservation,
	deleteReservation,
	createReservation,
} = require("../controller/reservation");
const reservationValidation = require("../middlewares/validations/reservation");

reservationRouter.get("/", getAllReservation);
reservationRouter.get("/:id", getUniqueReservation);
reservationRouter.put("/:id", [reservationValidation, updateReservation]);
reservationRouter.post("/to-reserve", [reservationValidation, createReservation]);
reservationRouter.delete("/:id", deleteReservation);

module.exports = reservationRouter;
