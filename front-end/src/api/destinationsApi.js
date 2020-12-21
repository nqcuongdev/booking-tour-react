import axiosClient from './axiosClient';

const DestinationApi = {
    getAll: (params) => {
        const url = `api/v1/destination`
        return axiosClient.get(url, { params });
    },
    
    show: (id) => {
        const url = `api/v1/destination/${id}`;
        return axiosClient.get(url);
    },
}

export default DestinationApi;