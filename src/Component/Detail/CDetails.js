import react from "react";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import {MdAccountCircle} from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import classes from "./PropDetails2.module.css";
import { ImCross } from "react-icons/im";
import RM
import img from "./images/i.png";

const CDetail = () =>{
    return (
        <div className={classes._formm}>
            <div className={classes._boxP}>
                <button>
                    <ImCross/>
                </button>
                <div className={classes._textP}> 
                    <p>Chauffeur Info</p>
                </div>
            </div>

            <div className = {classes._identP}>
                <div className = {classes._photoP}>
                    {/*<img src={img} alt={img} />*/}
                </div>
                
                <p>Joh Doe</p>
                <button className={classes._bouttonTitul}>Titulaire</button>
            </div>
                
            <div className={classes._lineP}></div>

            <div className={classes._infosP}>
                <div className={classes._dataP}>
                    <MdAccountCircle/>
                    <p>Eloge Zebaze</p>
                </div>
                <div className={classes._dataP}>
                    <MdEmail/>
                    <p>johndoe@gmail.com</p>
                </div>
                <div className={classes._dataP}>
                    <BsFillTelephoneFill/>
                    <p> +237 656 818 635</p>
                </div>
                <div className={classes._dataP}>
                    <AiFillCar/>
                    <p>20</p>
                </div>
                <div className={classes._dataP}>
                    <GiPositionMarker/>
                    <p>Efoulan</p>
                </div>
                <div className={classes._dataP}>
                    <FaBirthdayCake/>
                    <p>September 19, 1985</p>
                </div>
            </div>

            <div className={classes._lineP}></div>

            <div className = {classes._cardD}>
                
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Id Card (front) </p>
                </div>
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Id Card (Back) </p>
                </div>
                
            </div>

            <div className={classes._lineP}></div>

            <div className = {classes._cardD}>
                
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Permis de conduire (front) </p>
                </div>
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Permis de conduire (Back) </p>
                </div>
                
            </div>

            <div className={classes._lineP}></div>

            <div className = {classes._cardD}>
                
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Carte grise (front) </p>
                </div>
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Carte grise (Back) </p>
                </div>
                
            </div>

            <div className={classes._lineP}></div>

            <div className = {classes._cardD}>
                
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Capacité (front) </p>
                </div>
                <div className = {classes._front}>
                    <div className = {classes._photoCard}>
                        {/*<img src={img} alt={img} />*/}
                    </div>
                    <p>Capacité (Back) </p>
                </div>
                
            </div>
            <div className={classes._lineP}></div>
        </div>
    )
}
export default CDetail