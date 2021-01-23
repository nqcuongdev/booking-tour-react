import axiosClient from "./axiosClient";

const token = localStorage.getItem("jwtKey");
const BookingApi = {
  book: (data) => {
    const url = `api/v1/booking`;
    return axiosClient.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  getCarts: () => {
    const url = `api/v1/booking/cart`;
    return axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  deleteItemInCart: (id) => {
    const url = `api/v1/booking/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  paymentSuccess: (data, id) => {
    const url = `api/v1/booking/${id}/payment-success`;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default BookingApi;
