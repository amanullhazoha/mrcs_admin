import { API, FAPI } from "../config/axiosConfig";

const getUsers = (token) => {
  return API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const getSingleUser = (id, token) => {
  return API.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const addUser = (values) => {
  return FAPI.post("/users/adduser", values);
};

const updateUser = (id, values, token) => {
  return FAPI.put(`/users/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteUser = (id, token) => {
  return API.delete(`/users/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const deleteActivity = (id, token) => {
  return API.delete(`/user-activity/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const userActivity = () => {
  return API.get("/user-activity");
};

const UserService = {
  getUsers,
  addUser,
  updateUser,
  getSingleUser,
  deleteUser,
  userActivity,
  deleteActivity,
};

export default UserService;
