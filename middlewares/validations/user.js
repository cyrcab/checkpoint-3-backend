const Joi = require("joi");

const userSchema = Joi.object({
	lastname: Joi.string().max(255),
	firstname: Joi.string().max(255),
	mail: Joi.string().max(255).email().required(),
	password: Joi.string().max(255).min(6).required(),
	roleId: Joi.number().max(3),
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
