// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/apiError.js";
// import { apiResponse } from "../utils/apiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// const generateTokens = async (user) => {
//   const accessToken = user.generateAccessToken();
//   const refreshToken = user.generateRefreshToken();

//   user.refreshToken = refreshToken;
//   await user.save({ validateBeforeSave: false });

//   return { accessToken, refreshToken };
// };

// // STUDENT REGISTER
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, studentId, department, year } = req.body;

//   if (!name || !email || !password || !studentId) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existedUser = await User.findOne({ email });
//   if (existedUser) {
//     throw new ApiError(409, "User already exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     studentId,
//     department,
//     year,
//     role: "student",
//   });

//   const { accessToken, refreshToken } = await generateTokens(user);

//   return res.status(201).json(
//     new apiResponse(201, {
//       user,
//       accessToken,
//       refreshToken,
//     }, "User registered successfully")
//   );
// });

// // LOGIN (Student + Admin)
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     throw new ApiError(400, "Email and password required");
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);
//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const { accessToken, refreshToken } = await generateTokens(user);

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new apiResponse(200, {
//         user,
//         accessToken,
//       }, "Login successful")
//     );
// });

// // LOGOUT
// const logoutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(
//     req.user._id,
//     { $unset: { refreshToken: 1 } },
//     { new: true }
//   );

//   return res
//     .status(200)
//     .clearCookie("accessToken")
//     .clearCookie("refreshToken")
//     .json(new apiResponse(200, {}, "Logout successful"));
// });

// export  { registerUser, loginUser, logoutUser };





import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateTokens = async (user) => {
  console.log('🔑 generateTokens called for user:', user._id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  console.log('✅ Tokens generated successfully');

  return { accessToken, refreshToken };
};

// STUDENT REGISTER
const registerUser = asyncHandler(async (req, res) => {
  console.log('📝 registerUser called');
  console.log('📦 req.body:', req.body);
  console.log('🔍 res type:', typeof res);
  console.log('🔍 res.json type:', typeof res.json);
  
  const { name, email, password, studentId, department, year } = req.body;
  console.log('📋 Destructured values:', { name, email, password: '***', studentId, department, year });

  if (!name || !email || !password || !studentId) {
    console.log('❌ Validation failed - missing fields');
    throw new ApiError(400, "All fields are required");
  }

  console.log('🔎 Checking if user exists...');
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    console.log('❌ User already exists');
    throw new ApiError(409, "User already exists");
  }

  console.log('✨ Creating new user...');
  const user = await User.create({
    name,
    email,
    password,
    studentId,
    department,
    year,
    role: "student",
  });
  console.log('✅ User created:', user._id);

  console.log('🔑 Generating tokens...');
  const { accessToken, refreshToken } = await generateTokens(user);

  console.log('📤 Creating apiResponse...');
  const response = new apiResponse(201, {
    user,
    accessToken,
    refreshToken,
  }, "User registered successfully");
  
  console.log('✅ apiResponse created:', response);
  console.log('🚀 Sending response...');

  return res.status(201).json(response);
});

// LOGIN (Student + Admin)
const loginUser = asyncHandler(async (req, res) => {
  console.log('🔐 loginUser called');
  console.log('📦 req.body:', req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('❌ Email or password missing');
    throw new ApiError(400, "Email and password required");
  }

  console.log('🔎 Finding user by email...');
  const user = await User.findOne({ email });
  if (!user) {
    console.log('❌ User not found');
    throw new ApiError(404, "User not found");
  }

  console.log('🔒 Verifying password...');
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    console.log('❌ Invalid password');
    throw new ApiError(401, "Invalid credentials");
  }

  console.log('🔑 Generating tokens...');
  const { accessToken, refreshToken } = await generateTokens(user);

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log('📤 Creating apiResponse...');
  const response = new apiResponse(200, {
    user,
    accessToken,
  }, "Login successful");
  
  console.log('✅ apiResponse created:', response);
  console.log('🚀 Sending response with cookies...');

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(response);
});

// LOGOUT
const logoutUser = asyncHandler(async (req, res) => {
  console.log('🚪 logoutUser called');
  console.log('👤 User ID:', req.user._id);

  console.log('🗑️ Removing refresh token from DB...');
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  console.log('📤 Creating apiResponse...');
  const response = new apiResponse(200, {}, "Logout successful");
  
  console.log('✅ apiResponse created:', response);
  console.log('🚀 Sending response and clearing cookies...');

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(response);
});

export { registerUser, loginUser, logoutUser };