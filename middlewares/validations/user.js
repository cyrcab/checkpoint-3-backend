const Joi = require("joi");

const userCreateSchema = Joi.object({
	lastname: Joi.string().max(255),
	firstname: Joi.string().max(255),
	mail: Joi.string().max(255).email().required(),
	password: Joi.string().max(255).min(6).required(),
	roleId: Joi.number().max(3),
});
const userUpdateSchema = Joi.object({
	lastname: Joi.string().max(255),
	firstname: Joi.string().max(255),
	mail: Joi.string().max(255).email(),
	password: Joi.string().max(255).min(6),
	roleId: Joi.number().max(3),
});

const userCreationValidation = (req, res, next) => {
	const payload = req.body;
	const { error } = userCreateSchema.validate(payload, {
		abortEarly: false,
	});
	if (error) {
		next(error);
	} else {
		next();
	}
};
const userUpdateValidation = (req, res, next) => {
	const payload = req.body;
	const { error } = userUpdateSchema.validate(payload, {
		abortEarly: false,
	});
	if (error) {
		next(error);
	} else {
		next();
	}
};

module.exports = {
	userCreationValidation,
	userUpdateValidation,
};
