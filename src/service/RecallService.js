import { API, FAPI } from "../config/axiosConfig";

const addRecall = (values) => {
  return FAPI.post("/recall/add", values);
};
const getRecall = () => {
  return API.get("/recall");
};

const getSingleRecall = (id) => {
  return API.get(`/recall/${id}`);
};

const updateRecall = (id, values) => {
  return FAPI.put(`/recall/update/${id}`, values);
};
const deleteRecall = (id) => {
  return API.delete(`/recall/delete/${id}`);
};
const RecallService = {
  getRecall,
  addRecall,
  updateRecall,
  getSingleRecall,
  deleteRecall,
};

export default RecallService;
