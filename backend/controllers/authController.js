import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

// ================= SIGNUP =================
export const signup =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      // CHECK EXIST
      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res.status(400).json({
          message:
            "User already exists",
        });

      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

      res.status(201).json({
        message:
          "User registered successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  };

// ================= LOGIN =================
export const login = async (
  req,
  res
) => {

  try {

    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message:
          "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};