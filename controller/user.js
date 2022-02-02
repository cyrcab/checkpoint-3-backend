const prisma = require("../helpers/prisma");
const { hashPassword, verifyPassWord } = require("../services/hashPass");
const { generateToken } = require("../services/auth");

const getAllUser = async (req, res, next) => {
	try {
		const listOfuser = await prisma.user.findMany({
			orderBy: {
				lastname: "asc",
			},
		});
		if (listOfuser[0]) {
			listOfuser.map((user) => delete user.password);
		}
		res.status(200).json(listOfuser);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const getUniqueUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (user) {
			delete user.password;
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: "No resources found" });
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
		const { mail, password } = req.body;
		const payload = req.body;
		const userExist = await prisma.user.findUnique({
			where: {
				mail: mail,
			},
		});
		if (userExist) {
			res.status(409).json({ message: "User already exist", isCreated: false });
		} else {
			const hashedPassword = await hashPassword(password);
			const newUser = await prisma.user.create({
				data: { ...payload, password: hashedPassword },
			});
			delete newUser.password;
			res.status(201).json({ ...newUser, message: "User created with success", isCreated: true });
		}
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const newAttribute = req.body;
		const userExist = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (userExist) {
			await prisma.user.update({
				data: { ...newAttribute },
				where: { id: userExist.id },
			});
			delete userExist.password;
			res.status(201).json({
				...userExist,
				...newAttribute,
				message: "User updated with success",
				isUpdated: true,
			});
		} else {
			res.status(404).json({ message: "Nos user found", isUpdated: false });
		}
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const userExist = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (userExist) {
			await prisma.user.delete({
				where: { id: userExist.id },
			});
			delete userExist.password;
			res.status(201).json({ ...userExist, message: "User deleted with success", isDeleted: true });
		} else {
			res.status(404).json({ message: "No user found", isDeleted: false });
		}
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { mail } = req.body;
		const userExist = await prisma.user.findUnique({
			where: {
				mail: mail,
			},
		});
		if (userExist) {
			const isVerified = verifyPassWord.toString(userExist.password, req.body.password);
			if (isVerified) {
				const token = generateToken(userExist);
				delete userExist.password;
				res
					.status(201)
					.cookie("acces-token", token, { httpOnly: true })
					.json({ message: "User connected", isConnected: true, ...userExist });
			} else {
				res.send(401).json({ message: "User not connected", isConnected: false });
			}
		} else {
			res.send(404).json({ message: "Utilisateur introuvable" });
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getAllUser,
	getUniqueUser,
	updateUser,
	deleteUser,
	createUser,
	loginUser,
};
