import axiosClient from "./axiosClient";

const ToursApi = {
  getAll: (params) => {
    const url = `api/v1/tour`;
    return axiosClient.get(url, {
      params,
    });
  },

  get: (id) => {
    const url = `api/v1/tour/${id}`;
    return axiosClient.get(url);
  },

  book: (params) => {
    const url = `api/v1/tour/book/`;
    return axiosClient.post(url, params); // params sẽ chứa thông tin abc xyz...
  },

  getSchedule: (id) => {
    const url = `api/v1/tour/${id}/schedule`;
    return axiosClient.get(url);
  },
};

export default ToursApi;
