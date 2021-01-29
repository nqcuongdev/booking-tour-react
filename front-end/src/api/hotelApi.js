import axiosClient from "./axiosClient";

const HotelApi = {
  getPaginate: (offset) => {
    const url = `api/v1/hotel/paginate?page=${offset ? offset : 1}`;
    return axiosClient.get(url);
  },

  getAll: () => {
    const url = `api/v1/hotel/`;
    return axiosClient.get(url);
  },

  show: (id) => {
    const url = `api/v1/hotel/${id}`;
    return axiosClient.get(url);
  },

  search: (query) => {
    const url = `api/v1/hotel/search-hotel?destination=${query}`;
    return axiosClient.get(url);
  },
};

export default HotelApi;
