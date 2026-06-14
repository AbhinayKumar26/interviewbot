import axios from "axios";

const API =
  "https://interviewbot-vj9w.onrender.com/api";
// ================= REGISTER =================
export const registerUser =
  async (userData) => {

    const res =
      await axios.post(
        `${API}/auth/signup`,
        userData
      );

    return res.data;
  };

// ================= LOGIN =================
export const loginUser =
  async (userData) => {

    const res = await axios.post(
      `${API}/auth/login`,
      userData
    );

    return res.data;
  };

// ================= START =================
export const startInterview =
  async (data, token) => {

    const res = await axios.post(
      `${API}/interview/start`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res.data;
  };

// ================= SUBMIT =================
export const submitInterview =
  async (data, token) => {

    const res = await axios.post(
      `${API}/interview/submit`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res.data;
  };

// ================= HISTORY =================
export const getHistory =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res = await axios.get(
  `${API}/interview/history`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res.data;
};








  export const analyzeResume =
  async (resumeText) => {

    const res = await axios.post(
      `${API}/ai/analyze`,
      {
        resumeText,
      }
    );

    return res.data;
  };



  export const uploadResume = async (
    formData
  ) => {

    const res = await axios.post(
      `${API}/resume/upload`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  