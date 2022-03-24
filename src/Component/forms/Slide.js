import { useState,useContext,useEffect,useCallback } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Slide.css";
import classes from "./Slide.module.css";
import AddCarPicture from "./AddCarPicture";
import SubDetailOneCar from "../Detail/SubDetailOneCar";
import SubDetailTwoCar from "../Detail/SubDetailTwoCar";
import SubDetailThreeCar from "../Detail/SubDetailThreeCar";
import axios from 'axios'
import AuthContext from '../Store/Auth'
import { NavLink } from "react-router-dom";
import { Route ,Redirect,Switch} from 'react-router-dom'
import { t } from "i18next";
const Slide = (props) => {

  const [info,setInfo]=useState([])
  const [total,setTotal]=useState([])
  const [carInfo,setCarInfo] = useState([])
  const [proprietor,setProprietor]=useState([])
  const [size,setSize]=useState('')
 
  const[ Revenues,setRevenues]=useState([])
  const [carImages, setImages]=useState([])
  const AuthCtx=useContext(AuthContext)
  const params = useParams()
  const images = [...carImages];
  // const images = [ voiture1, voiture2, voiture3];


  const [ AddCarPic,setAddCarPicture]=useState(false)
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <IoIosArrowBack />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <IoIosArrowForward />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };
const openHandler =()=>{
   setAddCarPicture(true)
}
const closenHandler =()=>{
  setAddCarPicture(false)
}




  //GEt Ch lodic ////////////////////
  const fet = useCallback (() => axios.get(` http://xenoko-api.tejiz-dev.de/user/detail-car/${ params.vi}`,
  {headers: { 
    "Content-Type": "application/json" ,  
    Authorization: "Bearer " + AuthCtx.token,
},}
  )
  .then((res) => {
    if(res.status === 200){
    
      
    }else {
      alert('there is an error')
    }    
    setTotal(res.data)
    setSize(res.data.Car.drivers.length)
    setInfo(res.data.Car.drivers)
    setCarInfo(res.data.Car)
    console.log(res.data.Car)
    setProprietor(res.data.Car.proprietor)
  setImages(res.data.Car.images)
  })
  ,[]);
  useEffect(()=>{
    fet()
  },[fet])
   
    //End Ch logic//////////////////////
// console.log(params.vi)
 
  return (
    <>
    { AddCarPic && <AddCarPicture close={closenHandler} id={params.vi} fet={fet} />}
    <div className= {classes._page}>
      <div className="app">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx}  className={idx === imageIndex ? "slide activeSlide" : "slide"}>
              <img src={' http://xenoko-api.tejiz-dev.de/'+img} alt={img} />
            </div>
          ))}
        </Slider>
      </div>
      <div className={classes.centerAE} >
        <button style={{color:"#FFFF"}} className={classes.editAdd} onClick={openHandler}>{images.length===0 ?t('Add'): t('Edit') }</button>
      </div>
      {/* <div>{params.vi}</div> */}
     
      <div className= {classes._nvbr}>
        <ul >
          <li className={classes.listItems}  ><NavLink to={`/bridge/voiture/detail/${params.vi}/subOne`} activeClassName={classes.active}>About</NavLink></li>
          <li className={classes.listItems}><NavLink to={`/bridge/voiture/detail/${params.vi}/subTwo`} activeClassName={classes.active}>Documents</NavLink></li>
          <li  className={classes.listItems}><NavLink to={`/bridge/voiture/detail/${params.vi}/subThree`} activeClassName={classes.active}>Revenues</NavLink></li>
        </ul>
      </div>
      
         
<Switch>
         <Route path={`/bridge/voiture/detail/${params.vi}/subOne`}>
          <SubDetailOneCar info={info} size={size} id={params.vi} carInfo={carInfo} fet={fet} proprietor={proprietor}/>
         </Route>
         <Route path={`/bridge/voiture/detail/${params.vi}/subTwo`}>
            <SubDetailTwoCar id={params.vi} />
         </Route>
         <Route path={`/bridge/voiture/detail/${params.vi}/subThree`}>
            <SubDetailThreeCar total={total}/>
         </Route>
         </Switch>
    </div>
    </>
  );
}

export default Slide;
