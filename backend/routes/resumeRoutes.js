import express from "express";

const router = express.Router();

router.post(
  "/upload",
  async (req, res) => {

    try {

      res.json({
        success: true,
        message:
          "Resume uploaded",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;