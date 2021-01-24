import axiosClient from "./axiosClient";

const RatingApi = {
  create: (data) => {
    const url = "api/v1/rating/create";
    return axiosClient.post(url, data);
  },

  getAll: (id) => {
    const url = `api/v1/rating/${id}/list-rating`;
    return axiosClient.get(url);
  },
};

export default RatingApi;
