const Resume = require(
  "../models/Resume"
);

exports.uploadResume =
  async (req, res) => {

    try {

      const newResume =
        await Resume.create({

          userId: req.user.id,

          filename:
            req.file.filename,

          filepath:
            req.file.path,
        });

      res.json({
        success: true,
        resume: newResume,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Resume Upload Failed",
      });
    }
  };