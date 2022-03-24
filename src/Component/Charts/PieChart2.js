import React from 'react'
import classes from './PieChart2.module.css'
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from 'react-i18next';

const PieChart2 = ({total}) => {
   const {t} =useTranslation() 
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
        <div className={classes.pieContainer2}>
        <Doughnut
       data = {{
        labels: [
          t('Fprice'),
         t('Fuel'),
          t('Revenue')
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [total.failure,total.fuel,total.revenue],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(155, 206, 87)'
          ]
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

export default PieChart2
