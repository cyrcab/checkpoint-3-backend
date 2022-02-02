const userRouter = require("express").Router();
const { getAllUser, getUniqueUser, updateUser, deleteUser } = require("../controller/user");

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUniqueUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


module.exports = userRouter;
