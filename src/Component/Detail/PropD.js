import React from 'react';
import classes from './PropD.module.css';
import { ImCross } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io"
{/*import img from "./images/i.png";*/}



const PropD = ({trig,transfer,trig2}) => {

    return (
        <div className={classes.form}>
            
                <div className={classes.title_box}>
                     <span onClick={trig2} className={classes.xClose}> <i class="fas fa-times"></i></span>                
                    <div className={classes.title_text}> 
                        <p>Propriétaire Info</p>
                    </div>
                </div>

                <div className = {classes.ident}>
                    <div className = {classes.photo}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Stephen Curry</p>
                    
                </div>
                
                <div className={classes.line}></div>
                
                <div className={classes.infos}>
                    <div className={classes.data}>
                        <MdEmail/>
                        <p>{transfer.email}</p>
                    </div>
                    <div className={classes.data}>
                        <BsFillTelephoneFill/>
                        <p> { transfer.tel}</p>
                    </div>
                    <div className={classes.data}>
                        <AiFillCar/>
                        <p>20</p>
                    </div>
                </div>
                <div className={classes.line}></div>
                <button onClick={trig} className={classes.moveT}>Details<IoIosArrowForward/></button>            
        </div>
    )
}
export default PropD;