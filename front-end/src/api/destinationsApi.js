import axiosClient from "./axiosClient";

const DestinationApi = {
  getPaginate: (offset) => {
    const url = `api/v1/destination/paginate?page=${offset ? offset : 1}`;
    return axiosClient.get(url);
  },

  getAll: (params) => {
    const url = `api/v1/destination`;
    return axiosClient.get(url, { params });
  },

  show: (id) => {
    const url = `api/v1/destination/${id}`;
    return axiosClient.get(url);
  },
};

export default DestinationApi;
