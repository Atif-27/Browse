import asyncWrapper from "../utils/asyncWrapper.js";
import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import User from "../models/user.model.js";
import { uploadFile } from "../utils/cloudinary.js";

/* ****************************
! REGISTER USER
*ROUTE: POST /api/users/register
*******************************/
const registerUser = asyncWrapper(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  // * Validation
  if (
    [username, fullName, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ExpressError(400, "Please fill in all fields");
  }

  // * Checking if user already exist or not
  const isPresent = await User.findOne({ $or: [{ username }, { email }] });
  if (isPresent) {
    throw new ExpressError(
      400,
      "User with same username or email already exists"
    );
  }

  // * Local Path of file extraction
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // let coverImageLocalPath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.coverImage) &&
  //   req.files.coverImage.length > 0
  // ) {
  //   coverImageLocalPath = req.files.coverImage[0].path;
  // }
  if (!avatarLocalPath) {
    throw new ExpressError(400, "Please upload avatar ");
  }
  const avatar = await uploadFile(avatarLocalPath);
  const coverImage = await uploadFile(coverImageLocalPath);

  if (!avatar) {
    throw new ExpressError(400, "Please upload avatar");
  }
  const newUser = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  console.log(avatarLocalPath);

  // Checking if proper user created or not
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ExpressError(500, "Something went Wrong While registering user");
  }

  return res
    .status(201)
    .json(
      new ExpressResponse(201, createdUser, "User Registered successfully")
    );
});

export { registerUser };
