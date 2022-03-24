import React from "react";
import styles from "./PCarburant.module.css";
import { AiOutlineMinus } from "react-icons/ai";



const Carburant = props => {
    return(
        <div>
             <div className = {styles._formm}>

                
                <input type="input" placeholder="Prix du Carburant"/>
    

            </div>
        </div>
    )
}
export default Carburant;
