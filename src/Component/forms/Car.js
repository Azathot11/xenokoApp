import React, { Fragment,useState, useContext} from "react";
import classes from "./Car.module.css";
import { useFormik } from "formik";
import AuthContext from "../Store/Auth";
import{ FaTimesCircle} from 'react-icons/fa'
import {Spinner} from 'react-bootstrap'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Car = (props) => {
  const {t} = useTranslation()
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const AuthCtx =useContext(AuthContext)
  const notify=()=>{
    toast.success('Succesfully created',{autoClose:2000})
 }
 const validate = (values) => {
  const errors = {};
  if (!values.immatriculation) {
    errors.immatriculation = t( "FNEM");
  }
  //  else if (values.immatriculation.length < 4) {
  //   errors.immatriculation = "immatriculation must be more than 2 letters";
  // }

  if (!values.model) {
    errors.model = t( "FNEM");;
  } 

  if(!values.brand){
    errors.brand =  t( "FNEM");
  }


  if (!values.chassis) {
    errors.chassis =  t( "FNEM");
  }
  
  if (!values.expectedAmount) {
    errors.expectedAmount =  t( "FNEM");
  }
 

  if (!values.status) {
    errors.status =  t( "FNEM");
  }
  if (!values.proprietor) {
    errors.proprietor =  t( "FNEM");
  }
  return errors;
};
  const formik = useFormik({
    initialValues: {
      immatriculation: "",
      brand:'',
      model: "",
      status: "",
      chassis: "",
      status: "",
      proprietor:"",
      expectedAmount:"",
      location:""
     
    },
    validate,
    onSubmit: (values, onreset) => {
      setLoading(true)
      const fetchHandler = async (info) => {
        
        try {
          //'http://192.168.100.74:4040/auth/signup'
          const response = await fetch(
            "  http://xenoko-api.tejiz-dev.de/user/add-car",
            {
              method: "PUT",
              body: JSON.stringify({
                immatriculation:values.immatriculation,
                brand: values.brand,
                model:values.model,
                chassis:values.chassis,
                status:values.status,
                proprietor:values.proprietor,
                location:values.location,
                awaitedRevenue:values.expectedAmount
              }),
              headers: {
                Authorization :'Bearer ' + AuthCtx.token,
                "Content-Type": "application/json",
              },
            }
          );
          if(response.status === 201){
            setLoading(false)
            notify()
            setError(false)
            props.fetCh2()
            onreset.resetForm({
              immatriculation: "",
              brand:'',
              model: "",
              chassis: "",
              expectedAmount:"",
              status: "",
              proprietor:"",
              findCar:"",
              location:""
            });
          }
          if(!response.ok){
            throw new Error('An error occured')
          }
          const data = response.json();
          props.fetCh2()
        } catch (err) {
          setError(err.message)
          setLoading(false)
        }
      };
      fetchHandler()
    },
   
  });

  const imClasses =
    formik.errors.immatriculation && formik.touched.immatriculation
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
      
  const brandClasses =
  formik.errors.brand && formik.touched.brand
    ? `${classes.IFlc} ${classes.invalid}`
    : `${classes.IFlc}`;
  const mClasses =
    formik.errors.model && formik.touched.model
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
  const chassisClasses =
    formik.errors.chassis && formik.touched.chassis
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
      const expectedClasses =
    formik.errors.expectedAmount && formik.touched.expectedAmount
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;

      
  return (
    <div className={classes.form}>
      <div className={classes.title_box}>
      <FaTimesCircle className={classes.faicon} onClick={props.onClick}/>
        <p className={classes.title_text}>{t('CarF')}</p>
      </div>

      <div className={classes.data_form}>
        <form  onSubmit={formik.handleSubmit}>
          <label htmlFor="immatriculation">{t('Immatriculation')}</label>
          <br></br>
          <input
            type="text"
            id="immatriculation"
            name="immatriculation"
            className={imClasses}
            onChange={formik.handleChange}
            value={formik.values.immatriculation}
          />
          {formik.errors.immatriculation && formik.touched.immatriculation ? (
            <p className={classes.errorColor}>
              {formik.errors.immatriculation}
            </p>
          ) : null}
           <label htmlFor="model">{t('Brand')}</label>
          <br></br>
          <input
            type="text"
            id="model"
            name="brand"
            className={brandClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
          />
           {formik.errors.brand && formik.touched.brand ? (
            <p className={classes.errorColor}>
              {formik.errors.brand}
            </p>
          ) : null}
          <label htmlFor="model">{t('Model')}</label>
          <br></br>
          <input
            type="text"
            id="model"
            name="model"
            className={mClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.model}
          />
          {formik.errors.model && formik.touched.model ? (
            <p className={classes.errorColor}>{formik.errors.model}</p>
          ) : null}
          <label htmlFor="chassis">{t('Chassis')}</label>
          <br></br>
          <input
            type="text"
            id="chassis"
            name="chassis"
            className={chassisClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.chassis}
          />
          {formik.errors.chassis && formik.touched.chassis ? (
            <p className={classes.errorColor}>{formik.errors.chassis}</p>
          ) : null}
            <label htmlFor="SAD">{t('ExpectedAmount')}</label>
          <br></br>
          <input
            type="number"
            id="SAD"
            name="expectedAmount"
            className={expectedClasses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expectedAmount}
          />
          {formik.errors.expectedAmount && formik.touched.expectedAmount ? (
            <p className={classes.errorColor}>{formik.errors.expectedAmount}</p>
          ) : null}
            <label htmlFor="loaction">{t('Localisationlink')}</label>
          <br></br>
          <input
            type="link"
            id="location"
            name="location"
            className={classes.IFlc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
            <label htmlFor="asign">{t('AssignP')}</label>
          <br></br>
          <select
            id="proprietor"
            name="proprietor"
            className={classes.select}
            onChange={formik.handleChange}
            placeholder='choose a status'
            value={formik.values.proprietor}
          >
            <option value="" disabled selected hidden>{t('ChooseP')}</option>
           { props.Rproprietor.map((p)=>(<option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>))}
          </select>
          {formik.errors.proprietor && formik.touched.proprietor ? (
            <p className={classes.errorColor}>{formik.errors.proprietor}</p>
          ) : null}
          
          <label htmlFor="status">{t("Status")}</label>
          <br></br>
          <select
            id="status"
            name="status"
            className={classes.select}
            value={formik.values.status}
            onChange={formik.handleChange}
            placeholder='choose a status'
          >
            <option value="" disabled selected hidden>{t("ChooseSTS")}</option>
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
          {formik.errors.status && formik.touched.status ? (
            <p className={classes.errorColor}>{formik.errors.status}</p>
          ) : null}
              <p className={classes.errMessage}>{error}</p>
                          <div className={classes.spine}>   {loading && <Spinner animation="grow" variant="light" />}</div>
          <div className={classes.spac}>
                <div className={classes.line}></div>
                <div className={classes.footer}>
                    <button>{t('Cancel')}</button>
                    <button type='submit'>{t('Submit')}</button>
                </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Car;
