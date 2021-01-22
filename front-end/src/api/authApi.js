import axiosClient from "./axiosClient"; 

const authApi = { 
  login: (data) => { 
    const url = "api/v1/login"; 
    
    return axiosClient.post(url, data); 
  },

  me: (token) => {  
    const url = "api/v1/user/me"; 

    return axiosClient.get(url, { 
      headers: { 
        Authorization: token, 
      }, 
    }); 
  }, 

  register: (data) => { 
    const url = "api/v1/register"; 
 
    return axiosClient.post(url, data); 
  } 
}; 
  
export default authApi; 
