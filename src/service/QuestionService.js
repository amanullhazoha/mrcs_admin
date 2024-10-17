import { API, FAPI } from "../config/axiosConfig";

const getQuestion = () => {
  return API.get("/questions");
};

const getSingleQuestion = (id) => {
  return API.get(`/quiz/${id}`);
};

const addQuestion = (values, token) => {
  return FAPI.post("/questions/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateQuestion = (id, values, token) => {
  return FAPI.put(`/questions/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteQuestion = (id, token) => {
  return API.delete(`/questions/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const getAllResult = () => {
  return API.get("/result");
};

const getResultbyId = (id) => {
  return API.get(`/result/singleresult/${id}`);
};

const QuestionService = {
  getQuestion,
  addQuestion,
  getAllResult,
  getResultbyId,
  updateQuestion,
  deleteQuestion,
  getSingleQuestion,
};

export default QuestionService;
