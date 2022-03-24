import React from "react";
import styles from "./GlobalFilter.module.css";

const GlobalFilter = ({values,filterH, placeholder }) => {
 
  return (
        <div className={styles.sicon}>
            <span><i class="bi bi-search"></i></span>
            <input 
            type='text'
            name='query'
            value={values}
            className={styles.searchTerm}
            onChange={(e)=>{
              filterH(e)
            }
            }
            placeholder={placeholder}
            />
        </div>
  );
};

export default GlobalFilter;
