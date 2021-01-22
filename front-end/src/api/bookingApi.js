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
};

export default BookingApi;
