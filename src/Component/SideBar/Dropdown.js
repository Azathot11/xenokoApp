import React,{useContext} from 'react'
import { useHistory,NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './Dropdown.module.css'
import AuthContext from '../Store/Auth';
import Avatar from "@material-ui/core/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { UserOutlined } from "@ant-design/icons";
import { useTranslation} from "react-i18next";
import Cookies from 'js-cookie'
const DropdownM = (props) => {
  const {t} = useTranslation()
    const history= useHistory()
    const AuthCtx = useContext(AuthContext)
    const logOutHandlerAdmin =()=>{
      AuthCtx.logout() 
      // history.replace('/login')
    }

    const profileHis=()=>{
      history.push('/bridge/useprofile')
    }
    
  
    return (
       
        <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Avatar
            title={t('Options')}
              variant="contained"
              {...bindTrigger(popupState)}
              className={styles.table_avatar}
              icon={<UserOutlined />}
              src={"  http://xenoko-api.tejiz-dev.de/" + props.profile} />
            <Menu
              {...bindMenu(popupState)}
              PaperProps={{
                style: {
                  width: 200,
                  cursor: 'pointer'
                },
              }}
            >

             {Cookies.get('role')==='Admin'&& <MenuItem onClick={()=>{
               {profileHis() ; popupState.close()}}} >
              
                <ListItemIcon>
                  <i class="far fa-user-circle"></i>
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
               
              </MenuItem>

              }
              <MenuItem onClick={logOutHandlerAdmin}>
                <ListItemIcon >
                  <i class="bi bi-box-arrow-in-right"></i>
                </ListItemIcon >
                <ListItemText>Sign Out</ListItemText>
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
       
    )
}

export default DropdownM
