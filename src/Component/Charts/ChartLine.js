
import { Line } from "react-chartjs-2";
const ChartLine=props=>{
    return (
        <div>
            <Line
            data={{
               labels:['Jan','Fev','Mars','avril','Mai'] ,
               datasets:[
                   {
                       label:'Depenses',
                       data:[20,30,25,43,53],
                       backgroundColor:'green',
                       borderColor:[
                        'green',
                    ]

                   },
                   {
                    label:'Pannes',
                    data:[10,14,35,47,13],
                    backgroundColor:'green',
                    borderColor:[
                        'green',
                    ]
                },
                {
                    label:'Carburant',
                    data:[10,21,40,67,58],
                    backgroundColor:'green',
                    borderColor:[
                        'green',
                    ]
                }
                
               ]
            }}
            />
        </div>
    )
}
export default ChartLine