import React,{useState,useContext} from 'react'
import { BrowserRouter as Router,Switch, Route ,Redirect,useHistory} from "react-router-dom";
import  './App.css'
import Login from './Component/Pages/login/Login'
import ResetPass from "./Component/Pages/login/ResetPass";
import Email from "./Component/Pages/login/Email";
import AuthContext from './Component/Store/Auth';
import ProtectedRoutes from './Component/protectedRoutes/ProtectedRoutes';
import Direct from './Component/Pages/Roles/Direct'
import I18n from './i18n'

// var CryptoJS = require("crypto-js");

const Role = {
  Admin: 'Admin',
  Viewer: 'Viewer'    
}

function App() {
  const history = useHistory()
 const AuthCtx = useContext(AuthContext)

 

 
  return ( 
    <main>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path='/mailing' component={Email}/>
          <Route path='/newPassword:rt' component={ResetPass}/>
          <ProtectedRoutes path='/'  component={Direct}/>
        </Switch>
      </Router>

    </main>
  
  );
}

export default App;
