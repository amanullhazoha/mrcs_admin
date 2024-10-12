import { API, FAPI } from "../config/axiosConfig";

const getStudy = () => {
  return API.get("/study");
};

const getSingleStudy = (id) => {
  return API.get(`/study/${id}`);
};

const addStudy = (values, token) => {
  return FAPI.post("/study/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const updateStudy = (id, values, token) => {
  return FAPI.put(`/study/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const deleteStudy = (id, token) => {
  return API.delete(`/study/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const StudyService = {
  getStudy,
  addStudy,
  updateStudy,
  deleteStudy,
  getSingleStudy,
};

export default StudyService;
