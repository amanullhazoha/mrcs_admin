import { API, FAPI } from "../config/axiosConfig";

const getFaq = () => {
  return API.get("/faq");
};

const addFaq = (values, token) => {
  return FAPI.post("/faq/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const updateFaq = (id, values, token) => {
  return FAPI.put(`/faq/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const FaqService = {
  getFaq,
  addFaq,
  updateFaq,
};

export default FaqService;
