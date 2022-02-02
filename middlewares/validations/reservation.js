const Joi = require("joi");

const reservationCreationSchema = Joi.object({
	date: Joi.date().required(),
	nbrGuest: Joi.number().max(20).required(),
});
const reservationUpdateSchema = Joi.object({
	date: Joi.date(),
	nbrGuest: Joi.number().max(20),
});

const reservationCreationValidation = (req, res, next) => {
	const payload = req.body;
	const { error } = reservationCreationSchema.validate(payload, {
		abortEarly: false,
	});

	if (error) {
		next(error);
	} else {
		next();
	}
};

const reservationUpdateValidation = (req, res, next) => {
	const payload = req.body;
	const { error } = reservationUpdateSchema.validate(payload, {
		abortEarly: false,
	});

	if (error) {
		next(error);
	} else {
		next();
	}
};

module.exports = { reservationCreationValidation, reservationUpdateValidation };
