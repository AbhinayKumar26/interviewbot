const mongoose = require("mongoose");

const resumeSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      filename: String,

      filepath: String,

      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Resume",
  resumeSchema
);