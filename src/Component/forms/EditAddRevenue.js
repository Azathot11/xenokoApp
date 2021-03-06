import React, { useState, useContext,useEffect,useCallback} from 'react';
import classes from './Revenue.module.css';
import { useFormik } from 'formik';
import AuthContext from '../Store/Auth';
import{ FaTimesCircle} from 'react-icons/fa'
import {Spinner} from 'react-bootstrap'
import { toast } from "react-toastify";
import axios from 'axios';
 
const EditAddRevenue = (props) => {
    const AuthCtx=useContext( AuthContext)
    const [panne, setPanne] = useState(false)
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [carburant, setCarburant] = useState(false)
    const [drivers,setDrivers] =useState([])
    const [formValues,setFormvalues]=useState(null)
    
    const notify=()=>{
      toast.success('Succesfully updated',{autoClose:2000})
   }
    const handlePanHandler =()=>{
        setPanne(!panne)
    }
    const handleCanHandler =()=>{
        setCarburant(!carburant)
    }
    
        const validate=(values)=>{
          const errors={}
          if(!values.date){
            errors.date = "Required";
          }

          if (!values.driver) {
            errors.driver = "driver required";
          }
          if (!values.revenue) {
            errors.revenue = "revenue required";
          }

          if (!values.kilometers) {
            errors.kilometers= "kilometers required";
          }
          
          if (!values.fuel) {
            errors.fuel= "fuel required";
            setCarburant(true)
          }
         
          return errors
        }
        const  initialValues={
          date:'',
          driver:'',
          revenue:'',
          kilometers:'',
          failureName:'',
          failureCost:'',
          handWork:'',
          extraCost:'',
          enteryTime:'',
          exitTime:'',
          failureDescription:'',
          fuel:'',
        }
        const  savedValues={  
          date:props.transfer.date,
          driver: props.transfer.driver._id,
          revenue:props.transfer.revenue,
          kilometers:props.transfer.kilometers,
          failureName:props.transfer.failureName,
          failureCost: props.transfer.failureCost,
          handWork:props.transfer.handWork,
          extraCost:props.transfer.extraCost,
          enteryTime: props.transfer.enteryTime,
          exitTime: props.transfer.exitTime,
          failureDescription:props.transfer.failureDescription,
          fuel:props.transfer.fuel,
        }
        
        const setValueHandler =useCallback(()=>{
          setFormvalues(savedValues)
         },[])
      
         useEffect(()=>{
        
          setValueHandler()
          setCarburant(true)
          setPanne(true)
         },[ setValueHandler])
      
        const formik=useFormik({
          initialValues:formValues || initialValues,
          validate,
          enableReinitialize:true,
         onSubmit:(values,onreset)=>{
          var splitted1 = values.enteryTime.split(":");
          var splitted2 = values.exitTime.split(":");
          const hours=  splitted2[0]-splitted1[0]
          const minutes =splitted2[1]-splitted1[1]
          
          const finalTime= hours +'h:'+ minutes
          const finalTime2=finalTime.toString()
          setLoading(true)
            fetch(
              `http://xenoko-api.tejiz-dev.de/user/edit-revenue/${props.transfer.id1}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + AuthCtx.token,
                },
                body: JSON.stringify({
                  date: values.date,
                  driver: values.driver,
                  revenue: values.revenue,
                  kilometers: values.kilometers,
                  failureName:values.failureName,
                  failureCost:values.failureCost,
                  handWork:values.handWork,
                  extraCost:values.extraCost,
                  enteryTime:values.enteryTime,
                  exitTime:values.exitTime,
                  failureDescription:values.failureDescription,
                  fuel:values.fuel,
                  timeSpent:finalTime,
                }),
              }
            )
              .then((res) => {
                if (res.status === 200) {
                  setLoading(false);
                  notify();
                  setError('')
                  res.json();
                }
                if (!res.ok) {
                  throw new Error("An error occured");
                }
              })
              .catch((err) => {
                setError(err.message);
                setLoading(false);
              });
         }
     })
     useEffect(()=>{
      axios.get(` http://xenoko-api.tejiz-dev.de/user/detail-car/${props.transfer.id2}`,
      {headers: { 
        Authorization: "Bearer " + AuthCtx.token,
    },}
      )
      .then((res) => {
        if(res.status === 200){
          setDrivers(res.data.Car.drivers)
          
        }
      });
     },[])
     const dateClasses =
     formik.errors.date && formik.touched.date
       ? `${classes.IFlc} ${classes.invalid}`
       : `${classes.IFlc}`;
     const driverClasses =
    formik.errors.driver && formik.touched.driver
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const revenueClasses =
    formik.errors.revenue && formik.touched.revenue
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
     
  const kilolClasses =
    formik.errors.kilometers && formik.touched.kilometers
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const fuelClasses =
    formik.errors.fuel && formik.touched.fuel
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
 
  
      const salaryClasses =
      formik.errors.salary && formik.touched.salary
        ? `${classes.IFlc} ${classes.invalid}`
        : `${classes.IFlc}`;
   

    return (
        <div  className={`${classes.formX} ${panne || carburant ? classes.inactive :''}` }>
            
                <div  className={classes.title_boxX}>
                <FaTimesCircle className={classes.faicon} onClick={props.close}/>
                    <div className={classes.title_text}> 
                        <p>Revenue</p>
                    </div>
                </div>               
                <div className={classes.data_formX}>
                    <form onSubmit={formik.handleSubmit}>

                        <label htmlFor="date">Date</label><br></br>
                        <input
                          asp-for="date" asp-format="{0:yyyy-MM-dd}"
                          placeholder="YYY-MM-DD"
                          name='date'
                          className={dateClasses}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.date}
                          />
                           {formik.touched.date && formik.errors.date ? <p className={classes.errorColor}>{formik.errors.date}</p> : null}

                        <label htmlFor="chauffeur">Chauffeur</label><br></br>
                        <select className={` ${driverClasses} ${classes.selectI}`}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                        
                          name='driver'
                          value={formik.values.driver}
                          >
                         <option value="" disabled selected hidden>
                          Choose driver
                       </option>
                       {drivers.map((c) => (
                         <option key={c._id} value={c._id}>
                           {c.fname} {c.lname}{" "}
                           </option>
                         ))}
                       </select>

                        {formik.touched.driver &&formik.errors.driver ? <p className={classes.errorColor}>{formik.errors.driver}</p> : null}
                        {/* <label htmlFor="awaitedRevenue">Awaited Revenue</label><br></br>
                        <input 
                        type="number" 
                        placeholder="awaitedRevenue"
                        name='awaitedRevenue'
                        className={awaitedrevenueClasses}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.awaitedRevenue}
                        /> */}
                         <label htmlFor="kilometrage">kilometrage</label><br></br>
                        <input 
                        type="number"
                        placeholder="kilometrage"
                        name='kilometers'
                        className={kilolClasses}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.kilometers}
                        />
                        {formik.touched.kilometers &&formik.errors.kilometers ? <p className={classes.errorColor}>{formik.errors.kilometers}</p> : null}
                         
                         <hr></hr>
                          <div className={classes.retract}>
                              <p>Panne</p>
                            <pan className={classes.iconNma} onClick={handlePanHandler}>{panne ?<i class="bi bi-dash"></i> :<i class="bi bi-plus-lg"></i>}</pan>
                          </div>
                          <div className={`${classes.retractEle} ${panne ?'' : classes.inactive}`}>
                         <input 
                            type="text" 
                            placeholder="Panne"
                            name='failureName'
                            onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.failureName}
                            />
                            <input 
                             type="number" 
                             placeholder="prix de panne"
                             name='failureCost'
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.failureCost}
                            />
                            
                            
                            <input 
                            type="text" 
                            placeholder="main d'oevre de r??paration"
                            name='handWork'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.handWork}
                            />

                             <input type="text"
                             placeholder="fraix extra"
                             name='extraCost'
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.extraCost}
                             />
                                <label htmlFor="enteryTime">heure d'entr??e</label>
                               <input
                                placeholder="heure d'entr??e"
                                type='time'
                                name='enteryTime'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.enteryTime}
                             />
                                <label htmlFor="exitTime">heure de sortie</label>
                               <input
                               type='time'
                                placeholder="heure de sortie"
                                name='exitTime'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.exitTime}
                             />
                            <label htmlFor="descriptionPanne">Description de la panne</label>
                           
                            <textarea
                            placeholder="Failure Description"
                             id="descriptionLaPanne" 
                             name="failureDescription"
                             rows="6"  
                             cols="50"
                             onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.failureDescription}
                             >
                              </textarea>
                              
                              </div>
                              <hr></hr>
                              <div className={classes.retract}>
                              <p>Carburant</p>
                             <pan className={classes.iconNma} onClick={ handleCanHandler}>{carburant ?<i class="bi bi-dash"></i> :<i class="bi bi-plus-lg"></i>}</pan>
                          </div>
                           <div className={`${classes.cab} ${carburant?'' : classes.inactive}`}> 
                            <input
                             type="number" 
                             placeholder="Prix du Carburant" 
                             name='fuel'
                             className={fuelClasses}
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.fuel}
                             />
                              {formik.touched.fuel &&formik.errors.fuel? <p className={classes.errorColor}>{formik.errors.fuel}</p> : null}
                             </div>
                            
                            <hr></hr>
                          {formik.touched.awaitedRevenue &&formik.errors.awaitedRevenue ? <p className={classes.errorColor}>{formik.errors.awaitedRevenue}</p> : null}
                        <label htmlFor="revenue">Revenue</label><br></br>
                        <input 
                        type="number" 
                        placeholder="revenue"
                        name='revenue'
                        className={revenueClasses}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.revenue}
                        />
                          {formik.touched.revenue &&formik.errors.revenue ? <p className={classes.errorColor}>{formik.errors.revenue}</p> : null}
                          <p className={classes.errMessage}>{error}</p>
                          <div className={classes.spine}>   {loading && <Spinner animation="grow" variant="light" />}</div>
                          <div className={classes.lineB}></div>
                      <div className={classes.footerB}>
                        <button type="button " onClick={props.close} >Cancel</button>
                        <button type='submit'>Submit</button>
                    </div>
                    </form>
                </div>
        </div>
    )
}
export default EditAddRevenue;




// <div className={classes.ligneX}>
// <div className ={classes.head_}>
//     <p>Panne</p>
//     <button onClick={() => setPanne(!panne)}>{!panne ? <AiOutlinePlus/> : <AiOutlineMinus/>}</button>
   
// </div>                 
   
// {/* {panne && <Panne onChange={formik.handleChange} onBlur={formik.handleBlur}  />} */}
 

// </div>
// <div className={classes.ligneX}>
// <div className ={classes.head_}>
//     <p>Carburant</p>
//     <button onClick={() => setCarburant(!carburant)}>{!carburant ? <AiOutlinePlus/> : <AiOutlineMinus/>}</button>
// </div>
// <div className = {styless._formm}>
 
     
// </div>
// {/* {carburant && <Carburant/>} */}
// </div>
