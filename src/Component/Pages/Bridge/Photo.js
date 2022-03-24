import React, { useState,useContext } from 'react';
import './Photo.css';
import axios from "axios";
import * as Yup from "yup";
import {Spinner} from "react-bootstrap";
import { useFormik,ErrorMessage } from "formik";
import { MdAddPhotoAlternate } from 'react-icons/md'
import AuthContext from "../../Store/Auth";
import { toast } from "react-toastify";
const Photo = (props) => {
     
    const [loading,setLoading]=useState(false)
    const [images,setImages] =useState('')
    const AuthCtx=useContext(AuthContext)
    
    const notify=()=>{
      toast.success('Succesfully created',{autoClose:2000})
   }
    const imageFrontHandleChange = (event) => {
        setImages(event.target.files[0])
        
        formik.setFieldValue("profile",event.target.files[0]);
    
    
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages(reader.result);
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      
      };
      const  initialValues={
        profile:''
      }
    
      const validationSchema= Yup.object({
        images:Yup.array().min(1,"select at least 1 file")
      })

      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:(values) =>{
          console.log(values)
          let formData = new FormData();
          formData.append('profile',values.profile)
          setLoading(true)
          axios.patch(props.links,formData,
          {headers: {   
            Authorization: "Bearer " + AuthCtx.token,
        },}
          )
          .then((res) => {
          
            if(res.status === 200){
              setLoading(false)
              notify()
              props.close()
              if(props.fetching2){
                props.fetching()
                props.fetching2()
              }
              if(props.fetching){
                props.fetching()
              }
              // props.fetChingg()
            }
          })
        }
      })
	// const handleImageChange = (e) => {
	// 	// console.log(e.target.files[])
	// 	if (e.target.files) {
	// 		const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

	// 		// console.log("filesArray: ", filesArray);

	// 		setSelectedFiles((prevImages) => prevImages.concat(filesArray));
	// 		Array.from(e.target.files).map(
	// 			(file) => URL.revokeObjectURL(file) // avoid memory leak
	// 		);
	// 	}
	// };

	// const renderPhotos = (source) => {
	// 	console.log('source: ', source);
	// 	return source.map((photo) => {
	// 		return <img src={photo} alt="" key={photo} />;
	// 	});
	// };


    return (
        <div>
            <div className="_boite">
                <div className="_image">
                <img   src={images}/>
                
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className='spinerPhoto'>{loading && <Spinner animation="border" variant="secondary" />}</div>
                <div className="_formM_">
                    <input type="file" id="filee" onChange={imageFrontHandleChange} name='profile'   accept="image/*" required /> <br></br>
                    <div className="_Labell">
                        <label htmlFor="filee" className="_label_"><MdAddPhotoAlternate/></label>
                    </div>
                    
                    <div className="_submit">
                       <button type='submit'>Envoyer</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Photo;
