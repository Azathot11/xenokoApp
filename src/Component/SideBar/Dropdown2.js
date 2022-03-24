import React,{useContext} from 'react'
import styles from './Dropdown2.module.css'
import { LinkContainer} from 'react-router-bootstrap';
import AuthContext from '../Store/Auth';
const Dropdown2 = (props) => {
   
    const AuthCtx = useContext(AuthContext)
    const logOutHandler =()=>{
        AuthCtx.logout()
    }
  
    return (
       
           <div className={styles.dropdown} >
               <div className={styles.subContain}>
                   <div className={styles.sec2D}  onClick={logOutHandler}  >  
                        <li className={styles.listSec2}  onClick={props.Appear}><span className={styles.spanl2}><i class="bi bi-box-arrow-in-right"></i></span><p>Sign Out</p></li>
                   </div>
               </div>
           </div> 
       
    )
}

export default Dropdown2