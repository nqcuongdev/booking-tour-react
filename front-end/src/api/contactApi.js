import axiosClient from "./axiosClient"; 

const contactApi = { 
  add: (data) => { 
    const url = "api/v1/contact/add"; 
    
    return axiosClient.post(url, data);
  }
}; 
  
export default contactApi; 
