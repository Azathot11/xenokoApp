import React from "react";
import styles from "./GlobalDateI.module.css";

const GlobalDateI= ({values,filterH, placeholder }) => {
 
  return (
        <div className={styles.siconI}>
            
            <input 
            type='date'
            name='date'
            className={styles.searchTermI}
            onChange={(e)=>{
              filterH(e)
            }
            }
            placeholder={placeholder}
            />
        </div>
  );
};

export default GlobalDateI;
