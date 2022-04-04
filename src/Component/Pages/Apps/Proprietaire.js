import React, { Fragment,useState, useContext, useEffect,useRef,useCallback,ChangeEvent} from "react";
import styles from "./Proprietaire.module.css";
import AuthContext from "../../Store/Auth";
import FButton from "../../UI/FButton";
import TitleP from "../../forms/TitleP";
import Tab from "../../Tables/Tab";
import UpdateForm from "../../forms/updateForm";


import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import Modal from 'react-modal'
import { useTranslation} from "react-i18next";
import { toast } from "react-toastify";




const Proprietaire = (props) => {
  const {t}=useTranslation()
  const [callForm, setCallform] = useState(false);
  const [view, setView] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [del,setDel]=useState(null)
  const [modal,setModal]=useState(false)

  const [transfer, setTransfer] = useState(null);
  const [owners, setOwners] = useState([]);
  const [pModal,setPmodal] = useState(true)
  const componentIsMounted = useRef(true)
  const headers = [ t('firstname'), t('Latsname'), t('Telephone'),t('Email'), t('NC'), t('Actions')];
  const AuthCtx = useContext(AuthContext);
  
  const notify=()=>{
    toast.success('Deleted successfuly',{autoClose:2000})
 }
 
  const fetChing = useCallback( async (infos) => {
    try {
      const res = await fetch(" http://xenoko-api.tejiz-dev.de/user/proprietor", {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      if(componentIsMounted.current){
        setOwners(data.proprietor);
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
  
  // end of fetching Logic ///////////////////////////

  //calling Add form/////////////////////////////////
  const showFormHandler = () => {
    setCallform(true);
  };

  const HidetriggerHandler = () => {
    setCallform(false);
  };

 

   //end of calling Add form////////////////////////

  // Update Functions///////////////////////////

  const hidEditForm = () => {
    setView(false);
  };

  const vHandler = (event, x) => {

    event.preventDefault();
    const newValues = {
      id: x._id,
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      tel: x.telephone,
      address: x.address,
      date: x.birthDate,
    };
    setTransfer(newValues);
    setView(true);
  };
// end of Update Functions///////////////////////////

 //view details logic////////////////////////////////

  const hideDetailHandler = () => {
    setViewDetail(false);
  };

  const ViewDataHandler = (event, x) => {
    
    event.preventDefault();
    //setViewDetail(true);
    const newValues = {
      id: x._id,
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      tel: x.telephone,
      address: x.address,
      date: x.birthDate,
    };

    setTransfer(newValues);
  };

 //end ofview details logic////////////////////////////////

 //delete function/////////////////////////////////////////
 const deleteHandler = (event,x) => {
  event.preventDefault()
  setDel(x._id)
  setModal(true)
};

const confirmDelHandler=()=>{
   axios
   .delete(`http://xenoko-api.tejiz-dev.de/user/proprietor/${del}`,
   {headers: { 
     "Content-Type": "application/json" ,  
     Authorization: "Bearer " + AuthCtx.token,
 },}
   )
   .then((res) => {
     if(res.status === 200){
      notify()
       fetChing()
       setModal(false)
     }else {
       alert('there is an error')
     }
   });
   
}
const cancelModalHandler=()=>{
  setModal(false)
}
 
 // end of delete ////////////////////////////////////////





// search logic /////////////////////////////////////////////////

// const searchHandler=(row)=>{

//   return row.filter((row) =>
//      row.firstName.indexOf(filter)  > -1 ||
//      row.email.indexOf(filter) > -1  
//      ); 
// }

//end  of search logic /////////////////////////////////////////


  return (
    <Fragment>
      {callForm && <TitleP onClick={HidetriggerHandler}  Fetch2={fetChing} />}
      {view && <UpdateForm hide={hidEditForm} transfer={transfer}  Fetch2={fetChing}  />}
      {modal && <Modal close={cancelModalHandler}
          isOpen={modal}
          onRequestClose={()=> setModal(false)}
          className={styles.Modal}
          overlayClassName={styles.Overlay}>
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
                   <button className={styles.btnModal} onClick={cancelModalHandler}>{t('Cancel')}</button>
                   <button  className={styles.btnModal2} onClick={confirmDelHandler}>{t('Delete')}</button>
                 </div>
            </Modal>}
    
      <Container fluid className={styles.container}>
      
        <Row className="pt-4">
          <Col xs={9} sm={9} lg={10} className="pb-3">
          <p className={styles.numberOfProprietors}> {owners.length} {t('Proprietors')}</p>
          </Col>
          <Col  xs={3} sm={3} lg={2}className={styles.addB}>
            <FButton onClick={showFormHandler} title={owners.length === 0 ? t('CreateButton'): t('AddButton')}>{owners.length === 0 ? t('CreateTranslation'):t('AddTranslation')}</FButton>
          </Col>
        </Row>
        <Row>
          <Col>
              <Tab
             del={deleteHandler}
             trig={vHandler}
             viewData={ViewDataHandler}
             owners={owners}
             // owners={searchHandler(owners)}
             headers={headers}
             handlePageClick={handlePageClick} />
            

          </Col>
        </Row>
      </Container>
      
    </Fragment>
  );
};
export default Proprietaire;
