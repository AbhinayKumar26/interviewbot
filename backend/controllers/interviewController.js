const Interview = require("../models/Interview");

// ================= START =================
exports.startInterview = async (
  req,
  res
) => {

  try {

    const questions = [

      "Explain React useEffect hook.",
      "Difference between state and props?",
      "What is Virtual DOM?",
      "Explain REST API.",
      "What is JWT authentication?",
      "Explain OOP concepts.",
      "What is multithreading?",
      "Difference between SQL and MongoDB?",
      "What are JavaScript closures?",
      "Tell me about yourself.",
      "Why should we hire you?",
      "What is Tailwind CSS?",
      "Explain component lifecycle.",
      "What is Node.js event loop?",
      "Explain inheritance in Java."

    ];

    const randomQuestion =
      questions[
        Math.floor(
          Math.random() *
            questions.length
        )
      ];

    res.json({
      question: randomQuestion,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ================= SUBMIT =================
exports.submitAnswer = async (
  req,
  res
) => {

  try {

    const {
      role,
      score,
      answers,
    } = req.body;

    const newInterview =
      await Interview.create({

        userId: req.user.id,

        role,

        score,

        answers,

        createdAt: new Date(),

      });

    res.json({
      success: true,
      interview: newInterview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Submit Failed",
    });

  }
};

// ================= HISTORY =================
exports.getHistory = async (
  req,
  res
) => {

  try {

    const history =
      await Interview.find({

        userId: req.user.id,

      }).sort({
        createdAt: -1,
      });

    res.json(history);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "History Error",
    });

  }
};