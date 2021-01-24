import axiosClient from "./axiosClient";

const HotelApi = {
  getAll: (offset) => {
    const url = `api/v1/hotel/paginate?page=${offset ? offset : 1}`;
    return axiosClient.get(url);
  },

  show: (id) => {
    const url = `api/v1/hotel/${id}`;
    return axiosClient.get(url);
  },
};

export default HotelApi;
