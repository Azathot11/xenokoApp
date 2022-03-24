import React, { Fragment,useState, useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import classes from "./PDetailCarR.module.css";
import GlobalFilter from "../Tables/GlobalFilter";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../Store/Auth";
import { Col, Row, Container,Spinner } from "react-bootstrap";
import { useDebounce } from 'usehooks-ts'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import axios from "axios";
import "@progress/kendo-theme-default/dist/all.css";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  // ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../Pages/Bridge/Dimensions";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PDetailCarR = (props) => {

 
 const {t} = useTranslation() 
  const [rev, setRev] = useState([]);
  const [filter,setFilter]=useState('all')
  const [show,setShow]=useState(false)
  // const [sDate,setSDate] = useState('')
  const [sIm,setSIm] = useState('')
  const [sCh,setSch]=useState('')
  const [sIm2,setSIm2] = useState('')
  const [sCh2,setSch2]=useState('')
  const [loading,setLoading] = useState(false)
  // const [message,setMessage] = useState('')
  // const [total,setTotals]=useState([])
  const [revenue6,setRevenue6] =useState([])
  const debouncedValueF = useDebounce(filter, 2000)
  // const debouncedValuesD = useDebounce(sDate, 2000)
  const debouncedValuesI = useDebounce(sIm, 2000)
  const debouncedValueTsC = useDebounce(sCh, 2000)

  
  const params = useParams();
  const AuthCtx = useContext(AuthContext);
  const [cost, setCost] = useState([]);
  const [date,setdate] =useState([])
  const [fuel,setFuel] =useState([])
  const [revenue,setRevenue]=useState([])

  const loadedCost = [];
  const loadedDate = [];
  const loadedrevenue = [];
  const loadedFuel = [];
 
  const head=[t('Date'),t('Immatriculation'),t('Chauffeur'),t('Fuel'),t('Failure'),t('Revenue')]

  const {width } = useWindowDimensions();
  
  let colSpanSIZE = 3
  if(width < 719){
    colSpanSIZE= 4
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

  // const selectedDriverHandler = (event)=>{
  //   setSelectedC(event.target.value)
  // }
  const filterHandler=(e)=>{
    setFilter(e.target.value) 
  }

  
   // fetching Logic ///////////////////////////////
  //http://192.168.100.74:4040/user/proprietor
  useEffect(()=>{
    setLoading(true)
    axios.post(` http://xenoko-api.tejiz-dev.de/user/filterProprietorRev/${props.id}`,{query:filter,all:filter,filter:filter,immatriculation:sIm,driverFN:sCh},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{

      
      // console.log(res.data)
      // console.log('sucess')
      // console.log(res.data.revenues)
      // console.log(res.data.revenues)
      setRev(res.data.revenues);
      setRevenue6(res.data)
      for (const dataObj of res.data.revenues) {
        let Fdate = new Date(dataObj.date);
        let dateYMD = `${Fdate.getDate()}/${
          Fdate.getMonth() + 1
        }/${Fdate.getFullYear()}`;

        loadedCost.push(dataObj.failureCost);
        loadedDate.push(dateYMD);
        loadedrevenue.push(dataObj.revenue);
        loadedFuel.push(dataObj.fuel);

        // console.log( loadedCost)  
        // console.log(loadedDate) 
        // console.log(loadedrevenue) 
        // console.log( loadedFuel)

        setCost(loadedCost);
        setdate(loadedDate);
        setRevenue(loadedrevenue);
        setFuel(loadedFuel);
      }
      setLoading(false)
    }).catch((err)=>{
       console.log('error')
    })
    
  },[debouncedValueF,debouncedValuesI,debouncedValueTsC])


const handleCallback=(start, end, label) =>{
  setLoading(true)
 console.log(start._d, end._d, label);
 const dd=start._d
 const dd2=end._d
 const date1= new Date(dd).toISOString()
 const date2= new Date(dd2).toISOString()
 console.log(date1,date2)
 axios.post(` http://xenoko-api.tejiz-dev.de/user/filterRevenues`,{min:date1,max:date2,immatriculation:sIm2,driverFN:sCh2},
   {headers: {  
     Authorization: "Bearer " + AuthCtx.token,
 },})
   .then((res)=>{
   
    //  console.log('success2')
    //  console.log(res.data.revenues)
     setRev(res.data.revenues);
     setRevenue6(res.data)
     for (const dataObj of res.data.revenues) {
       let Fdate = new Date(dataObj.date);
       let dateYMD = `${Fdate.getDate()}/${
         Fdate.getMonth() + 1
       }/${Fdate.getFullYear()}`;

       loadedCost.push(dataObj.failureCost);
       loadedDate.push(dateYMD);
       loadedrevenue.push(dataObj.revenue);
       loadedFuel.push(dataObj.fuel);
       
    // console.log( loadedCost)  
    // console.log(loadedDate) 
    // console.log(loadedrevenue) 
    // console.log( loadedFuel)

       setCost(loadedCost);
       setdate(loadedDate);
       setRevenue(loadedrevenue);
       setFuel(loadedFuel);
     }
     setLoading(false)
   }).catch((err)=>{
      console.log('error')
   })
}
const handlePageClick = () => {};
const handlePageClick2 = () => {};
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
// console.log(failure)
  // end of fetching Logic ///////////////////////////
 
  return (
    <>
      <Container fluid className={classes.container}>
        <Row>
          <Col>
            <Row>
              {loading ? (
                ""
              ) : (
                <Col className="pt-3">
                  <Row>
                    <Col className={classes.cl1}>
                      <p></p>
                      {t("Tfailures")}: {revenue6.failure}
                    </Col>
                  </Row>
                  <Row>
                    <Col className={classes.cl2}>
                      <p></p>
                      {t("Tfuel")}: {revenue6.fuel}
                    </Col>
                  </Row>
                  <Row>
                    <Col className={classes.cl3}>
                      <p></p>
                      {t("Trevenue")}: {revenue6.revenue}
                    </Col>
                  </Row>
                </Col>
              )}
              <Col className="d-flex justify-content-end pt-3">
                <DateRangePicker onCallback={handleCallback}>
                  <button className={classes.BtnC}>Custom</button>
                </DateRangePicker>

                <select className={classes.selected} onChange={filterHandler}>
                  <option
                    selected
                    onClick={() => {
                      setFilter("all");
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
              <Row>
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
                      <b>{t("result")}</b>
                    </h6>{" "}
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Col className="d-flex justify-content-center">
              <Spinner animation="border" variant="secondary" />
            </Col>
          ) : (
            <Col className={classes.table_wrapper}>
              <div className={classes.reseting}>
                <div className={classes.table_wrapperR}>
                  <table className={classes.fl_tableR}>
                    <thead>
                      <tr>
                        {head.map((headerItem, index) => (
                          <th key={index}>{headerItem.toUpperCase()}</th>
                        ))}
                      </tr>
                      <tr className={classes.searchRow}>
                        {/* <th>
                <GlobalDateI  values={sDate} filterH={ handleChange} placeholder='search Date'/>
                </th> */}
                        <th colSpan={colSpanSIZE}>
                          <GlobalFilter
                            values={sIm}
                            filterH={handleChange2}
                            placeholder={t("SearchPH4")}
                          />
                        </th>
                        <th colSpan="3" className={classes.firstColumnR}>
                          <GlobalFilter
                            values={sCh}
                            filterH={handleChange3}
                            placeholder={t("SearchPH1")}
                          />
                        </th>
                      </tr>
                    </thead>

                    {!show ? (
                      <tbody>
                        {rev.length === 0 ? (
                          <tr>
                            <td colSpan="6" className={classes.Tempty}>
                              {t("result")}
                            </td>
                          </tr>
                        ) : (
                          rev.map((c) => (
                            <tr key={c._id}>
                              <td>{`${new Date(c.date).getDate()}/${
                                new Date(c.date).getMonth() + 1
                              }/${new Date(c.date).getFullYear()}`}</td>
                              <td> {c.car.immatriculation}</td>
                              <td>
                                {c.driver.fname} {c.driver.lname}
                              </td>
                              <td>{c.fuel}</td>
                              <td>{c.failureCost}</td>
                              <td>{c.revenue}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    ) : (
                      <tbody>
                        {rev.length === 0 ? (
                          <tr>
                            <td colSpan="6" className={classes.Tempty}>
                              {t("result")}
                            </td>
                          </tr>
                        ) : (
                          rev.map((c) => (
                            <tr key={c._id}>
                              <td>{`${new Date(c.date).getDate()}/${
                                new Date(c.date).getMonth() + 1
                              }/${new Date(c.date).getFullYear()}`}</td>
                              <td> {c.car.immatriculation}</td>
                              <td>
                                {c.driver.fname} {c.driver.lname}
                              </td>
                              <td>{c.fuel}</td>
                              <td>{c.failureCost}</td>
                              <td>{c.revenue}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    )}
                  </table>
                  {!filter ? (
                    <Stack spacing={2} direction="column" alignItems="end">
                      <Pagination
                        count={10}
                        size="large"
                        onChange={handlePageClick}
                      />
                    </Stack>
                  ) : (
                    <Stack spacing={2} direction="column" alignItems="end">
                      <Pagination
                        count={10}
                        size="large"
                        onChange={handlePageClick2}
                      />
                    </Stack>
                  )}
                </div>
              </div>
            </Col>
          )}
        </Row>
        <Row>
          <Col lg="10" className="pb-3"></Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default PDetailCarR;
