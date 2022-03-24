import React,{useState,useEffect} from 'react'
import styles from './Dropdown.module.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import { useTranslation} from "react-i18next";
import 'flag-icon-css/css/flag-icon.min.css'


const Dropdown4 = () => {
 
  let fIcon
  const {t} =useTranslation()
    const currentLanguageCode = Cookies.get('i18next')||'en';
    const languages=[
        {
            code:'fr',
            name:'Français',
            country_code:'fr'

        }, {
            code:'en',
            name:'English',
            country_code:'gb'
        }
    ]
    
    if(Cookies.get('i18next') === 'en'){
      fIcon = 'gb'
    } else if(Cookies.get('i18next') === 'fr'){
      fIcon = 'fr'
    }else{
      fIcon ='en'
    }
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <span  {...bindTrigger(popupState)} className={`flag-icon flag-icon-${fIcon} mx-2`}  title={t('Language')} style={{ cursor:'pointer'}}>
      
          </span>


          <Menu
            {...bindMenu(popupState)}
            PaperProps={{
              style: {
                width: 200,
              },
            }}
          >
            { languages.map(({code,name,country_code}) => <MenuItem key={country_code} onClick={()=>{ popupState.close();i18next.changeLanguage(code)}} disable={code === currentLanguageCode}>
                <ListItemIcon  >
                  <span className={`flag-icon flag-icon-${country_code}  mx-2`}></span>
                </ListItemIcon >
                <ListItemText style={{opacity: code === currentLanguageCode ? 0.5:1}}>{name}</ListItemText>
              </MenuItem> )}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  )
}

export default Dropdown4