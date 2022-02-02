const prisma = require("../helpers/prisma");

const getAllUser = (req, res, next) => {
	try {
		const listOfuser = prisma.user.findMany();
		if (listOfuser[0]) {
			listOfuser.map((user) => delete user.password);
		}
		res.status(200).json(listOfuser);
	} catch (error) {
		next(error);
	}
};
const getUniqueUser = (req, res, next) => {
  try {
    const { id } = req.params;
		const user = prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		if (user) {
			delete user.password;
			res.status(200).json(user);
		}
		res.status(404).json({ message: "No resources found" });
	} catch (error) {
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
