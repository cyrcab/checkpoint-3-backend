const userRouter = require("express").Router();
const {
	getAllUser,
	getUniqueUser,
	updateUser,
	deleteUser,
	createUser,
} = require("../controller/user");
const userValidation = require("../middlewares/validations/user");

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUniqueUser);
userRouter.put("/:id", [userValidation, updateUser]);
userRouter.post("/signup", [userValidation, createUser]);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
