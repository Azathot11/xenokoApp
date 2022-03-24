import React, { Fragment,useEffect } from "react";
import DropdownM from "../../SideBar/Dropdown";
import Dropdown3 from "../../SideBar/Dropdown3";
import {  useLocation } from 'react-router-dom'
import images2 from "../../Images/england.png";
import styles from "./NavBar.module.css";
import Dropdown4 from "../../SideBar/Dropdown4";
import { useTranslation} from "react-i18next";
const NavBar = (props) => {
  const {t} = useTranslation()
  let location = useLocation()
 const  changeTitle = () => {
    switch(window.location.pathname){
      case '/home':
        return t('Home');
      case '/bridge/proprietaire':
        return t('Proprietors');
      case '/bridge/chauffeurs':
        return t('Drivers');
      case '/bridge/voiture':
        return t('Cars');
      case '/bridge/reve':
        return t('Revenues');
        case '/bridge/borrow':
          return t('Loans');
      default:
        return t('Home');
    }  
  }
  useEffect(()=>{
    changeTitle()
  },[changeTitle])
  let title= changeTitle()
  return (
    <Fragment>
      
        <nav className={styles.navi} isopened={props.isopened} onClick={()=>( props.isopened && props.close2)} >
        <div className={styles.left}  onClick={props.toggle} inactive={props.inActive} title='click to shrink sidebar'>
                    <div className={styles.burger}>
                       {props.inactive ? <i className="bi bi-list"></i> :<i className="bi bi-arrow-left-short"></i>}
                     </div>
                    <div className={styles.pageName}>{title}</div>
          </div> 
          <div className={styles.left2}  onClick={props.rNav} >
                    <div className={styles.burger}>
                       <i className="bi bi-list"></i> 
                     </div>
                    <div className={styles.pageName}>{title}</div>
          </div> 
          <div className={styles.right}>
            {/* <img className={styles.eng} src={images2} alt=''  title='cllick to choose language' /> */}
            <Dropdown4/>
          
          <Dropdown3 title='click to see notifications' />
          <DropdownM  profile={props.profile} />
          </div>
        </nav>
    </Fragment>
  );
};
export default NavBar;
