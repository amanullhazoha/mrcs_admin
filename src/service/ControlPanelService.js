import { API, FAPI } from "../config/axiosConfig";

const getControl = () => {
  return API.get("/control");
};

const addControl = (values, token) => {
  return FAPI.post("/control/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateControl = (id, values, token) => {
  return FAPI.put(`/control/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteControl = (id, token) => {
  return API.delete(`/control/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const ControlPanelService = {
  addControl,
  getControl,
  updateControl,
  deleteControl,
};

export default ControlPanelService;
