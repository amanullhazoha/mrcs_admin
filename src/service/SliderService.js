import { API, FAPI } from "../config/axiosConfig";

const getSlider = () => {
  return API.get("/slider");
};

const getSingleSlider = (id) => {
  return API.get(`/slider/${id}`);
};

const addSlider = (values, token) => {
  return FAPI.post("/slider/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateSlider = (id, values, token) => {
  return FAPI.put(`/slider/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteSlider = (id, token) => {
  return API.delete(`/slider/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const SliderService = {
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider,
  getSingleSlider,
};

export default SliderService;
