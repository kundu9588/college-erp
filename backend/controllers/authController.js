const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { sendResponse } = require("../utils/responseHandler");
require("dotenv").config();

const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const {
      institution_id,
      email,
      password,
      full_name,
      phone_number,
      profile_picture_url,
    } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return sendResponse(res, {
        success: false,
        message: "Email already registered",
        statusCode: 400,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const newUser = await userModel.createUser({
      institution_id,
      email,
      password: hashedPassword,
      full_name,
      phone_number,
      profile_picture_url,
    });

    // Respond
    return sendResponse(res, {
      success: true,
      message: "User registered successfully",
      data: { user_id: newUser.user_id },
      statusCode: 201,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return sendResponse(res, {
      success: false,
      message: "Internal server error",
      error: { details: error.message },
      statusCode: 500,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return sendResponse(res, {
        success: false,
        message: "Invalid email or password",
        statusCode: 401,
      });
    }

    // Check if user is active
    if (!user.is_active) {
      return sendResponse(res, {
        success: false,
        message: "User account is inactive",
        statusCode: 403,
      });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return sendResponse(res, {
        success: false,
        message: "Invalid email or password",
        statusCode: 401,
      });
    }

    // Update last login
    await userModel.updateUserLastLogin(user.user_id);

    // Create JWT payload
    const payload = {
      user_id: user.user_id,
      institution_id: user.institution_id,
      email: user.email,
      full_name: user.full_name,
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token and user info
    return sendResponse(res, {
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          user_id: user.user_id,
          institution_id: user.institution_id,
          email: user.email,
          full_name: user.full_name,
          phone_number: user.phone_number,
          profile_picture_url: user.profile_picture_url,
        },
      },
      statusCode: 200,
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendResponse(res, {
      success: false,
      message: "Internal server error",
      error: { details: error.message },
      statusCode: 500,
    });
  }
}

module.exports = {
  register,
  login,
};
