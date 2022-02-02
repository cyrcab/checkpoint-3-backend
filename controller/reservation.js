const prisma = require("../helpers/prisma");

const getAllReservation = async (req, res, next) => {
	try {
		const listOfReservation = await prisma.reservation.findMany({
			orderBy: {
				date: "desc",
			},
		});
		res.status(200).json(listOfReservation);
	} catch (error) {
		next(error);
	}
};
const getUniqueReservation = async (req, res, next) => {
	try {
		const { id } = req.params;
		const reservation = await prisma.reservation.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (reservation) {
			res.status(200).json(reservation);
		} else {
			res.status(404).json({ message: "No resources found" });
		}
	} catch (error) {
		next(error);
	}
};
const createReservation = async (req, res, next) => {
	try {
		const payload = req.body;
		const newReservation = await prisma.reservation.create({
			data: { ...payload },
		});
		res
			.status(201)
			.json({ ...newReservation, message: "Reservation created with success", isCreated: true });
	} catch (error) {
		next(error);
	}
};
const updateReservation = async (req, res, next) => {
	try {
		const { id } = req.params;
		const payload = req.body;
		const reservationExist = await prisma.reservation.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (reservationExist) {
			await prisma.Reservation.update({
				data: { ...payload },
				where: { id: reservationExist.id },
			});
			res.status(201).json({
				...reservationExist,
				...payload,
				message: "Reservation updated with success",
				isUpdated: true,
			});
		} else {
			res.status(404).json({ message: "No reservation found", isUpdated: false });
		}
	} catch (error) {
		next(error);
	}
};
const deleteReservation = async (req, res, next) => {
	try {
		const { id } = req.params;
		const reservationExist = await prisma.reservation.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (reservationExist) {
			await prisma.reservation.delete({
				where: { id: reservationExist.id },
			});
			res
				.status(201)
				.json({
					...reservationExist,
					message: "Reservation deleted with success",
					isDeleted: true,
				});
		} else {
			res.status(404).json({ message: "No reservation found", isDeleted: false });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllReservation,
	getUniqueReservation,
	updateReservation,
	deleteReservation,
	createReservation,
};
