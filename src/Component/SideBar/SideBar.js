import React,{Fragment,useState,useEffect} from "react";
import styles from'./SideBar.module.css'
import {NavLink} from 'react-router-dom'
import AuthContext from "../Store/Auth";
import 'antd/dist/antd.css'
import  voiture1 from '../Images/blue.jpg'
import Image1 from '../Images/xenoko no name.svg'
import Image2 from '../Images/xenoko.svg'
import Image3 from '../Images/Avatar.png'
import { useTranslation} from "react-i18next";
import useWindowDimensions from "../Pages/Bridge/Dimensions";
const SideBar=(props) =>{
    const pro = []
    const { height, width } = useWindowDimensions();

    if(width < 1200){
        props.setInactive(true)
    }

    const { t } = useTranslation();
    let name= <p className={styles['top-section-names']}>{props.infos.firstname}</p>
    let mail= <p className={styles['top-section-mail']}>{props.infos.email}</p>
    
    
    return(
        <Fragment>
          <div className={`${styles['side-menu']} ${props.inactive ? styles.inactive :''}` }  onClick={props.close2}>
                  <div className={styles['top-section']}> 
                      <div className={styles.logo} >
                          {props.inactive ?  <img className={styles.img1} src={Image1} alt='xenoko website'/>:<img className={styles.img1} src={Image2} alt='xenoko website'/>}
                      </div>
                  </div>
                  <div className={styles['text-zone']} >
                            {name}
                            {mail}
                  </div>
               
                <div className={styles.picture}>
                    {!props.profile  ?<img src={Image3} alt='profilr picture'/> :<img src={'http://xenoko-api.tejiz-dev.de/'+props.profile} alt='profilr picture'/>   }
                   
                </div>
                   
                   
               
                
                <div>
                    <p className={styles['d-p']}>DASHBOARD</p>
                </div>
                <div  className={styles['main-menu']} >
                    <nav >
                    <ul>
                        <li   className={`${styles['menu-items']} ${props.inactive ? styles.inactive :''}` } >
                            <NavLink activeClassName={styles.active} to='/home' >
                           
                                <div className={styles['menu-icon']}>
                                    <i className="fas fa-home"></i>
                                    </div>
                                <span className={styles.tt}>{t('Home')}</span>
                            </NavLink>
                        </li>
                  
                        
                        <li  className={`${styles['menu-items']} ${props.inactive ? styles.inactive :''}` }>
                            <NavLink activeClassName={styles.active}   to='/bridge/proprietaire' >
                                <div className={styles['menu-icon']}>
                                    <i className="fas fa-user-check"></i>
                                    </div>
                                <span className={styles.tt}>{t('Proprietors')}</span>
                            </NavLink>
                        </li>
                       
                       
                         <li  className={`${styles['menu-items']} ${props.inactive ? styles.inactive :''}` }>
                             <NavLink activeClassName={styles.active} to='/bridge/chauffeurs'> 
                                <div className={styles['menu-icon']}>
                                    <span className="iconify" data-icon="si-glyph:wheel-steel"></span>
                                </div>
                                <span className={styles.tt}>{t('Drivers')}</span>
                            </NavLink>
                        </li>
                      
                        <li  className={`${styles['menu-items']} ${props.inactive ? styles.inactive :''}` } >
                            <NavLink activeClassName={styles.active} to= '/bridge/voiture'>
                                <div className={styles['menu-icon']}>
                                    <i className="fas fa-car"></i>
                                </div>
                                <span className={styles.tt}>{t('Cars')}</span>
                            </NavLink>
                        </li>
                        
                        {/* <NavLink to='/failures'>
                            <li className={styles['menu-items']} >
                                <div className={styles['menu-icon']}>
                                    <i className="fas fa-cog"></i>
                                </div>
                                <span>Pannes</span>
                            </li>
                        </NavLink> */}
                       
                        <li   className={`${styles['menu-items']} ${props.inactive ? styles.inactive :''}` }>
                            <NavLink activeClassName={styles.active} to='/bridge/reve'>
                                <div className={styles['menu-icon']}>
                                    <i className="bi bi-cash"></i>
                                </div>
                                <span className={styles.tt}>{t('Revenues')}</span>
                            </NavLink>
                         </li>
                      
                       
                        <li  className={`${styles['menu-items']} ${props.inactive ? styles.inactive :''}` } >
                            <NavLink activeClassName={styles.active} to='/bridge/borrow'>
                                <div className= {`${styles['menu-icon']} ${styles['menu-icon2']}`}>
                                    <i className="fas fa-hand-holding-usd"></i>
                                </div>
                                <span className={styles.tt}>{t('Loans')}</span>
                            </NavLink>
                        </li>
                      
                      
                        {/* <li className={styles['menu-items']}>
                            <NavLink activeClassName={styles.active} to='/docs'>
                                <div className={styles['menu-icon']}>
                                    <i className="fas fa-folder-open"></i>
                                </div>
                                <span className={styles.tt}>Documents</span>
                            </NavLink> 
                        </li>  */}
                    </ul> 
                    </nav>
                </div>
          </div>
        </Fragment>
    )
}

export default SideBar;