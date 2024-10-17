import { API, FAPI } from "../config/axiosConfig";

const getFaq = () => {
  return API.get("/faq");
};

const addFaq = (values, token) => {
  return FAPI.post("/faq/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateFaq = (id, values, token) => {
  return FAPI.put(`/faq/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const FaqService = {
  getFaq,
  addFaq,
  updateFaq,
};

export default FaqService;
