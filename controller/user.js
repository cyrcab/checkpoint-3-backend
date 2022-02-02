const prisma = require("../helpers/prisma");

const getAllUser = async (req, res, next) => {
	try {
		const listOfuser = await prisma.user.findMany({});
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
		const { mail } = req.body;
		const payload = req.body;
		const userExist = await prisma.user.findUnique({
			where: {
				mail: mail,
			},
		});
		if (userExist) {
			res.status(409).json({ message: "User already exist", isCreated: false });
		} else {
			const newUser = await prisma.user.create({
				data: { ...payload },
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

module.exports = {
	getAllUser,
	getUniqueUser,
	updateUser,
	deleteUser,
	createUser,
};
