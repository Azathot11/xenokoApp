import React, { Fragment,useEffect ,useState} from "react";
import Dropdown2 from "../../SideBar/Dropdown2";

import images2 from "../../Images/england.png";
import image3 from '../../Images/xenoko no name.svg'
import styles from "./NavBar2.module.css";
import Avatar from "@material-ui/core/Avatar";
import DropdownM from "../../SideBar/Dropdown";
import Dropdowm4 from '../../SideBar/Dropdown4'
import { UserOutlined } from "@ant-design/icons";

const NavBar2 = (props) => {
    const [isOpened,setIsOpened ]= useState(false)

    
    return (
        <Fragment>
            <nav className={styles.navi} isOpened={props.isOpened}   onClick={props.isOpened && props.close}>
            <div className={styles.left2}>
                <img  className={styles.nav2logo} src={image3}/>
            </div> 
             
              <div className={styles.right2}>
                <Dropdowm4/>
                <DropdownM  profile={props.profile} />
              </div>
            </nav>
        </Fragment>
    )
};

export default NavBar2;
