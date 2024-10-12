import { API, FAPI } from "../config/axiosConfig";

const showReview = () => {
  return FAPI.get("/reviews/show");
};

const getReview = () => {
  return API.get("/reviews");
};

const addReview = (values, token) => {
  return FAPI.post("/reviews//admin-add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const updateReview = (id, values, token) => {
  return FAPI.put(`/reviews/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const deleteReview = (id, token) => {
  return FAPI.delete(`/reviews/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const ReviewService = {
  addReview,
  getReview,
  showReview,
  updateReview,
  deleteReview,
};

export default ReviewService;
