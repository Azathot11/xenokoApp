import {useState,useEffect,useContext,useRef,useCallback,} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container,Spinner } from "react-bootstrap";
import AuthContext from '../Store/Auth';
import classes from './SubDetailTwoCar.module.css'
import axios from 'axios'
import Modal from 'react-modal'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Rmodal from '../UI/Rmodal';

const SubDetailTwoCar = (props) => {
    const {t} =useTranslation()
    const [doc,setDoc]=useState([])
    const [documents,setDocments]=useState([])
    const [loading,setLoading] = useState(false)
    const [name,setName] =useState([])
    const [front,setFront]=useState([])
    const [back,setBack]=useState([])
    const [price,setPrice]=useState([])
    const [dateEx,setdateEx]=useState([])
    const [modal2,setModal2]=useState(false)
    const [Pmodal,setPmodal] = useState(false)
    const [loadpic,setLoadPic] = useState('')
    const [iID,setId]= useState('')
    const loadedPrice= [];
    const loadedDate = [];
    
    const loadedName = [];
    const loadedFront = [];
    const loadedBack = [];
    const [secondCid,setSecondCid]= useState('')
   
    const AuthCtx=useContext(AuthContext)
    const notify=()=>{
      toast.success('Succesfull',{autoClose:2000})
   }
   const loadImageHandler =(value)=>{
    setPmodal(true)
     setLoadPic(value)

   }
 

   let notifId =window.location.pathname.split('/')
   let notifIdSplit= notifId[4]
  //  console.log(notifIdSplit)

   const cId = props.id ||notifIdSplit
    const ViewDataHandler =useCallback(() => {
     setLoading(true)
        axios.get(`http://xenoko-api.tejiz-dev.de/user/detail-car/${cId}`,
        {headers: { 
       
          Authorization: "Bearer " + AuthCtx.token,
      },})
        .then((res)=>{  
         setDoc(res.data.Car)
         setDocments(res.data.Car.documents)

         for (const dataObj of res.data.Car.documents) {
            let Fdate = new Date(dataObj.expiry);
            let dateYMD = `${Fdate.getDate()}/${
              Fdate.getMonth() + 1
            }/${Fdate.getFullYear()}`;

            loadedName.push(dataObj.name)
            loadedFront.push(dataObj.frontImage);
            loadedBack.push(dataObj.backImage);
            // loadedPrice.push(dataObj.failureCost);
            loadedDate.push(dateYMD);
           
            
        //  console.log( loadedCost)  
        //  console.log(loadedDate) 
        //  console.log(loadedrevenue) 
        //  console.log( loadedFuel)
    
       setName( loadedName)
       setFront( loadedFront)
       setBack( loadedBack)
       setdateEx( loadedDate)
          }
          setLoading(false)
        }).catch((err)=>{
        console.log(err)
        })
        
      },[]);
    
      useEffect(()=>{
          ViewDataHandler()
      },[ViewDataHandler])
      const ConfirmDeleteDocHandler=()=>{
        console.log(iID)
        fetch(
            `http://xenoko-api.tejiz-dev.de/user/deleteDoc-car/${props.id}`,
            {
              method: "DELETE",
              headers: { 
                  Authorization: "Bearer " + AuthCtx.token, 
                  "Content-Type": "application/json" },
              body: JSON.stringify({
                documentId:iID
              }),
            }
          ).then((res) => {
          if(res.status === 200){
           setModal2(false)
           ViewDataHandler()
           notify()
          }else {
            alert('there is an error')
          }
        });
        
      };
      const cancelModalHandler=()=>{
        setModal2(false)
      }
    return (
        <>
         <Rmodal setPmodal={setPmodal} Pmodal={Pmodal} loadpic={loadpic} />
             {modal2 && <Modal close={cancelModalHandler}
          isOpen={modal2}
          onRequestClose={()=> setModal2(false)}
          className={classes.Modal2}
          overlayClassName={classes.Overlay2}>
                <div className={classes.errMessageCon}>
                 <div className={classes.topp}>
                   <span className={classes.delIC}>  <i className="bi bi-trash trash"></i></span>
                   <h4>{t('Delete')}</h4>
                    <h6>{t('ConfirmM')}</h6>
                 </div>
               </div>
               <div  className={classes.bottom}>
                   <div className={classes.line}/>
                 </div>
                 <div className={classes.CbtnCon}>
                   <button className={classes.btnModal} onClick={cancelModalHandler}>{t("Cancle")}</button>
                   <button  className={classes.btnModal2} onClick={ConfirmDeleteDocHandler}>{t("Submit")}</button>
                 </div>
            </Modal>}
                <Row className=' mx-0 pt-2'  >
                    <Col className='d-flex justify-content-center' >
                      <div className={classes.table_wrapperDD}>
                        <table className={classes.contanTT} >
                        <thead>
                            <tr>
                                <th>{t("Docname")}</th>
                                <th  colspan="2" scope="colgroup">{t("Photo")}</th>
                                {/* <th>Prix</th> */}
                                <th>{t('ExpireDate')}</th>
                                <th>{("Actions")}</th>
                            </tr>
                        </thead>
                      {loading ?<tbody><tr > <td colspan='5' ><Spinner animation="border" variant="secondary" /></td>  </tr></tbody>:<tbody hey={props.id}>
                          {documents.length === 0 ?<tr><td colspan="5" className={classes.Tempty}><h5>{t('result')}</h5></td></tr> : documents.map((x)=>(<tr>
                                <td>{x.name}</td>
                                <td scope="col" ><img src={'http://xenoko-api.tejiz-dev.de/'+x.frontImage}   style={{cursor:"pointer"}}  onClick={()=>{loadImageHandler(x.frontImage)}} alt=''/></td>
                                <td scope="col"><img src={'http://xenoko-api.tejiz-dev.de/'+x.frontImage}   style={{cursor:"pointer"}}  onClick={()=>{loadImageHandler(x.backImage)}} alt=''/></td>
                                {/* <td >8000XAF</td> */}
                                 <td >{ `${new Date(x.expiry).getFullYear()}/${new Date(x.expiry).getMonth()+1}/${new Date(x.expiry).getDate()}`}</td> 
                                 <td onClick={()=>{setId(x._id);setModal2(true)}}><span className={classes.trashish} >
                                <i className="bi bi-trash trash"></i>
                            </span></td>
                            </tr>))}
                        </tbody>}
                    </table>  
                    </div>
                    </Col>
                </Row>
        </>
    )
}

export default SubDetailTwoCar
