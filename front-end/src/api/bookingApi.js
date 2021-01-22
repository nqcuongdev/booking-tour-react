import axiosClient from "./axiosClient";

const token = localStorage.getItem("jwtKey");
const BookingApi = {
  book: (data) => {
    const url = `api/v1/tour/book/`;
    return axiosClient.post(url, data);
  },
};

export default BookingApi;
