import { API, FAPI } from "../config/axiosConfig";

const showReview = () => {
  return FAPI.get("/reviews/show");
};

const getReview = () => {
  return API.get("/reviews");
};

const updateReview = (id, values) => {
  return FAPI.put(`/reviews/update/${id}`, values);
};

const deleteReview = (id) => {
  return FAPI.delete(`/reviews/delete/${id}`);
};

const ReviewService = {
  getReview,
  showReview,
  updateReview,
  deleteReview,
};

export default ReviewService;
