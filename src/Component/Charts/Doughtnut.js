import React from 'react'
import classes from './PolarChart.module.css'
import { PolarArea } from "react-chartjs-2";
const PPolarArea  = () => {
    const data = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          datasets: [
            {
              label: "Hours Studied in Geeksforgeeks",
              data: [2, 5, 6, 7, 3],
              backgroundColor: ["blue", "green", "yellow", "pink", "orange"],
            }
          ]
      }
        
    return (
        <div className={classes.polarChart}>
            <PolarArea data={data} />
        </div>
    )
}

export default PPolarArea 
