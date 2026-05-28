
import mongoose from "mongoose";

const interviewSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      role: {
        type: String,
      },

      score: {
        type: Number,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const Interview =
  mongoose.model(
    "Interview",
    interviewSchema
  );

export default Interview;

