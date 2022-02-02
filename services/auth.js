const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
	const { id, mail, password } = user;
	const token = jwt.sign({ id, mail, password }, secret, { expiresIn: "1h" });
	return token;
};
const expressJWT = require("express-jwt");

const auth = expressJWT({ secret, algorithms: ["HS256"] });

module.exports = { generateToken, auth };
