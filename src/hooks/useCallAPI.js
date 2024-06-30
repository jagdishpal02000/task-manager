/** NPM Packages Imports */
import { useContext } from 'react';
// import { useNavigate } from "react-router-dom";
import axios from 'axios';

/** Context File Imports */
import {AuthContext} from '../context/AuthContext';


async function getAccessToken({setAccessToken,refreshToken,setRefreshToken,setIsAuthenticated}) {
    const apiUrl = process.env.REACT_APP_API_URL;
    let token = null;
    try {
        let { data } = await axios.post(apiUrl + '/auth/token', {refresh_token:refreshToken});
        token = data.access_token;
    } catch (error) {
        console.log(error)
    }
        
    if (token === null) {
        // logout the user.
        setRefreshToken(null);
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        window.location.replace('/login');
    } else {
        setAccessToken(token);
    }
    return token;
}

const useCallAPI = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {accessToken,setAccessToken,refreshToken,setRefreshToken,setIsAuthenticated} = useContext(AuthContext);

    return {
        callAuthAPI : async ({url,method,data,headers}) => {
                let currentAccessToken = null;
                try {
                    if (!accessToken || (JSON.parse(atob(accessToken.split('.')[1]))).exp * 1000 < new Date().getTime()) {
                        currentAccessToken=await getAccessToken({setAccessToken,refreshToken,setRefreshToken,setIsAuthenticated});
                    }else{
                        currentAccessToken=accessToken;
                    } 
                } catch (error) {
                    currentAccessToken = await getAccessToken({refreshToken,setAccessToken,setRefreshToken,setIsAuthenticated});
                }

                if(headers){
                    headers = {...headers,'authorization': `Bearer ${currentAccessToken}`};
                }else{
                    headers = {'authorization': `Bearer ${currentAccessToken}`};
                }
                return new Promise(async (resolve, reject) => {
                    try {
                        const response = await axios({method,url:apiUrl+url,data,headers});
                        resolve(response);
                    } catch (error) {
                        if (error.response) {
                            if(error.response.status === 401){
                                axios.post(apiUrl + '/auth/logout', { refresh_token: refreshToken }).then(((response)=>{

                                })).catch((error)=>{
                                    console.log(error);
                                });
                                setRefreshToken(null);
                                setAccessToken(null);
                                localStorage.removeItem('refresh_token');
                                setIsAuthenticated(false);
                                window.location.replace('/login');

                            }
                        }
                        reject(error);
                    } 
                });
        },
        logout : async () => {
            try {
                await axios.post(apiUrl + '/auth/logout/', { refresh_token: refreshToken });
                setAccessToken(null);
                setRefreshToken(null);
                localStorage.removeItem('refresh_token');
                setIsAuthenticated(false);

                window.location.replace('/login');
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                window.location.replace('/login');
            }
        }
    }
}

export default useCallAPI;
