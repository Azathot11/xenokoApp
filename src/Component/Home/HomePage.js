import React,{useContext} from 'react'
import Bridge from '../Pages/Bridge/bridge';
import PropInterface from '../Pages/Bridge/PropInterface';
import Login from '../Pages/login/Login';
import AuthContext from '../Store/Auth';
import {Switch, Route ,Redirect} from "react-router-dom";

var CryptoJS = require("crypto-js");
const HomePage = () => {
    const authCtx = useContext(AuthContext)
    
  var retrivedItems =localStorage.getItem('item')
  if(retrivedItems !==null && retrivedItems !==''){
    var bytes = CryptoJS.AES.decrypt(retrivedItems, 'my-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }else{
    return  <Login />
  }
  return (
    <main >
            {!authCtx.isLoggedIn && <Login />}
            {authCtx.isLoggedIn && decryptedData.role==='Admin' ? <Bridge />:null}
            {authCtx.isLoggedIn && decryptedData.role==='Viewer' ? <PropInterface id={decryptedData.id} />:null}
    </main>
    
  )
}

export default HomePage