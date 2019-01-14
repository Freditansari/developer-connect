import axios from "axios";
//how to set default token: 
/** this method is to set default every request being sent is attached with token header */

const setAuthToken = token=>{
    if (token){
        axios.defaults.headers.common['Authorization']= token;        
    }else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;