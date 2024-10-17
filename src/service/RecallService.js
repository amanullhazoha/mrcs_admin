import { API, FAPI } from "../config/axiosConfig";

const getRecall = () => {
  return API.get("/recall");
};

const getSingleRecall = (id) => {
  return API.get(`/recall/${id}`);
};

const addRecall = (values, token) => {
  return FAPI.post("/recall/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateRecall = (id, values, token) => {
  return FAPI.put(`/recall/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteRecall = (id, token) => {
  return API.delete(`/recall/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const RecallService = {
  getRecall,
  addRecall,
  deleteRecall,
  updateRecall,
  getSingleRecall,
};

export default RecallService;
