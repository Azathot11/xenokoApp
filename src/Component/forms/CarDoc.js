import { useState,useContext } from "react";
import classes from "./ChauffeurSubmit.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import AuthContext from '../Store/Auth';
import{ FaTimesCircle} from 'react-icons/fa'
import axios from "axios";
import {Spinner} from 'react-bootstrap'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const CarDoc = (props) => {
  const {t}=useTranslation();
  const AuthCtx = useContext(AuthContext);
  const notify=()=>{
    toast.success('Succesfully added',{autoClose:2000})
 }
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages2, setSelectedImages2] = useState([]);
  const [loading,setIsloading]=useState(false)
  const [error,setError]=useState(null)
  const [Appear1,setAppear1]=useState(false)
  const [Appear2,setAppear2]=useState(false)

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = t('FNEM');
    } 
  
    if (!values. expiry) {
      errors. expiry = t('FNEM');
    } 
  
    if (!values. frontImage) {
      errors. frontImage = t('FNEM');
    } 
    if (!values. backImage) {
      errors. backImage = t('FNEM');
    } 
    return errors;
  };
  const imageFrontHandleChange = (event) => {
  

    formik.setFieldValue("frontImage",event.target.files[0]);
    const reader = new FileReader();
    
    reader.onload = () => {

      if (reader.readyState === 2) {
        setSelectedImages(reader.result);
        setAppear1(true)
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    //console.log(event.target.value);
  };

  const imageFrontHandleChange2 = (event) => {
    
    formik.setFieldValue("backImage",event.target.files[0]);


    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImages2(reader.result);
        setAppear2(true)
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  
  };

  //const handleSubmit = (values) => {};
  const formik = useFormik({
    initialValues: {
      name:'',
      expiry:'',
      frontImage: '',
      backImage:''
     // Date: "",
    },
    validate,
    
onSubmit: (values,reset) => {
  let data = new FormData();

     data.append('frontImage',values.frontImage)
     data.append('backImage',values.backImage)
     data.append('name',values.name)
     data.append('expiry',values.expiry)
     setIsloading(true)
    axios
    .put(` http://xenoko-api.tejiz-dev.de/user/addDoc-Car/${props.transfer}`,data,
    {headers: { 
      "Content-Type": "application/json" ,  
      Authorization: "Bearer " + AuthCtx.token,
  },}
    )
    .then((res) => {
      console.log(res)
      if(res.status === 201){
        setIsloading(false)
        notify()
        reset.resetForm({
          name:'',
          expiry:'',
          frontImage: '',
          backImage:''
        
        })
        setAppear1(false)
        setAppear2(false)
      }

      if(!res.ok === 201){
        throw new Error ('Something went wrong')
      }
    
    }).catch((err)=>{
      setIsloading(false)
      console.log(err.message)
      setError(err.message)
    })
 
},
  });

  const nameClasses =formik.errors.name && formik.touched.name? `${classes.IFlc} ${classes.invalid}`
    : `${classes.IFlc}`;
   const expiryClasses =
  formik.errors.expiry && formik.touched.expiry
    ? `${classes.IFlc} ${classes.invalid}`
    : `${classes.IFlc}`;
    const frontClasses =
    formik.errors.frontImage && formik.touched.frontImage
      ? `${classes.IFlc} ${classes.invalid}`
      : `${classes.IFlc}`;
      const backClasses =
      formik.errors.backImage && formik.touched.backImage
        ? `${classes.IFlc} ${classes.invalid}`
        : `${classes.IFlc}`;
  return (
    <div className={classes.form}>
      <div className={classes.title_box}>
      <FaTimesCircle className={classes.faicon} onClick={props.hide}/>
        <div className={classes.title_text}>
          <p>{t("CarDoc")}</p>
        </div>
      </div>

      <div className={classes.personal}>
        <p>Document Information</p>
      </div>

      <div className={classes.data_form}>
        <form onSubmit={formik.handleSubmit} >
          <div className={classes.doc}>
            <label htmlfor="doc">{t("Docname")}</label>
            <br></br>
            <input
              type="text"
              id="doc"
              name="name"
              className={nameClasses }
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name ? (
            <p className={classes.errorColor}>{formik.errors.name}</p>
          ) : null}
            <label htmlfor="expiry">{t("ExpireDate")}</label>
            <br></br>
            <input
             type="date"
             id='expiry'
             name="expiry"
             min="1900-01-01"
             max="2100-12-31"
             className={expiryClasses }
             onBlur={formik.handleBlur}
             onChange={formik.handleChange}
             value={formik.values.expiry}
          />
              {formik.errors.expiry&& formik.touched.expiry ? (
            <p className={classes.errorColor}>{formik.errors.expiry}</p>
          ) : null}
          </div>

          <label htmlFor="frontImage">{t("FrontImage")}</label>
          <br></br>
          <div className={classes.doc}>
            <input
              id='frontImage'
              type="file"
              name="frontImage"
              className={frontClasses}
              accept="image/*"
              onChange={imageFrontHandleChange}
              //imageFrontHandleChange
            />
          </div>
          {formik.errors.frontImage && formik.touched.frontImage ? (
            <p className={classes.errorColor}>{formik.errors.frontImage}</p>
          ) : null}
          <label htmlFor="backImage">{t("BackImage")}</label>
          <br></br>
          <div className={classes.doc}>
            <input
            id="backImage"
              type="file"
              className={backClasses}
              name="backImage"
              accept="image/*"
              onChange={imageFrontHandleChange2}
            />
          </div>
          {formik.errors.backImage && formik.touched.backImage ? (
            <p className={classes.errorColor}>{formik.errors.backImage}</p>
          ) : null}
          <div className={classes.assurance}>
          { Appear1 && <div className={classes.card}>
              <div className={classes.cardS}>
                 <img src={selectedImages} className={classes.image} />
                 <p>Back Image</p>
              </div>
              <div className={classes.delete}>
                <button  type="button" onClick={()=>{setSelectedImages('');setAppear1(false)}}><i class="bi bi-dash"></i></button>
              </div>
          </div>
          }
            {Appear2 && <div className={classes.card}>
              <div className={classes.cardS}>
                 <img src={selectedImages2} className={classes.image} />
                 <p>Back Image</p>
              </div>
              <div className={classes.delete}>
                <button  type="button" onClick={()=>{setSelectedImages2('');setAppear2(false)}}><i class="bi bi-dash"></i></button>
              </div>
            </div>
            }
          </div>
          <div className={classes.Load_error}>
            <p>{error}</p>
            <div> {loading && <Spinner animation="grow" variant="light" />}</div>
          </div>
          <div className={classes.line}></div>
          <div className={classes.footer}>
            <button type="button" onClick={props.hide}>{t("Cancel")}</button>
            <button type="submit">{t("Submit")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CarDoc;


