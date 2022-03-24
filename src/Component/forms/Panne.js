import React from "react";
import styles from "./Panne.module.css";
import { AiOutlineMinus } from "react-icons/ai";



const Panne = (props) => {
    return(
        <div>
             <form className = {styles._formm}>

                
                <input type="input" placeholder="Panne"/>
                
                <input type="input" placeholder="prix de panne"/>

                
                <input type="input" placeholder="main d'oevre de réparation"/>

                
                <input type="input" placeholder="fraix extra"/>

                
                <label htmlFor="descriptionPanne">Description de la panne</label>

                <textarea id="descriptionLaPanne" name="descriptionLaPanne" rows="6" cols="50"></textarea>

            </form>
        </div>
    )
}
export default Panne;