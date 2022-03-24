
  import { useState, useCallback, useContext, useEffect, useRef } from "react";
  import { useFormik,ErrorMessage } from "formik";
  import AuthContext from "../Store/Auth";
  import axios from "axios";
  import classes from "./AddCarPicture.module.css";
  import * as Yup from "yup";
  import{ FaTimesCircle} from 'react-icons/fa'
  import { toast } from "react-toastify";
  import { Spinner } from "react-bootstrap";
  import { useTranslation } from "react-i18next";
  
  const AddCarPicture = (props) => {
    const {t} =useTranslation()
    const AuthCtx = useContext(AuthContext);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading,setIsLoading]=useState(false)
    const [formValues, setFormvalues] = useState([]);
  
    const notify=()=>{
      toast.success('Succesfully created',{autoClose:2000})
   }
    const deleteFile = (event) => {
      const s = selectedImages.filter((item, index) => index !== event);
      setSelectedImages(s);
      console.log(s);
    };
  
    const renderPhotos = (source) => {
      console.log("source: ", source);
      return source.map((photo) => {
        return <img src={photo} alt="" key={photo} />;
      });
    };
  
  const  initialValues={
      image:''
    }
  
  const validationSchema= Yup.object({
      images:Yup.array().min(1,"select at least 1 file")
    })
    
    const formik = useFormik({
      
       initialValues,
      validationSchema,
      onSubmit: (values) => {
          let formData = new FormData();
        //   values.images.forEach((photo, index) => {
        //     data.append(`photo${index}`, values.images[index]);
        //     console.log(values.images)
        //   });
        // for( const i of object.keys(values.image)){
        //     data.append('image',values.image[i])
        // }
        for (var i = 0; i < values.image.length; i += 1) {
            var x=values.image[i];
            formData.append('images', x);
            console.log(x)
        }
        setIsLoading(true)
           axios
          .patch(` http://xenoko-api.tejiz-dev.de/user/image-car/${props.id}`,formData,
          {headers: {
            Authorization: "Bearer " + AuthCtx.token,
        },}
          )
          .then((res) => {
            if(res.status === 200){
              setIsLoading(false)
              props.fet()
              notify()
            }
          }).catch((err)=>{
            setIsLoading(false)
            alert(err.message)
          }
)
         
        }
    });
  
    return (
      <div className={classes.form}>
        <div className={classes.title_box}>
        <FaTimesCircle className={classes.faicon}  onClick={props.close}/>
          <div className={classes.title_text}>
            <p>{t('CarF')}</p>
          </div>
        </div>
  
        <div className={classes.personal}>
          <p>Document Information</p>
        </div>
  
        <div className={classes.data_form}>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="Images">{t("AddCarpic")}</label>
            <br></br>
            <div className={classes.inputs}>
              <input
                required
                id="file"
                name="image"
                type="file"
                multiple
                accept="image/*"
                onChange={(event) => {
                  if (event.target.files) {
                           const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
                      
                           // console.log("filesArray: ", filesArray);
                      
                           setSelectedImages((prevImages) => prevImages.concat(filesArray));
                           Array.from(event.target.files).map(
                               (file) => URL.revokeObjectURL(file) // avoid memory leak
                           );
                       }
                  const files= event.target.files;
                  let image =Array.from(files);
                  formik.setFieldValue("image", image);
                  
                }}
              />
            </div>
  
            <div className={classes.assurance}>
              <div className="form-group preview">
                {selectedImages.length > 0 &&
                  selectedImages.map((item, index) => {
                    return (
                      <div key={item}>
                        <img src={item} alt="preview images" className={classes.previewImages}/>
                        <button type="button" onClick={() => deleteFile(index)}>
                          delete
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={classes.line}></div>
            <div className={classes.spine}>   {loading && <Spinner animation="grow" variant="light" />}</div>
            <div className={classes.footer}>
              <button  onClick={props.close}>{t("Cancel")}</button>
              <button type="submit">{t("Submit")}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddCarPicture;
  