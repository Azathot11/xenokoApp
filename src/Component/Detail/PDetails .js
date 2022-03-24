import React from "react";
import classes from './PDetail.module.css'
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md"
import { BsFillTelephoneFill } from "react-icons/bs"

const PDetail = (props) => {
    return <div>
        
        <div className={classes.bloc}>
        <div className={classes.times} onClick={props.onClick}>
        <i class="fas fa-times"></i>
        </div>
            <div className={classes.first}>
                <div className={classes.infos}>
                    <div className={classes.photo}>
                        {/*photo  du chauffeur */}
                    </div>
                    <div className={classes.ident}>
                        <h2>{props.transfer.firstName}</h2>
                        <div className={classes.mail}>
                            <MdEmail/> <p>{props.transfer.email}</p>
                        </div>
                        <div className={classes.number}>
                            <BsFillTelephoneFill/> <p>+237 {props.transfer.tel}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.details}>
                    <div className={classes.cars}>
                        <h1>20</h1>
                        <p>voitures</p>
                    </div>
                </div>
            </div>
            <div className={classes.bars}>
                <Link to={`/detail2/${props.transfer.id}`}>
                    <span>Voitures</span>
                </Link>
                <Link  to={`/detail1/${props.transfer.id}`}>
                    <span>Revenue</span>
                </Link>
                
            </div>
        </div>
    </div>
}

export default PDetail;