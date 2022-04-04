import React from 'react'
import classes from './SideBarW.module.css'
import image1 from '../Images/xenoko.svg'

import { SidebarContainer,EditIcon,CloseIcon,SidebarWrapper,Nav,Xenoko,SidebarMenu,NavBarPicture,Linsting} from './SideBarW'
import Avatar from '@material-ui/core/Avatar'
import { UserOutlined } from '@ant-design/icons';
import {NavLink} from 'react-router-dom'
import {GiSteeringWheel} from 'react-icons/gi'

const SideBarW = ({rNav,resNav,profile,infos, callM}) => {
    return (
        <>
            <SidebarContainer  resNav={resNav} onClick={rNav}> 
                    <div onClick={rNav} className={classes.logDiv}>
                        <div className={classes.xI}>
                            <Xenoko src={image1} />
                        </div>

                        <div className={classes.cI}>
                            <CloseIcon/>
                        </div> 
                    </div>
                    <div className={classes.navbabarP}>
                        <div>
                        <div className={classes.avdiv}>
                            <Avatar
                             className={classes.table_avatar}
                             icon={<UserOutlined />} 
                             src={'http://xenoko-api.tejiz-dev.de/'+profile
                             }  />
                         {/* <div className={classes.editIcon}>
                            <span className={classes.eye} onClick={callM}><i className="bi bi-pencil-square"></i></span>
                            <span  className={classes.trash}><i className="bi bi-trash"></i></span>
                        </div> */}
                        </div>
                        
                        <div>
                            <p className={classes.n_E}>{infos.firstname}</p>
                            <p className={classes.nE}>{infos.email}</p>
                        </div>
                        </div>
                    </div>
                    
                <SidebarWrapper>
                    <div className={classes.dash}>
                             DASHBOARD
                    </div>

                        <Nav>
                           <SidebarMenu>
                                <li className={classes.listItems}>
                                    <NavLink to='/home' activeClassName={classes.active}>
                                        <span><i className="fas fa-home"></i></span>
                                        <p>Home</p>
                                    </NavLink>
                                </li>
                                <li className={classes.listItems}>
                                    <NavLink to='/bridge/proprietaire' activeClassName={classes.active}>
                                        <span> <i className="fas fa-user-check"></i></span>
                                        <p>Proprietaires</p>
                                    </NavLink>
                                </li>
                                

                                <li className={classes.listItems}>
                                    <NavLink to='/bridge/chauffeurs' activeClassName={classes.active}>
                                        <span className={classes.steering}><GiSteeringWheel/></span>
                                        <p>Chauffeurs</p>
                                    </NavLink>
                                </li>
                                <li className={classes.listItems}>
                                    <NavLink  to= '/bridge/voiture' activeClassName={classes.active}>
                                        <span> <i className="fas fa-car"></i></span>
                                        <p>Voitures</p>
                                    </NavLink>
                                </li>
                                <li className={classes.listItems}>
                                    <NavLink  to='/bridge/reve' activeClassName={classes.active}>
                                        <span>      <i className="bi bi-cash"></i></span>
                                        <p>Revenue</p>
                                    </NavLink>
                                </li>
                                <li className={classes.listItems}>
                                    <NavLink  to='/bridge/borrow' activeClassName={classes.active}>
                                        <span>   <i className="fas fa-hand-holding-usd"></i></span>
                                        <p>Pret</p>
                                    </NavLink>
                                </li>
                            </SidebarMenu>
                        </Nav>    

                    </SidebarWrapper>
            </SidebarContainer>
        </>
    )
}

export default SideBarW
