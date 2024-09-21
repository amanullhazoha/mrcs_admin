import { API, FAPI } from "../config/axiosConfig";

const showReview = () => {
  return FAPI.get("/reviews/show");
};

const getReview = () => {
  return API.get("/reviews");
};

const addReview = (values) => {
  return FAPI.post("/reviews//admin-add", values);
};

const updateReview = (id, values) => {
  return FAPI.put(`/reviews/update/${id}`, values);
};

const deleteReview = (id) => {
  return FAPI.delete(`/reviews/delete/${id}`);
};

const ReviewService = {
  addReview,
  getReview,
  showReview,
  updateReview,
  deleteReview,
};

export default ReviewService;
