import React, {useState, useContext,useEffect, useRef, useCallback,} from "react";
import TabR from "../../Tables/TabR";
import styles from "./revenue.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container,Spinner  } from "react-bootstrap";
import AuthContext from "../../Store/Auth";
import axios from "axios";
import BarChart from "../../Charts/BarChart";
import EditAddRevenue from "../../forms/EditAddRevenue";
import { useDebounce } from "usehooks-ts";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Modal from "react-modal";
import PieChart from "../../Charts/PieChart";
import { toast } from "react-toastify";

import "@progress/kendo-theme-default/dist/all.css";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";
import { useTranslation } from "react-i18next";
const Revenue = () => {
  const {t}=useTranslation()
  const [error,setError]=useState('')
  const [rev, setRev] = useState([]);
  const headers = [
    t('Date'),t('Immatriculation'),t('Chauffeur'),t('Proprietors'),t('Fuel'),t('Failure'),t('Revenue'),
    t('Actions'),
  ];
  const [cost, setCost] = useState([]);
  const [date, setdate] = useState([]);
  const [fuel, setFuel] = useState([]);
  const [transfer, setTransfer] = useState();
  const [revenue2, setRevenue2] = useState([]);
    const [revenue3, setRevenue3] = useState([]);
    const [revenue4, setRevenue4] = useState([]);
    const [revenue5, setRevenue5] = useState([]);
    const [revenue6,setRevenue6] =useState([])
    const [revenue7, setRevenue7] = useState([]);
    const [revenue, setRevenue] = useState([]);
  const [edit, setEdit] = useState(false)
  const [query, setQuery] = useState("all");
  const [modalIsopen,setModalIsOpen] = useState(false)
  const [loading,setLoading]=useState(false)

  const [sIm,setSIm] = useState('')
  const [sCh,setSch]=useState('')
  const [sIm2,setSIm2] = useState('')
  const [sCh2,setSch2]=useState('')
  const [show,setShow]=useState(false)
  const [del,setDel]=useState(null)
  const [modal,setModal]=useState(false)
  const componentIsMounted = useRef(true);

  const AuthCtx = useContext(AuthContext);
  const debouncedValue = useDebounce(query, 2000)
  const debouncedValuesI = useDebounce(sIm, 2000)
  const debouncedValueTsC = useDebounce(sCh, 2000)


  const loadedCost = [];
  const loadedDate = [];
  const loadedrevenue = [];
  const loadedFuel = [];
 
  const notify=()=>{
    toast.success('Succesfully deleted',{autoClose:2000})
 }
  const notify2=()=>{
    toast.warn(error,{autoClose:2000})
 }

  const toggleModalHandler= ()=>{
    setModalIsOpen(true)
  }

  const closeToggleModalHandler =()=>{
    setModalIsOpen(false)
  }
  const handleChange2=(e)=>{
   
    setSIm(e.target.value)
    setSIm2(e.target.value)
    if(e.target.value.trim().length > 0){
      setShow(true)
    }else{
      setShow(false)
    }
  }
  const handleChange3=(e)=>{
  
    setSch(e.target.value)
    setSch2(e.target.value)
    if(e.target.value.trim().length > 0){
      setShow(true)
    }else{
      setShow(false)
    }
  }
 

  const viewDetHandler=(event,c)=>{
    event.preventDefault()
    
    axios.get(`  http://xenoko-api.tejiz-dev.de/user/revenue/${c._id}`,
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
     
      setRevenue3(res.data.revenue.car)
      setRevenue4(res.data.revenue.driver)
      setRevenue5(res.data.revenue.proprietor)
      setRevenue7(res.data.remain)
      setRevenue2(res.data.revenue)
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      
    }).catch((err)=>{
       console.log('error')
    })

    setModalIsOpen(true)
  }
 

  const closeEditHandler = () => {
    setEdit(false);
  };
  const editDetail = (event, c) => {
    let date = new Date(c.date);
    // let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    let dateMDY = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    event.preventDefault();
    setEdit(true);
    const valuesHand = {
      id1:c._id,
      id2:c.car._id,
      date: dateMDY,
      driver: c.driver,
      revenue: c.revenue,
      kilometers: c.kilometers,
      failureName: c.failureName,
      failureCost: c.failureCost,
      handWork: "",
      extraCost: c.extraCost,
      failureDescription: c.failureDescription,
      fuel: c.fuel,
      enteryTime:c.enteryTime,
      exitTime:c.exitTime
    };
    
    setTransfer(valuesHand);
  };

  const handleChange =(e)=>{
   
    setQuery(e.target.value) 
  }


  const fetchHandler=useCallback(()=>{
    setLoading(true)
   
    if(sIm && sCh !==''){
      
    }
    axios.post(`  http://xenoko-api.tejiz-dev.de/user/filterRevenues`,{query,immatriculation:sIm,driverFN:sCh,filter:query,all:query},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
      setRevenue6(res.data)
      setRev(res.data.revenues);
      
      for (const dataObj of res.data.revenues) {
        let Fdate = new Date(dataObj.date);
        let dateYMD = `${Fdate.getDate()}/${
          Fdate.getMonth() + 1
        }/${Fdate.getFullYear()}`;

        loadedCost.push(dataObj.failureCost);
        loadedDate.push(dateYMD);
        loadedrevenue.push(dataObj.revenue);
        loadedFuel.push(dataObj.fuel);

      

        setCost(loadedCost);
        setdate(loadedDate);
        setRevenue(loadedrevenue);
        setFuel(loadedFuel);
      }
      setLoading(false)
    }).catch((err)=>{
       console.log('error')
    })

  },[])

  useEffect(()=>{
  //   setLoading(true)
   
  //   if(sIm && sCh !==''){
      
  //   }
  //   axios.post(`  http://xenoko-api.tejiz-dev.de/user/filterRevenues`,{query,immatriculation:sIm,driverFN:sCh,filter:query,all:query},
  //   {headers: {  
  //     Authorization: "Bearer " + AuthCtx.token,
  // },})
  //   .then((res)=>{
  //     setRevenue6(res.data)
  //     setRev(res.data.revenues);
      
  //     for (const dataObj of res.data.revenues) {
  //       let Fdate = new Date(dataObj.date);
  //       let dateYMD = `${Fdate.getDate()}/${
  //         Fdate.getMonth() + 1
  //       }/${Fdate.getFullYear()}`;

  //       loadedCost.push(dataObj.failureCost);
  //       loadedDate.push(dateYMD);
  //       loadedrevenue.push(dataObj.revenue);
  //       loadedFuel.push(dataObj.fuel);

      

  //       setCost(loadedCost);
  //       setdate(loadedDate);
  //       setRevenue(loadedrevenue);
  //       setFuel(loadedFuel);
  //     }
  //     setLoading(false)
  //   }).catch((err)=>{
  //      console.log('error')
  //   })
  fetchHandler()

  },[debouncedValue,debouncedValuesI,debouncedValueTsC])
 
 const handleCallback=(start, end, label) =>{

  setLoading(true)
  const dd=start._d
  const dd2=end._d
  const date1= new Date(dd).toISOString()
  const date2= new Date(dd2).toISOString()
 
  axios.post(`http://xenoko-api.tejiz-dev.de/user/filterRevenues`,{min:date1,max:date2,immatriculation:sIm2,driverFN:sCh2},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
     

      if(res.status===200){
       
      }
    
      setRevenue6(res.data)
      setRev(res.data.revenues);
     
      for (const dataObj of res.data.revenues) {
        let Fdate = new Date(dataObj.date);
        let dateYMD = `${Fdate.getDate()}/${
          Fdate.getMonth() + 1
        }/${Fdate.getFullYear()}`;

        loadedCost.push(dataObj.failureCost);
        loadedDate.push(dateYMD);
        loadedrevenue.push(dataObj.revenue);
        loadedFuel.push(dataObj.fuel);
   
        setCost(loadedCost);
        setdate(loadedDate);
        setRevenue(loadedrevenue);
        setFuel(loadedFuel);
      }
      setLoading(false)
    }).catch((err)=>{
   
    })
   
}

const handlePageClick = ()=>{

}
const handlePageClick2 = ()=>{
  
}


//delete function/////////////////////////////////////////
const deleteHandler = (event,c) => {
  event.preventDefault()
  setDel(c._id)
  setModal(true)
};

const confirmDelHandler=()=>{
   axios
   .delete(`http://xenoko-api.tejiz-dev.de/user/delete-rev/${del}`,
   {headers: { 
     "Content-Type": "application/json" ,  
     Authorization: "Bearer " + AuthCtx.token,
 },}
   )
   .then((res) => {
     if(res.status === 200){
      setModal(false)
       notify()
       fetchHandler()
     }
     if(!res.ok) {
       throw new Error('Something wend wrong')
     }
   }).catch((err)=>{
    setError(err.message)
   });

}
const cancelModalHandler=()=>{
  setModal(false)
}
 
 // end of delete ////////////////////////////////////////

 const series = [
  {
    name: t("Failure"),
    data: cost,
  },
  {
    name: t("Fuel"),
    data: fuel,
  },
  {
    name: t("Revenue"),
    data:revenue,
  },
  
  
];
console.log(revenue2)

  return (
    <>
     
        <Modal
          close={cancelModalHandler}
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          className={styles.Modal2}
          overlayClassName={styles.Overlay2}
        >
          <div className={styles.errMessageCon}>
            <div className={styles.topp}>
              <span className={styles.delIC}>
                {" "}
                <i className="bi bi-trash trash"></i>
              </span>
              <h4>{t("Delete")}</h4>
              <h6>{t("ConfirmM")}</h6>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.line} />
          </div>
          <div className={styles.CbtnCon}>
            <button className={styles.btnModal} onClick={cancelModalHandler}>
              {t("Cancle")}
            </button>
            <button className={styles.btnModal2} onClick={confirmDelHandler}>
              {t("Delete")}
            </button>
          </div>
        </Modal>
    
      <Modal
        isOpen={modalIsopen}
        onRequestClose={() => setModalIsOpen(false)}
        className={styles.Modal1}
        overlayClassName={styles.Overlay1}
      >
        <Row className={styles.rowPie}>
          {" "}
          <Col>
            <PieChart
              data={[
                revenue2.failureCost,
                revenue2.extraCost,
                revenue7,
                revenue2.fuel,
                revenue2.revenue,
              ]}
              label={[
                t("Fprice"),
                t("Extrafee"),
                t("Manquant"),
                t("Fuel"),
                t("Revenue"),
              ]}
              colors={[
                'rgb(200, 16, 46)',
                'rgb(255,140,0)',
                'rgb(255, 205, 86)',
                '#A5D8E3',
                '#02CF22'
              ]}
              className={styles.modalContentT}
            />
          </Col>
          <Col className="d-flex justify-content-end px-5">
            <p className={styles.dateM}>{`${new Date(
              revenue2.date
            ).getFullYear()}/${
              new Date(revenue2.date).getMonth() + 1
            }/${new Date(revenue2.date).getDate()}`}</p>{" "}
          </Col>{" "}
        </Row>

        <Row className={styles.FrowP}>
          <Col>
            <Row className="d-flex align-items-center">
              <Col className="d-flex align-items-center">
                <div className={styles.section1}>
                  <p>
                    <i className="fas fa-car"></i>
                  </p>
                  <p>
                    <p>{t("Cars")} </p>{" "}
                  </p>
                </div>
              </Col>
              <Col>
                <p>{revenue3.immatriculation}</p>
              </Col>
            </Row>

            <Row className="d-flex align-items-center">
              <Col className="d-flex">
                <div className={styles.section1}>
                  <p>
                    <i className="fas fa-user-check"></i>
                  </p>
                  <p>{t("Proprietors")} </p>
                </div>
              </Col>
              <Col>
                <p>
                  {revenue5.firstName} {revenue5.lastName}
                </p>
              </Col>
            </Row>
            <Row className="d-flex align-items-center">
              <Col className="d-flex align-items-center">
                <div className={styles.section1}>
                  <p>
                    {" "}
                    <i class="fas fa-user-tag"></i>
                  </p>
                  <p>{t("Drivers")} </p>
                </div>
              </Col>
              <Col className="d-flex align-items-center">
                <p>
                  {revenue4.fname} {revenue4.lname}
                </p>
              </Col>
            </Row>
            <Row className="d-flex align-items-center">
              <Col className="d-flex align-items-center">
                <div className={styles.section1}>
                  <p>
                    {" "}
                    <i class="bi bi-clock"></i>
                  </p>
                  <p>{t("TimeSpentAtgarage")}</p>
                </div>
              </Col>
              <Col className="d-flex align-items-center">
                <p>{revenue2.timeSpent}</p>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row className={styles.rowS}>
              <div className={styles.firstT}>
                <div className={styles.firstT1}>
                  <span className={styles.o2}></span>
                  <p>{t("Fprice")} :</p>
                </div>
                <p>{revenue2.failureCost}</p>
              </div>
              <div className={styles.firstT}>
                <div className={styles.firstT1}>
                  <span className={styles.o1}></span>
                  <p>{t("Extrafee")} :</p>
                </div>
                <p>{revenue2.extraCost}</p>
              </div>
              <div className={styles.firstT}>
                <div className={styles.firstT1}>
                  <span className={styles.o3}></span>
                  <p>{t("Manquant")} :</p>
                </div>
                <p>{revenue7}</p>
              </div>
              <div className={styles.firstT}>
                <div className={styles.firstT1}>
                  <span className={styles.o5}></span>
                  <p>{t("Fuel")} :</p>
                </div>
                <p>{revenue2.fuel}</p>
              </div>

              {/* <div className={styles.firstT}>
              <div className={styles.firstT1}>
                 <span className={styles.o4}></span>
                 <p>Kilometers :</p>
              </div>
              <p>{revenue.extraCost}</p>
            </div> */}
              <div className={styles.firstT}>
                <div className={styles.firstT1}>
                  <span className={styles.o6}></span>
                  <p>{t("kilometre")}</p>
                </div>
                <p>{revenue2.kilometers}</p>
              </div>

              <div className={styles.firstT}>
                <div className={styles.firstT1}>
                  <span className={styles.o}></span>
                  <p>{t("Revenue")}</p>
                </div>
                <p>{revenue2.revenue}</p>
              </div>
            </Row>
          </Col>
        </Row>
      </Modal>
      {edit && <EditAddRevenue transfer={transfer} close={closeEditHandler} />}
      <Container fluid className={styles.container}>
        <Row className="p-0 m-0">
          {/* <Row>
              <Col></Col>
            </Row>
            <Row>
              <Col className="pt-4">
              
              </Col>
            </Row> */}

          <Row className={styles.coloR}>
            <Col>
              <Row>
                {loading ? (
                  ""
                ) : (
                  <Col className="pt-3">
                    <Row>
                      <Col className={styles.cl1}>
                        <p></p>
                        {t("Tfailures")}: {revenue6.failure}
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.cl2}>
                        <p></p>
                        {t("Tfuel")}: {revenue6.fuel}
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.cl3}>
                        <p></p>
                        {t("Trevenue")}: {revenue6.revenue}
                      </Col>
                    </Row>
                  </Col>
                )}
                <Col className="d-flex justify-content-end pt-3">
                  <DateRangePicker onCallback={handleCallback}>
                    <button className={styles.BtnC}>Custom</button>
                  </DateRangePicker>

                  <select className={styles.selected} onChange={handleChange}>
                    <option
                      onClick={() => {
                        setQuery("all");
                      }}
                    >
                      {t("Filter")}
                    </option>
                    <option value="all">{t("All")}</option>
                    <option value="today"> {t("Today")}</option>
                    <option value="week"> {t("Week")}</option>
                    <option value="month"> {t("Month")}</option>
                    <option value="year"> {t("Year")}</option>
                  </select>
                </Col>
              </Row>
              {loading ? (
                <Row></Row>
              ) : (
                <Row className="d-flex justify-content-center align-items-center">
                  {rev.length > 0 ? (
                    <Col>
                      <Chart>
                        <ChartLegend position="top" orientation="horizontal" />
                        <ChartCategoryAxis>
                          <ChartCategoryAxisItem
                            categories={date}
                            startAngle={45}
                          />
                        </ChartCategoryAxis>
                        <ChartSeries>
                          {series.map((item, idx) => (
                            <ChartSeriesItem
                              key={idx}
                              type="column"
                              data={item.data}
                              name={item.name}
                            />
                          ))}
                        </ChartSeries>
                      </Chart>
                    </Col>
                  ) : (
                    <Col className="d-flex justify-content-center align-items-center pt-3">
                      {" "}
                      <h6>
                        <b> {t("result")}</b>
                      </h6>{" "}
                    </Col>
                  )}
                </Row>
              )}
            </Col>
          </Row>

          <Row className="m-0 p-0">
            <Row className={styles.coloo}>
              {loading ? (
                <Col className="d-flex justify-content-center  pb-3">
                  <Spinner animation="border" variant="secondary" />
                </Col>
              ) : (
                <Col className="pt-5 ">
                  <TabR
                    headers={headers}
                    rev={rev}
                    trig={editDetail}
                    view={viewDetHandler}
                    del={deleteHandler}
                    handleChange2={handleChange2}
                    handleChange3={handleChange3}
                    ssCh={sCh}
                    simm={sIm}
                    handlePageClick={handlePageClick}
                    handlePageClick2={handlePageClick2}
                  />
                </Col>
              )}
            </Row>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default Revenue;
