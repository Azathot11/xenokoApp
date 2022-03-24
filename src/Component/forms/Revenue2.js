import React, { useState, useContext,useEffect} from 'react';
import classes from './Revenue.module.css';
import { useFormik } from 'formik';
import AuthContext from '../Store/Auth';
import{ FaTimesCircle} from 'react-icons/fa'
import {Spinner} from 'react-bootstrap'
import { toast } from "react-toastify";
import axios from 'axios';
 import { Translation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
const Revenue2 = (props) => {
   const {t} = useTranslation()
    const AuthCtx=useContext( AuthContext)
    const [panne, setPanne] = useState(false)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [carburant, setCarburant] = useState(false)
    const [drivers,setDrivers] =useState([])
    const notify=()=>{
      toast.success('Succesfully created',{autoClose:2000})
   }
    const handlePanHandler =()=>{
        setPanne(!panne)
    }
    const handleCanHandler =()=>{
        setCarburant(!carburant)
    }
    const today = (function() {
         var now  = new Date();
         now.setDate( now.getDate() - 1);
          // const now = new Date();
          const month = (now.getMonth() + 1).toString().padStart(2, '0');
          const day = now.getDate().toString().padStart(2, '0');
          return `${now.getFullYear()}-${month}-${day}`;
      })();

    // const timeHandler=(var1,var2)=>{
    //   var splitted1 = var1.split(":");
    //   var splitted2 = var2.split(":");
    //   // var time1 = splitted1[0]+splitted1[1];
    //   // var time2 = splitted2[0]+splitted2[1];
    //   const hours=  splitted2[0]-splitted1[0]
    //   const minutes =splitted2[1]-splitted1[1]
    //   console.log(hours,minutes)
     
      
    // }
        const validate=(values)=>{
          const errors={}
          if(!values.date){
            errors.date = t('FNEM');
          }

          if (!values.driver) {
            errors.driver = t('FNEM');
          }
          if (!values.revenue) {
            errors.revenue = t('FNEM');
          }

          if (!values.kilometers) {
            errors.kilometers= t('FNEM');
          }
          
          if (!values.fuel) {
            errors.fuel= t('FNEM');
            setCarburant(true)
          }
         
          return errors
        }

      
        const formik=useFormik({
         initialValues:{
          
             date:today,
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
            
         },
         validate,
         onSubmit:(values,onreset)=>{
          var splitted1 = values.enteryTime.split(":");
          var splitted2 = values.exitTime.split(":");
          const hours=  splitted2[0]-splitted1[0]
          let minutes =splitted2[1]-splitted1[1]
          if(minutes === 0){
            minutes = '00'
          }
          if(minutes < 0){
            minutes =  Math.abs(minutes)
          }
          
          const finalTime= hours +'h:'+ minutes
         
           
        console.log({values,finalTime})
          setLoading(true)
            fetch(
              `  http://xenoko-api.tejiz-dev.de/user/add-revenue/${props.transfer.id}`,
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
                  onreset.resetForm({
                    date: today,
                    driver: "",
                    revenue: "",
                    kilometers: "",
                    failureName: "",
                    failureCost: "",
                    handWork: "",
                    extraCost: "",
                    enteryTime: "",
                    exitTime: "",
                    failureDescription: "",
                    fuel: "",
                  });
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
      axios.get(` http://xenoko-api.tejiz-dev.de/user/detail-car/${props.transfer.id}`,
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
                        <p>{t('Revenue')}</p>
                    </div>
                </div>               
                <div className={classes.data_formX}>
                    <form onSubmit={formik.handleSubmit}>

                        <label htmlFor="date">{t('Date')}</label><br></br>
                        <input
                        id='date-input'
                        type='date'
                          className={dateClasses}
                          name='date'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.date}
                          />
                           {formik.touched.date && formik.errors.date ? <p className={classes.errorColor}>{formik.errors.date}</p> : null}

                        <label htmlFor="chauffeur">{t('Driver')}</label><br></br>
                        <select className={` ${driverClasses} ${classes.selectI}`}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                        
                          name='driver'
                          value={formik.values.driver}
                          >
                         <option value="" disabled selected hidden>
                         {t('ChooseC')}
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
                         <label htmlFor="kilometrage">{t('kilometre')}</label><br></br>
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
                               <p>{t('Failure')}</p>
                            <pan className={classes.iconNma} onClick={handlePanHandler}>{panne ?<i class="bi bi-dash"></i> :<i class="bi bi-plus-lg"></i>}</pan>
                          </div>
                          <div className={`${classes.retractEle} ${panne ?'' : classes.inactive}`}>
                         <input 
                            type="text" 
                            placeholder={t('Failure')}
                            name='failureName'
                            onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.failureName}
                            />
                            <input 
                             type="number" 
                             placeholder={t('Fprice')}
                             name='failureCost'
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.failureCost}
                            />
                            
                            
                            <input 
                            type="text" 
                            placeholder={t('Handwork')}
                            name='handWork'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.handWork}
                            />

                             <input type="text"
                             placeholder={t('Extrafee')}
                             name='extraCost'
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.extraCost}
                             />
                                <label htmlFor="enteryTime">heure d'entrée</label>
                               <input
                                placeholder={t('Entime')}
                                type='time'
                                name='enteryTime'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.enteryTime}
                             />
                                <label htmlFor="exitTime">heure de sortie</label>
                               <input
                               type='time'
                                placeholder={t('Extime')}
                                name='exitTime'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.exitTime}
                             />
                            <label htmlFor="descriptionPanne">{t('Descrition')}</label>
                           
                            <textarea
                            placeholder="Failure Description"
                             id="descriptionLaPanne" 
                             name={t('DESf')}
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
                              <p>{t('Fuel')}</p>
                             <pan className={classes.iconNma} onClick={ handleCanHandler}>{carburant ?<i class="bi bi-dash"></i> :<i class="bi bi-plus-lg"></i>}</pan>
                          </div>
                           <div className={`${classes.cab} ${carburant?'' : classes.inactive}`}> 
                            <input
                             type="number" 
                             placeholder={t('FuelH')} 
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
                        <label htmlFor="revenue">{t('Revenue')}</label><br></br>
                        <input 
                        type="number" 
                        placeholder={t('Revenue')}
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
                        <button type="button " onClick={props.close} >{t('Cancel')}</button>
                        <button type='submit'>{t("Submit")}</button>
                    </div>
                    </form>
                </div>
        </div>
    )
}
export default Revenue2;
