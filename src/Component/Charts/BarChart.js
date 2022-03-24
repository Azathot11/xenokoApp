 import React from 'react'
 import { Bar } from "react-chartjs-2";
 const BarChart = ({failure,date,revenue,fuel}) => {
     return (
         <>
          <Bar
           data={{
            labels:date,
            datasets:[
                {
                    label:'Revenue',
                    data:revenue,
                    backgroundColor:'rgb(120, 210, 55)',
                    borderColor:[
                     'rgb(120, 210, 55)',
                 ]

                },
                {
                    label:'Carburant',
                    data:fuel,
                    backgroundColor:'rgb(255, 210, 70)',
                    borderColor:[
                        'rgb(255, 210, 70)',
                    ]
                },
                {
                 label:'Pannes',
                 data:failure,
                 backgroundColor:'rgb(204, 79, 70)',
                 borderColor:[
                     'rgb(204, 79, 70)',
                 ]
             },
             
             
            ]
         }}
         height={400}
         width={600}
         options={{
           maintainAspectRatio:false  
         }}
         />
         </>
     )
 }
 
 export default BarChart
 