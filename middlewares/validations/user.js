const Joi = require("joi");

const userSchema = Joi.object({
	lastname: Joi.string().max(255),
	firstname: Joi.string().max(),
	mail: Joi.string().email().required(),
	password: Joi.string().required(),
});



const userValidation = (req, res, next) => {
	const payload = req.body;
	const { error } = userSchema.validate(payload, {
		abortEarly: false,
	});
	if (error) {
		next(error);
	} else {
		next();
	}
};

module.exports = userValidation;
