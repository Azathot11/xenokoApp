import React, { useState, useContext,useEffect ,useRef,useCallback} from "react";
import styles from "./Voiture.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Card } from "react-bootstrap";
import Car from "../../forms/Car";
import AuthContext from "../../Store/Auth";
import FButton from "../../UI/FButton";
import EditCars from "../../forms/EditCars";
import CarDoc from "../../forms/CarDoc";
import Revenue2 from '../../forms/Revenue2'
import TabVi from "../../Tables/TableVi";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal'
import { useTranslation } from "react-i18next";
const Voiture = (props) => {
  const {t} = useTranslation()
  const [callForm, setCallform] = useState(false);
  const [callEdit,setCallEdit] = useState(false)
  const [ViewD,setViewD] = useState(false)
  const [transfer,setTransfer]=useState(null)
  const [cars, setcars] = useState([]);
  const [error,setError] =useState('')

  const [del,setDel]=useState(null)
  const [modal,setModal]=useState(false)
  const componentIsMounted = useRef(true)
  const AuthCtx=useContext(AuthContext)
  const [showDoc,setShowDOc] =useState(false)
  const [Rproprietor,setRproprietor] =useState([])


  const headers = [t('Immatriculation'),t('Brand'),t('Chassis'), t( "Status"), t("Actions"), ];
  const [rev,setRev] =useState(false)
  const [carDet,setDetail]= useState([])

  const notify=()=>{
    toast.success('Deleted succesfully',{autoClose:2000})
 }
  //fetch logic///////////////////////////////////////////
  //http://192.168.100.74:4040/user/cars
  const fetChing = useCallback( async (infos) => {
    try {
      const res = await fetch("  http://xenoko-api.tejiz-dev.de/user/cars", {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      if(componentIsMounted.current){
        //data.cars
        setcars(data.cars);
      }
      return ()=>{
        componentIsMounted = false
      }
    } catch (err) {}
  },[]);

useEffect(()=>{
  fetChing()
},[fetChing])
  
   
  //End of fetch logic///////////////////////////////////////////


  // fetching Logic proprietors///////////////////////////////
  //http://192.168.100.74:4040/user/proprietor
  const fetChingg = useCallback( async (infos) => {
    try {
      const res = await fetch("  http://xenoko-api.tejiz-dev.de/user/proprietor", {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      
      if(componentIsMounted.current){
        //data.cars
        setRproprietor(data.proprietor);
        
        
      }
      return ()=>{
        componentIsMounted = false
      }
     
   
    } catch (err) {}
  },[]);

useEffect(()=>{
  (fetChingg())
},[fetChingg])
 
  // end of fetching Logic ///////////////////////////

//calling Add form/////////////////////////////////
const showFormHandler = () => {
  setCallform(true);
};

const HidetriggerHandler = () => {
  setCallform(false);
};

 //end of calling Add form////////////////////////


  //AddDoc logic ///////////////////////////////////
   
  const addDocHandler =(event,x)=>{
    event.preventDefault()
    setTransfer(x._id);
    setShowDOc(true)
    event.preventDefault()
   }

   const hideShowDocHandler =()=>{
     setShowDOc(false)
     
   }
  //end Add doc logic//////////////////////////////
 
//update info logic///////////////////////////////
const setFalseHandler=()=>{
  setCallEdit(false)
}
const updateCarsHandler=(event,x)=>{
  event.preventDefault()
  setCallEdit(true)
  const newValues = {
    id:x._id,
    imatriculation:x.immatriculation,
    brand:x.brand,
    model:x.model,
    chassis:x.chassis,
    status:x.status,
    proprietor:x.proprietor,
    location:x.location,
    expectedAmount:x.awaitedRevenue,
  };
 
  setTransfer(newValues)
}

const closeEditHandler =()=>{
  setCallEdit(false)
}

//update info logic//////////////////////////////

//delete function/////////////////////////////////////////


const deleteHandler = (event,x) => {
  event.preventDefault()
  setDel(x._id)
  setModal(true)

};
const confirmDelHandler=()=>{
  
   axios
   .delete(`http://xenoko-api.tejiz-dev.de/user/delete-car/${del}`,
   {headers: { 
     "Content-Type": "application/json" ,  
     Authorization: "Bearer " + AuthCtx.token,
 },}
   )
   .then((res) => {
     if(res.status === 200){
      setModal(false)
      notify()
       fetChing()
     }
    
   });
}
const cancelModalHandler=()=>{
  setModal(false)
}

// end of delete ////////////////////////////////////////



const addRevenueHandler=(event,x)=>{
  event.preventDefault()
  const values= {
      id:x._id,
      drivers:x.drivers
  }

 axios.get(`http://xenoko-api.tejiz-dev.de/user/detail-car/${x._id}`,
   {headers: { 
     Authorization: "Bearer " + AuthCtx.token,
 },}
   )
   .then((res) => {
     if(res.status === 200){
       const driverS=res.data.Car.drivers
       setDetail(res.data.Car.drivers)
      
     }else {
       alert('there is an error')
     }
   });
  setRev(true)
  setTransfer(values)
}
const closeRevenueHandler=()=>{
  setRev(false)
}


  return (
    <>
      {rev && <Revenue2 transfer={transfer} close={closeRevenueHandler} />}
      {callForm && <Car onClick={HidetriggerHandler}  Rproprietor={Rproprietor} fetCh2={fetChing}/>}
      {callEdit && <EditCars transfer={transfer} close={closeEditHandler} Rproprietor={Rproprietor} closeEdit={setFalseHandler} fetCh2={fetChing}/>}
      {showDoc && <CarDoc  hide={hideShowDocHandler} transfer={transfer}/>}
      {modal && <Modal 
         close={cancelModalHandler}
         isOpen={modal}
         onRequestClose={() => setModal(false)}
         className={styles.Modal}
         overlayClassName={styles.Overlay}
       >
         <div className={styles.errMessageCon}>
           <div className={styles.topp}>
             <span className={styles.delIC}>
               {" "}
               <i className="bi bi-trash trash"></i>
             </span>
             <h4>{t('Delete')}</h4>
             <h6>{t('ConfirmM')}</h6>
           </div>
         </div>
         <div className={styles.bottom}>
           <div className={styles.line} />
         </div>
         <div className={styles.CbtnCon}>
           <button className={styles.btnModal} onClick={cancelModalHandler}>
           {t('Cancel')}
           </button>
           <button className={styles.btnModal2} onClick={confirmDelHandler}>
           {t('Delete')}
           </button>
         </div>
            </Modal>}
      {/* {<Slide/>} */}
      <Container fluid className={styles.container}>
        <Row>
          <Col xs={8} sm={9} lg={10}>
            <p className={styles.numberOfVoiture}>{cars.length} {t('Cars')}</p>
          </Col>
          <Col   xs={4} sm={3} lg={2}  className="pb-4">
            <FButton onClick={showFormHandler}title={cars.length === 0 ? t('CreateButton'): t('AddButton')}>{cars.length === 0 ? t('CreateTranslation'):t('AddTranslation')}</FButton>
          </Col>
        </Row>
       
        <Row>
          <Col>
          <TabVi
           del={deleteHandler} 
           headers={headers} 
           doc={addDocHandler}
           cars={cars} 
           trig={updateCarsHandler} 
           addRe={addRevenueHandler} /> 
          
           
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Voiture;

