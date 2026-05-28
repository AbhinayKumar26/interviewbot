import express from "express";

const router = express.Router();

router.post(
  "/analyze",
  async (req, res) => {

    try {

      const text =
        req.body.text || "";

      let score = 0;

      const feedback = [];

      // SKILLS
      const skills = [
        "React",
        "Node",
        "MongoDB",
        "JavaScript",
        "Express",
      ];

      skills.forEach((skill) => {

        if (
          text
            .toLowerCase()
            .includes(
              skill.toLowerCase()
            )
        ) {

          score += 20;
        }
      });

      // FEEDBACK
      if (
        !text.includes("Projects")
      ) {

        feedback.push(
          "Add projects section"
        );
      }

      if (
        !text.includes(
          "Certification"
        )
      ) {

        feedback.push(
          "Add certifications"
        );
      }

      if (
        !text.includes("Skills")
      ) {

        feedback.push(
          "Add technical skills"
        );
      }

      res.json({
        atsScore: score,
        feedback,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "AI Analysis Failed",
      });
    }
  }
);

export default router;