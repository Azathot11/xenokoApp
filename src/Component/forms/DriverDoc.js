import { useState,useContext } from "react";
import classes from "./ChauffeurSubmit.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import AuthContext from '../Store/Auth';
import{ FaTimesCircle} from 'react-icons/fa'
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from 'react-bootstrap';
import {useTranslation} from 'react-i18next'

const DriverDoc = (props) => {
  const {t} = useTranslation();
  const AuthCtx = useContext(AuthContext);
  const[isLoading,setIsLoading] =useState(false)
  const [error,setError]=useState('')
  const [message,setMessage]=useState('')

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages2, setSelectedImages2] = useState([]);
  const [Appear1,setAppear1]=useState(false)
  const [Appear2,setAppear2]=useState(false)

  const notify=()=>{
    toast.success('Succesfully added',{autoClose:2000})
 }

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
    // console.log(event.target.files[0])

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
      setIsLoading(true)
     
      let data = new FormData();
    
         data.append('frontImage',values.frontImage)
         data.append('backImage',values.backImage)
         data.append('name',values.name)
         data.append('expiry',values.expiry)
        axios
        .put(`http://xenoko-api.tejiz-dev.de/user/addDoc-Driver/${props.transfer}`,data,
        {headers: { 
          "Content-Type": "application/json" ,  
          Authorization: "Bearer " + AuthCtx.token,
      },}
        )
        .then((res) => {
          if(res.status === 201){
            notify()
            setIsLoading(false)
            setError('')
            formik.setFieldValue('')
            reset.resetForm({
              name:'',
              expiry:'',
              frontImage: '',
              backImage:''
            
            })
            setAppear1(false)
            setAppear2(false)
           
          
          }else{
            throw new Error('Some thing went wrong')
          }
         
        }).catch((err)=>{
          setError(err.message)
          setIsLoading(false)
         
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
          <p>{t('DriverF')}</p>
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
              // onChange={st => {
              //   let values = st.target.value; 
              //   formik.setFieldValue("name", values);
              // }}
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
            // onChange={st => {
            //     let values = st.target.value; 
            //     formik.setFieldValue("expiry", values);
            //   }}
          />
              {formik.errors.expiry&& formik.touched.expiry ? (
            <p className={classes.errorColor}>{formik.errors.expiry}</p>
          ) : null}
          </div>

          <label htmlFor="frontImage">{t("FrontImage")}</label>
          <br></br>
          <div className={classes.inputs}>
            <input
              id='frontImage'
              type="file"
              name="frontImage"
              className={frontClasses}
              accept="image/*"
              onBlur={formik.handleBlur}
              onChange={imageFrontHandleChange}
              //imageFrontHandleChange
            />
          </div>
          {formik.errors.frontImage && formik.touched.frontImage ? (
            <p className={classes.errorColor}>{formik.errors.frontImage}</p>
          ) : null}
          <label htmlFor="backImage">{t("BackImage")}</label>
          <br></br>
          <div className={classes.inputs}>
            <input
            id="backImage"
              type="file"
              className={backClasses}
              name="backImage"
              accept="image/*"
              onBlur={formik.handleBlur}
              onChange={imageFrontHandleChange2}
            />
            
          </div>
          
          {formik.errors.backImage && formik.touched.backImage ? (
            <p className={classes.errorColor}>{formik.errors.backImage}</p>
          ) : null}
          <div>
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
          
            {Appear2 && <div className={classes.card2}>
              <div className={classes.cardS2}>
                 <img src={selectedImages2} className={classes.image2} />
                 <p>Back Image</p>
              </div>
              <div className={classes.delete}>
                <button  type="button" onClick={()=>{setSelectedImages2('');setAppear2(false)}}><i class="bi bi-dash"></i></button>
              </div>
            </div>
            }
          </div>
          </div>
        
          <div>
          <p className={classes.errMessage}>{error}</p>
              <div className={classes.spine}>   {isLoading && <Spinner animation="grow" variant="light" />}</div>
            <div className={classes.line}></div>
            <div className={classes.footer}>
              <button type="button" onClick={props.hide}>{t("Cancel")}</button>
              <button type="submit">{t("Submit")}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DriverDoc;
