const Joi = require("joi");

const reservationSchema = Joi.object({
	date: Joi.date().required(),
	nbrGuest: Joi.number().max(20).required(),
});

const reservationValidation = (req, res, next) => {
	const payload = req.body;
	const { error } = reservationSchema.validate(payload, {
		abortEarly: false,
	});
	if (error) {
		next(error);
	} else {
		next();
	}
};

module.exports = reservationValidation;
