import React from 'react'
import classes from './PieChart.module.css'
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from 'react-i18next';
const PieChart = ({revenue2,manquant,data,label,colors}) => { 
  const {t} = useTranslation()
   const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         var fontSize = (height / 160).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "top";
         var text = "",
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 2;
         ctx.fillText(text, textX, textY);
         ctx.save();
    } 
  }]
    return (
        <>
        <div className={classes.pieContainer}>
        <Doughnut
       data = {{
        labels:label,
        datasets: [{
          label: 'My First Dataset',
          data:data,
          backgroundColor: colors
        }],
        text: '23%'
      }}
         options={{
            hoverOffset: 4
         }}
         plugins={plugins}  
        /> 
        </div> 
        </>
    )
}

export default PieChart
