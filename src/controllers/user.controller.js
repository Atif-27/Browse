import asyncWrapper from "../utils/asyncWrapper.js";

/* ****************************
! REGISTER USER
*ROUTE: POST /api/users/register
*******************************/
const registerUser = asyncWrapper(async (req, res) => {
  res.status(200).json({ message: "Register User" });
});

export { registerUser };
