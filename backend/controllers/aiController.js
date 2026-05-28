const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
);

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

exports.analyzeResume =
  async (req, res) => {

    try {

      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

      const prompt = `
Analyze this resume.

Give:
1. ATS Score /100
2. Technical Skills
3. Missing Skills
4. Improvements
5. Final Feedback

Resume:
${req.body.resumeText}
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      res.json({
        success: true,
        feedback: response,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "AI Analysis Failed",
      });
    }
  };