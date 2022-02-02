const reservationRouter = require("express").Router();
const {
	getAllReservation,
	getUniqueReservation,
	updateReservation,
	deleteReservation,
	createReservation,
} = require("../controller/reservation");
const {
	reservationCreationValidation,
	reservationUpdateValidation,
} = require("../middlewares/validations/reservation");

reservationRouter.get("/", getAllReservation);
reservationRouter.get("/:id", getUniqueReservation);
reservationRouter.put("/:id", [reservationUpdateValidation, updateReservation]);
reservationRouter.post("/to-reserve", [reservationCreationValidation, createReservation]);
reservationRouter.delete("/:id", deleteReservation);

module.exports = reservationRouter;
