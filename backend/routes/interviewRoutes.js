import express from "express";
import jwt from "jsonwebtoken";
import Interview from "../models/Interview.js";

const router = express.Router();

// AUTH MIDDLEWARE
const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    const token =
      req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        message: "No Token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.id;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

// SAVE INTERVIEW
router.post(
  "/submit",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        role,
        score,
        answers,
      } = req.body;

      const newInterview =
        await Interview.create({

          user: req.userId,

          role,

          score,

          answers,
        });

      res.status(201).json({
        success: true,
        interview: newInterview,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// GET HISTORY
router.get(
  "/history",
  authMiddleware,
  async (req, res) => {

    try {

      const history =
        await Interview.find({
          user: req.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(history);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;