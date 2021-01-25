import axiosClient from "./axiosClient"; 

const subscribeApi = { 
  add: (data) => { 
    const url = "api/v1/subscribe/add";
    
    return axiosClient.post(url, data);
  }
}; 
  
export default subscribeApi; 
