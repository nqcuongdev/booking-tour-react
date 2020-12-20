import axiosClient from './axiosClient';

const ToursApi = {
    getAll: (params) => {
        const url = `api/v1/tours`
        return axiosClient.get(url, { 
            params,
            // có thể override url khác để sử dụng trong trường hợp đặc biệt
            // baseUrl: 'http://localhost/api/v1/abc...',
            // có thể truyền thêm header
            headers: {
                'TestHeader': 'Test header'
            }
         });
    },
    
    get: (id) => {
        const url = `/tours/${id}`;
        return axiosClient.get(url);
    },

    book: (params) => {
        const url = `/tours/book/`;
        return axiosClient.post(url, params); // params sẽ chứa thông tin abc xyz...
    },
}

export default ToursApi;