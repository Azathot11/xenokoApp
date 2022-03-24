import React,{useState,useEffect,useCallback} from 'react'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie'


let logoutTimer

var CryptoJS = require("crypto-js");

const AuthContext =React.createContext({
token:'',
isLoggedIn:false,
login:(token)=>{},
logout:(items)=>{},
language:(language)=>{},
})

const calculateRemainingTime = (expirationTime) =>{
    const currentTime = new Date().getTime();
    const  adjExpirationTimeout = new Date(expirationTime).getTime()

    const remainingTime = adjExpirationTimeout - currentTime

    return remainingTime
}
const retrieveStoredToken = () => {
    
    const storedToken = localStorage.getItem('token');
    
    const storedExpirationDate = localStorage.getItem('expirationTime');
    
    const role =Cookies.get('role')
    const id = Cookies.get('id')
  
  
    const remainingTime = calculateRemainingTime(storedExpirationDate);
  
    if (remainingTime <= 3600) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
     
      return null;
    }
  
    return {
      token: storedToken,
      duration: remainingTime,
      role:role,
      id:id,
    
    };
  };
  
  export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    
    let initialToken;
    if (tokenData) {
      initialToken = tokenData.token;
    }
  
    const [token, setToken] = useState(initialToken);
    const[cId,setCid] =useState('')
    const userLoggedIn= !!token;
    const { t, i18n } = useTranslation();

    const logoutHandler = useCallback(() => {
     
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('choice')

      Cookies.remove('role')
      Cookies.remove('id')
    
      window.location.replace('/login')
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }, []);
  
    const logInHandler = (token, expirationTime,items) => {
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      const remainingTime = calculateRemainingTime(expirationTime);
  
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    };
    const chauffeurDet= (id)=>{
      setCid(id)
    }

    const languageHandler=(language)=>{
      i18n.changeLanguage(language);
    }
   
    useEffect(() => {
      if (tokenData) {
        console.log(tokenData.duration);
        logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      
      }
    }, [tokenData, logoutHandler]);
  
    const contextValue = {
      token:token,
      isLoggedIn:userLoggedIn,
      login:logInHandler,
      logout:logoutHandler,
      chauffeurDet,
      cId,
      language: languageHandler
    };
  
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  };

export default AuthContext;