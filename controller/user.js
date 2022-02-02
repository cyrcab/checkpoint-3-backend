const prisma = require("../helpers/prisma");

const getAllUser = async (req, res, next) => {
	try {
		const listOfuser = await prisma.user.findMany({});
		if (listOfuser[0]) {
			listOfuser.map((user) => delete user.password);
		}
    console.log(listOfuser);
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
		}
		res.status(404).json({ message: "No resources found" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
// const createUser = (req, res, next) => {
//   try {
//     const { mail } = req.body;
// 		const userCreated = prisma.user.create({
//       data: { ...req.body}
//     });
// 		if (listOfuser[0]) {
// 			listOfuser.map((user) => delete user.password);
// 		}
// 		res.status(200).send(listOfuser);
// 	} catch (error) {
// 		next(error);
// 	}
// };

module.exports = {
	getAllUser,
	getUniqueUser,
};
