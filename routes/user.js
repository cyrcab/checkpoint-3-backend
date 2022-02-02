const userRouter = require("express").Router();
const { getAllUser, getUniqueUser } = require("../controller/user");

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUniqueUser);

module.exports = userRouter;
