import { API, FAPI } from "../config/axiosConfig";

const addFaq = (values) => {
  return FAPI.post("/faq/add", values);
};

const getFaq = () => {
  return API.get("/faq");
};

const updateFaq = (id, values) => {
  return FAPI.put(`/faq/update/${id}`, values);
};

const FaqService = {
  getFaq,
  addFaq,
  updateFaq,
};

export default FaqService;
