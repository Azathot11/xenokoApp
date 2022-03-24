import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import ReactPaginate from "react-paginate";
import classes from "./PDetailCarV.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../Store/Auth";
import { Spinner } from "react-bootstrap";
import GlobalFilter from "../Tables/GlobalFilter";
import axios from "axios";
import { useDebounce } from "usehooks-ts";
import { useHistory } from "react-router";
import {useTranslation} from 'react-i18next'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PDetailCarsP = (props) => {
  const {t} = useTranslation()
  const [filter, setFilter] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const debouncedValue = useDebounce(query, 2000);
  const [pannes, setPanne] = useState([]);
  const componentIsMounted = useRef(true);
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  const headers = [t('immatriculation'), t('Failure'),t('Description'), t('price'),t('Extrafee'), t('Handwork')];
  const varR= 'all'

  const handleChange = (e) => {
    setQuery(e.target.value);

    if (e.target.value.trim().length > 0) {
      setFilter(true);
      setMessage("");
    } else {
      setFilter(false);
    }
  };

  // fetching Logic ///////////////////////////////
  //http://192.168.100.74:4040/user/proprietor
  const fetChing = useCallback(async (infos) => {
   
  }, []);

  useEffect(()=>{
    setLoading(true)
    axios.post(` http://xenoko-api.tejiz-dev.de/user/filterProprietorRev/${props.id}`,{query:varR,},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{

      
      // console.log(res.data)
      // console.log('sucess')
    
      // console.log(res.data.revenues)
      setPanne(res.data.revenues);
     
      setLoading(false)
    }).catch((err)=>{
       console.log('error')
    })
    
  },[debouncedValue])
const handlePageClick = () => {};
const handlePageClick2 = () => {};

  // end of fetching Logic ///////////////////////////

//   const handleChange = (e) => {
//     setQuery(e.target.value);

//     if (e.target.value.trim().length > 0) {
//       setFilter(true);
//       setMessage("");
//     } else {
//       setFilter(false);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .post(
//         `http://xenoko-api.tejiz-dev.de/user/searchProprietorCars/${props.id}`,
//         { immatriculation: query},
//         {
//           headers: {
//             Authorization: "Bearer " + AuthCtx.token,
//           },
//         }
//       )
//       .then((res) => {
//         // alert(JSON.stringify(res.data.proprietors, null, 2));
//         setResult(res.data.cars);
//         setLoading(false);
//       })
//       .catch((err) => {});
//   }, [debouncedValue]);
 

  return (
  <>
    <div className={classes.reseting}>
            <div  className={classes.table_wrapperv}>
                <table className={classes.fl_tableV}>
                <thead>
                    <tr>
                    {headers.map((headerItem, index) => (
                        <th key={index}>{headerItem.toUpperCase()}</th>
                    ))}
                    </tr>
              <tr className={classes.searchRow}>
              <th colSpan='6'><GlobalFilter  values={query}  filterH={handleChange} placeholder={t('SearchPH4')}/></th>
            </tr>
                </thead>
              {loading ?<th colSpan='6' > <Spinner animation="border" variant="secondary" /></th>:!filter ? <tbody>
                    {pannes.length === 0 ?<tr><td colSpan="6" className={classes.Tempty}>{t('result')}</td></tr>: pannes.map((x) => (
                    <tr className={classes.linkC} key={x._id} onClick={()=>{
                      history.push(`/vinfo/${x._id}`)
                    }} >
                            <td>{x.car.immatriculation}</td>
                            <td> {x.failureName}</td>
                            <td className={classes.disappear}>{x.failureDescription}</td>
                            <td>{x.failureCost}</td>
                            <td> {x.handWork}</td>
                            <td> {x.extraCost}</td>
                           
                    </tr>
                    ))}
                </tbody> :<tbody>
                    {result.length === 0 ?<tr><td colSpan="5" className={classes.Tempty}><p>NO Cars !</p></td></tr>: result.map((x) => (
                    <tr className={classes.linkC} key={x._id} onClick={()=>{
                      history.push(`/vinfo/${x._id}`)
                    }}>
                            <td>{x.car.immatriculation}</td>
                            <td> {x.failureName}</td>
                            <td className={classes.disappear}>{x.failureDescription}</td>
                            <td>{x.failureCost}</td>
                            <td> {x.handWork}</td>
                            <td> {x.extraCost}</td>
                    </tr>
                    ))}
                </tbody>}
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
                {/* <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={20}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-end"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                /> */}
                </div>
            </div>
 
  </>
  );
};

export default PDetailCarsP;
