import React from "react";
import classes from "./Title.module.css";

const TitleT = (props) => {
  
  return (
    <div className={classes.form}>
      <div className={classes.title_box}>
        <button></button>
        <div className={classes.title_text}>
          <p>Chauffeur Info</p>
        </div>
      </div>

      <div className={classes.personal}>
        <p>Personal Indication</p>
      </div>

      <div className={classes.photo}>
        <div className={classes.buttons_photo}>
          <button></button>
          <button></button>
        </div>
      </div>
      <div className={classes.data_form}>
        <form>
          <label htmlFor="firstname">First Name</label>
          <br></br>
          <input
            type="text"
            id="firstname"
            name="firstName"
           
         
          />

          <label htmlFor="lastname">Last Name</label>
          <br></br>
          <input
            type="text"
            id="lastname"
            name="lastName"
         
          
          />

          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            id="email"
            name="email"
         
          
          />

          <label htmlFor="telephone">Telephone</label>
          <br></br>
          <input
            type="number"
            id="phone"
            name="telephone"
            placeholder="e.g: +237 656 818 635"
            pattern="[+][0-9]{3} [0-9]{3} [0-9]{3} [0-9]{3}"
          
           
          />

          <label htmlFor="location">Location</label>
          <br></br>
          <input
            type="text"
            id="location"
            name="location"
         
            
          />

          <label htmlFor="date">Date</label>
          <br></br>
          <input
            type="date"
            min="1900-01-01"
            max="2100-12-31"
           
            name="date"
            
          />

          <label htmlFor="status">Status</label>
          <br></br>
          <select
            name="status"
            id="status"
            className={classes.select}
         
            
          >
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
        </form>
      </div>
      <div className={classes.line}></div>
      <div className={classes.footer}>
        <button>Cancel</button>
        <button >Next</button>
      </div>
    </div>
  );
};
export default TitleT;
