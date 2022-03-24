import React, { useContext } from 'react'
import AuthContext from '../Store/Auth'
import {  Route ,Redirect,} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoutes = ({ component: Component, roles, ...restOfProps }) => {

    const authCtx =useContext(AuthContext)

return(
  <Route
  {...restOfProps}
  render={(props) =>{
    if( !authCtx.isLoggedIn){
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }
  return <Component {...props} />
  }}
/>
)

   
}

export default ProtectedRoutes