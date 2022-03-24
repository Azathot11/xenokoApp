import React,{useContext} from 'react'
import Bridge from '../Bridge/bridge'
import PropInterface from '../Bridge/PropInterface'
import { Redirect } from 'react-router-dom'
import AuthContext from '../../Store/Auth'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

const Direct = () => {
  const history =useHistory()
  const authCtx = useContext( AuthContext)
  return (
    <>
        {Cookies.get('role')==='Admin' && <Bridge/>}
        {Cookies.get('role') ==='Viewer'  && <PropInterface/> } 
        {}
    </>
  )
}

export default Direct