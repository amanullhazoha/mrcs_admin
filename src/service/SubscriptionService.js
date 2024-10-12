import { API } from "../config/axiosConfig";

const getSubscription = () => {
  return API.get("/subscription");
};

const updateSubscription = (id, values, token) => {
  return API.put(`/subscription/update/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const SubscriptionService = {
  getSubscription,
  updateSubscription,
};

export default SubscriptionService;
