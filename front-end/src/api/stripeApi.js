import axiosClient from "./axiosClient";

const token = localStorage.getItem("jwtKey");
const StripeApi = {
  payment: (data) => {
    const url = `api/v1/stripe/charge`;
    return axiosClient.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default StripeApi;
