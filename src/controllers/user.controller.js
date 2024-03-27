import asyncWrapper from "../utils/asyncWrapper.js";
import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import User from "../models/user.model.js";
import { uploadFile } from "../utils/cloudinary.js";

const generateAccessRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  console.log(accessToken, refreshToken);
  return { accessToken, refreshToken };
};

/*
 *****************************************************************************
 *REGISTER USER
 *ROUTE: POST /api/users/register
 *****************************************************************************
 */
const registerUser = asyncWrapper(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  // ! Validation
  if (
    [username, fullName, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ExpressError(400, "Please fill in all fields");
  }

  //! Checking if user already exist or not
  const isPresent = await User.findOne({ $or: [{ username }, { email }] });
  if (isPresent) {
    throw new ExpressError(
      400,
      "User with same username or email already exists"
    );
  }
  //! Local Path of file extraction
  const avatarLocalPath = Array.isArray(req.files?.avatar)
    ? req.files?.avatar[0]?.path
    : "";
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new ExpressError(400, "Please upload avatar ");
  }
  // ! Uploading files to cloudinary
  const avatar = await uploadFile(avatarLocalPath);
  const coverImage = await uploadFile(coverImageLocalPath);

  if (!avatar) {
    throw new ExpressError(400, "Please upload avatar");
  }
  // ! Creating new user
  const newUser = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //! Checking if proper user created or not
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

/*
 *****************************************************************************
 *LOGIN USER
 *ROUTE: POST /api/users/login
 *****************************************************************************
 */
const loginUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!email && !username) {
    throw new ExpressError(400, "Please provide email or username");
  }
  // ! Checking if user exist or not
  const userExist = await User.findOne({ $or: [{ email }, { username }] });
  if (!userExist)
    throw new ExpressError(400, "User not found with this email or username");
  // ! Checking password
  const isPasswordCorrect = await userExist.checkPassword(password);
  if (!isPasswordCorrect)
    throw new ExpressError(400, "Incorrect Password Please try again");

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    userExist._id
  );

  const user = await User.findById(userExist._id).select(
    "-password -refreshToken"
  );
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ExpressResponse(
        200,
        { accessToken, refreshToken, user },
        "User Logged in successfully"
      )
    );
});

/*
 *****************************************************************************
 *LOGOUT USER
 *ROUTE: POST /api/users/logout
 *****************************************************************************
 */
const logoutUser = asyncWrapper(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };
  await User.findByIdAndUpdate(req.user._id, { refreshToken: undefined });
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ExpressResponse(200, {}, "User Logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
