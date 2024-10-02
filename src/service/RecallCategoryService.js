import { API, FAPI } from "../config/axiosConfig";

const addRecallCategory = (values) => {
  return FAPI.post("/recall-category/add", values);
};

const getRecallCategory = () => {
  return API.get("/recall-category");
};

const getSingleRecallCategory = (id) => {
  return API.get(`/recall-category/${id}`);
};

const updateRecallCategory = (id, values) => {
  return FAPI.put(`/recall-category/update/${id}`, values);
};
const deleteRecallCategory = (id) => {
  return API.delete(`/recall-category/delete/${id}`);
};

const RecallCategoryService = {
  getRecallCategory,
  addRecallCategory,
  deleteRecallCategory,
  updateRecallCategory,
  getSingleRecallCategory,
};

export default RecallCategoryService;
