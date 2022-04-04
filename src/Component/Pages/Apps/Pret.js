import React, {useEffect, useRef, useMemo ,useState,useContext,useCallback} from "react";
import TabLoan from "../../Tables/TabLoan";
import styles from "./Pret.module.css";
import GlobalFilter from "../../Tables/GlobalFilter";
import FButton from "../../UI/FButton";
import Loan from "../../forms/Loan";
import AuthContext from "../../Store/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateLoan from "../../forms/updateLoan";
import Modal from 'react-modal'
import { Col, Row, Container, Card } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
const Pret = () => {
  const {t} = useTranslation()
  const componentIsMounted = useRef(true)
  const [Laons,setLoans] = useState([])
  const [total,setTotal] =useState([])
  const [show,setShow ]=useState(false)
  const [update,setUpdate]=useState(false)
  const [transfer,setTransfer] =useState([])
  const [del,setDel] = useState()
  const [modal,setModal]=useState(false)
  const AuthCtx=useContext(AuthContext)

  
  const closeupdateHandler=()=>{
    setUpdate(false)
  }
  const closeLoanHandler=()=>{
    setShow(false)
  }
  const notify=()=>{
    toast.success('Succesfully Deleted ',{autoClose:2000})
 }

   //fetch logic///////////////////////////////////////////
  //http://192.168.100.74:4040/user/drivers
  //http://localhost:3004/drivers
  const fetChing = useCallback( async (infos) => {
    try {
      const res = await fetch("http://xenoko-api.tejiz-dev.de/user/loans", {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      if(componentIsMounted.current){
        //data.cars
        setTotal(data)
        setLoans(data.loans);
      }
      return ()=>{
        componentIsMounted = false
      }
    } catch (err) {}
  },[]);

useEffect(()=>{
  fetChing()
},[fetChing])

const handlePageClick =async (event, value) => {
  console.log(value)
  // const commentsFormServer = await fetchComments(value);
};
  //End of fetch logic///////////////////////////////////////////
  
///////edit///////////////////////////////////////////////////////////////
const editHandler=(event,x)=>{
  event.preventDefault()
  const Upvalues={
    id:x._id,
    driver:x.driver,
    date:x.date,
    reason:x.reason,
    amount:x.amount,
  }
  setTransfer(Upvalues)
  setUpdate(true)
}
///////end-edit///////////////////////////////////////////////////////////////

//delete function/////////////////////////////////////////


const deleteHandler = (event,x) => {
  event.preventDefault()
  // console.log(x._id)
  setModal(true)
  setDel(x._id)
};
const confirmDelHandler=()=>{
  // console.log('yes')
   axios
   .delete(` http://xenoko-api.tejiz-dev.de/user/loan/${del}`,
   {headers: { 
     "Content-Type": "application/json" ,  
     Authorization: "Bearer " + AuthCtx.token,
 },}
   )
   .then((res) => {
     console.log(res)
     if(res.status === 200){
       fetChing()
       notify()
     }else {
       alert('there is an error')
     }
   });
   setModal(false)
}
const cancelModalHandler=()=>{
  setModal(false)
}

// end of delete ////////////////////////////////////////

  return (
    <>
    {update && <UpdateLoan  close={closeupdateHandler} transfer={transfer}  fetching={ fetChing}/>}
    {show && <Loan close={closeLoanHandler}  fetching={ fetChing}/>}
    {modal && <Modal close={cancelModalHandler}
          isOpen={modal}
          onRequestClose={()=> setModal(false)}
          className={styles.Modal}
          overlayClassName={styles.Overlay}
         >
                <div className={styles.errMessageCon}>
                 <div className={styles.topp}>
                   <span className={styles.delIC}>  <i className="bi bi-trash trash"></i></span>
                   <h4>{t('Delete')}</h4>
                   <h6>{t('ConfirmM')}</h6>
                 </div>
               </div>
               <div  className={styles.bottom}>
                   <div className={styles.line}/>
                 </div>
                 <div className={styles.CbtnCon}>
                   <button className={styles.btnModal} onClick={cancelModalHandler}>{t("Cancle")}</button>
                   <button  className={styles.btnModal2} onClick={confirmDelHandler}>{t("Delete")}</button>
                 </div>
            </Modal>}
      <div className={styles.container}>
        <Container fluid>
          <Row>
            <Col className='pb-3 d-flex align-items-center'  xs={3} sm={2} lg={10}>
              <div  className={styles.gen}>
                <div className={styles.sommes}>
                <div className={styles.heS}>{t("Loans")}</div>
                  <div className={styles.heT}>{Laons.length}</div>
                 
                </div>
                <div className={styles.total}>
                <div className={styles.heS}>{t("Tloans")}</div>
                  <div  className={styles.heT}>{total.total}</div>
                </div>
                </div>
          </Col>
            <Col className="pb-3 " ><FButton onClick={()=>{setShow(true)}}  title={Laons.length === 0 ? t('CreateButton'): t('AddButton')}>{Laons.length === 0 ? t('CreateTranslation'):t('AddTranslation')}</FButton></Col>
          </Row>
          <Row>
            
            <Col>
                  <TabLoan loans={Laons} edit={editHandler}  del={ deleteHandler} handlePageClick={handlePageClick}/>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Pret;
