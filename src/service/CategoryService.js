import { API, FAPI } from "../config/axiosConfig";

const getCategory = () => {
  return API.get("/category");
};

const getSingleCategory = (id) => {
  return API.get(`/category/${id}`);
};

const addCategory = (values, token) => {
  return FAPI.post("/category/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const updateCategory = (id, values, token) => {
  return FAPI.put(`/category/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const deleteCategory = (id, token) => {
  return API.delete(`/category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const addTags = (values) => {
  return API.post("/tags/addtags", values);
};

const getTags = () => {
  return API.get("/tags");
};

const CategoryService = {
  getTags,
  addTags,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
};

export default CategoryService;
