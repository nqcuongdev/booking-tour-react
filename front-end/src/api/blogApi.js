import axiosClient from "./axiosClient";

const BlogApi = {
  getPaginate: (offset) => {
    const url = `api/v1/post/paginate?page=${offset ? offset : 1}`;
    return axiosClient.get(url);
  },

  getAll: () => {
    const url = `api/v1/post/`;
    return axiosClient.get(url);
  },

  show: (id) => {
    const url = `api/v1/post/${id}`;
    return axiosClient.get(url);
  },
};

export default BlogApi;
