import { API, FAPI } from "../config/axiosConfig";

const getQuiz = () => {
  return API.get("/quiz");
};

const getSingleQuiz = (id) => {
  return API.get(`/quiz/${id}`);
};

const addQuiz = (values, token) => {
  return FAPI.post("/quiz/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateQuiz = (id, values, token) => {
  return API.put(`/quiz/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteQuiz = (id, token) => {
  return API.delete(`/quiz/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const QuizService = {
  getQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getSingleQuiz,
};

export default QuizService;
