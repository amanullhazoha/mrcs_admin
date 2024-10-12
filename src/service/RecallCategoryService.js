import { API, FAPI } from "../config/axiosConfig";

const getRecallCategory = () => {
  return API.get("/recall-category");
};

const getSingleRecallCategory = (id) => {
  return API.get(`/recall-category/${id}`);
};

const addRecallCategory = (values, token) => {
  return FAPI.post("/recall-category/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const updateRecallCategory = (id, values, token) => {
  return FAPI.put(`/recall-category/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const deleteRecallCategory = (id, token) => {
  return API.delete(`/recall-category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const RecallCategoryService = {
  getRecallCategory,
  addRecallCategory,
  deleteRecallCategory,
  updateRecallCategory,
  getSingleRecallCategory,
};

export default RecallCategoryService;
