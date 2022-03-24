import React,{useState,useContext, useCallback, useEffect,useRef} from "react";
import styles from './Chauffeur.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container} from "react-bootstrap";
import Title from "../../forms/Title";
import FButton from "../../UI/FButton";
import AuthContext from "../../Store/Auth";
import UpdateFormC from "../../forms/UpdateFormC";
import TabC from "../../Tables/TabC"

import axios from "axios";
import Modal from 'react-modal'
import DriverDoc from "../../forms/DriverDoc";
import Cdetail from "../../Detail/Cdetail";
import {useTranslation} from 'react-i18next'
import { toast } from "react-toastify";
const Chauffeur=props=>{
  const {t} = useTranslation();
  const [callForm, setCallform] = useState(false);
  const [view, setView] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  const [del, setDel] = useState(null);
  const [modal, setModal] = useState(false);

  const [transfer, setTransfer] = useState([]);
  const [drivers, setdrivers] = useState([]);
  const [showDoc, setShowDOc] = useState(false);
  const componentIsMounted = useRef(true);

  const headers = [t('firstname'), t('Latsname'),  t('Telephone'),  t('Email'),  t('Actions')];
  const AuthCtx = useContext(AuthContext);

  const notify=()=>{
    toast.success('Succesfully Deleted ',{autoClose:2000})
 }

  //fetch logic///////////////////////////////////////////
  //http://192.168.100.74:4040/user/drivers
  //http://localhost:3004/drivers
  const fetChing = useCallback(async (infos) => {
    try {
      const res = await fetch("http://xenoko-api.tejiz-dev.de/user/drivers", {
        headers: {
          Authorization: "Bearer " + AuthCtx.token,
        },
      });

      const data = await res.json();
      if (componentIsMounted.current) {
        //data.cars
        setdrivers(data.drivers);
        // console.log(data.drivers)
        // setProfile(data.drivers.profile)
      }
      return () => {
        componentIsMounted = false;
      };
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetChing();
  }, [fetChing]);

  const handlePageClick =async (event, value) => {
    console.log(value)
    // const commentsFormServer = await fetchComments(value);
 };
  //End of fetch logic///////////////////////////////////////////

  //calling Add form/////////////////////////////////

  const showFormHandler = () => {
    setCallform(true);
  };
  const HidetriggerHandler = () => {
    setCallform(false);
  };

  //end of calling Add form////////////////////////

  // Update Functions///////////////////////////
  const vHandler = (event, x) => {
    // console.log(x.status);
    event.preventDefault();
    const newValues = {
      id: x._id,
      firstName: x.fname,
      lastName: x.lname,
      email: x.email,
      tel: x.telephone1,
      tel2: x.telephone2,
      tel3: x.telephone3,
      address: x.address,
      Date: x.birthDate,
      salary: x.salary,
      status: x.status,
      loan: x.loan,
      remain: x.remains,
    };

    setTransfer(newValues);
    setView(true);
  };

  const hidEditForm = () => {
    setView(false);
  };

  // end of Update Functions///////////////////////////

  //AddDoc logic ///////////////////////////////////

  const addDocHandler = (event, x) => {
    event.preventDefault();
    const id = x._id;
    setTransfer(id);
    setShowDOc(true);
  };
  const hideShowDocHandler = () => {
    setShowDOc(false);
  };

  //end Add doc logic//////////////////////////////
  const hideDetailHandler = () => {
    setViewDetail(false);
    AuthCtx.chauffeurDet('')
  };

  //view details logic////////////////////////////////

  const ViewDataHandler = (event, x) => {
    event.preventDefault();
    setViewDetail(true);
    setTransfer(x._id);
  };

 
  
  useEffect(()=>{
    if(AuthCtx.cId !==''){
      setViewDetail(true);
      setTransfer(AuthCtx.cId)
    }
  },[AuthCtx.cId])

  //end ofview details logic////////////////////////////////

  //delete function/////////////////////////////////////////

  const deleteHandler = (event, x) => {
    event.preventDefault();
    // console.log(x._id);
    setModal(true);
    setDel(x._id);
  };
  const confirmDelHandler = () => {
    // console.log("yes");
    axios
      .delete(`http://xenoko-api.tejiz-dev.de/user/delete-driver/${del}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthCtx.token,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          fetChing();
          notify()
        } else {
          alert("there is an error");
        }
      });
    setModal(false);
  };
  const cancelModalHandler = () => {
    setModal(false);
  };


 
 

 

  return (
    <>
      {callForm && <Title onClick={HidetriggerHandler} Fetch2={fetChing} />}
      {showDoc && <DriverDoc hide={hideShowDocHandler} transfer={transfer} />}
      {view && (
        <UpdateFormC hide={hidEditForm} transfer={transfer} Fetch2={fetChing} />
      )}
      {viewDetail && (
        <Cdetail onClick={hideDetailHandler} transfer={transfer} />
      )}
      {modal && (
        <Modal
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
        </Modal>
      )}
      <Container fluid className={styles.container}>
        <Row className="pt-3 pb-4">
          <Col>
            <p
              className={styles.numberOfChauffeurs}
              onClick={HidetriggerHandler}
            >
              {drivers.length} {t('Drivers')}
            </p>
          </Col>
          <Col xs={3} sm={2} lg={2}>
            <FButton onClick={showFormHandler} title={drivers.length === 0 ? t('CreateButton'): t('AddButton')}>{drivers.length === 0 ? t('CreateTranslation'):t('AddTranslation')}</FButton>
          </Col>
        </Row>
        <Row>
          {/* <Col xs={9} sm={10} lg={10} className="pb-3">
               <GlobalFilter query={query}  filterH={ handleChange}/>
            </Col> */}
        </Row>
        <Row>
          <Col>
            <TabC
              drivers={drivers}
              trig={vHandler}
              viewData={ViewDataHandler}
              doc={addDocHandler}
              headers={headers}
              del={deleteHandler}
              handlePageClick={handlePageClick}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Chauffeur;