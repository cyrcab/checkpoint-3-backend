const userRouter = require("express").Router();
const { getAllUser, getUniqueUser, updateUser } = require("../controller/user");

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUniqueUser);
userRouter.put("/:id", updateUser);


module.exports = userRouter;
