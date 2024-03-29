const userRouter = require("express").Router();
const {
	getAllUser,
	getUniqueUser,
	updateUser,
	deleteUser,
	createUser,
	loginUser,
} = require("../controller/user");
const { userCreationValidation, userUpdateValidation } = require("../middlewares/validations/user");

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUniqueUser);
userRouter.put("/:id", [userUpdateValidation, updateUser]);
userRouter.post("/signup", [userCreationValidation, createUser]);
userRouter.post("/login", [userCreationValidation, loginUser]);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
