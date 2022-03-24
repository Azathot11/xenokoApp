import {useState,useEffect,useContext} from "react";
import ReactPaginate from "react-paginate";
import classes from "./Tab.module.css";
import GlobalFilter from "./GlobalFilter";
import AuthContext from "../Store/Auth";
import { useDebounce } from 'usehooks-ts'
import axios from "axios";
import { useHistory } from "react-router";
import {Spinner } from "react-bootstrap";
import { useTranslation} from "react-i18next";
import useWindowDimensions from "../Pages/Bridge/Dimensions";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Tab = ({ trig, viewData, owners, headers,del,handlePageClick}) => {
  const {t} = useTranslation()
  const history =useHistory()
  const [filter,setFilter]=useState(false)
  const [query,setQuery] = useState('')
  const [queryL,setQueryL] = useState('')
  const [queryT,setQueryT] = useState('')
  const [result,setResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('')
  const AuthCtx= useContext(AuthContext)
  const debouncedValue = useDebounce(query, 2000)
  const debouncedValueL = useDebounce(queryL, 2000)
  const debouncedValueT = useDebounce(queryT, 2000)
  const {width } = useWindowDimensions();
  
  let colSpanSIZE = 2
  if(width < 548){
    colSpanSIZE= 6
  }
  
  const handleChange =(e)=>{
    setQuery(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setMessage('')
    }else{
      setFilter(false)     
    }
  
  }

  const handleChangeO =(e)=>{
    setQueryL(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setMessage('')
    }else{
      setFilter(false)     
    }
  
  }
  const handleChangeT =(e)=>{
    setQueryT(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setMessage('')
    }
  }

  useEffect(()=>{
    setLoading(true)
    axios.post(` http://xenoko-api.tejiz-dev.de/user/searchProprietor`,{firstName:query,lastName:queryL,telephone:queryT},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      setResult(res.data.proprietors)
      setLoading(false)
    }).catch((err)=>{
    })

  },[ debouncedValue,debouncedValueL,debouncedValueT])

  const handlePageClick2=()=>{

  }
  
  return (
    <>
      <div className={classes.reseting}>
        <div className={classes.table_wrapperP}>
          <table className={classes.fl_tableO}>
            <thead>
              <tr>
              {headers.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
            </tr>
            <tr className={classes.searchRow} colSpan >
              <th className={classes.firstColumn} colspan={colSpanSIZE}><GlobalFilter  values={query}  filterH={ handleChange} placeholder={t('SearchPH1')}/></th>
              <th colspan='2'><GlobalFilter   values={queryL}  filterH={  handleChangeO} placeholder={t('SearchPH2')}/></th>
              <th  colspan='2'><GlobalFilter  values={queryT}  filterH={ handleChangeT}  placeholder={t('SearchPH3')}/></th>
              {/* <th colspan='3'></th> */}
            
            </tr>
          </thead>

        {loading ?<th colspan='6' > <Spinner animation="border" variant="secondary" /> </th>: !filter? <tbody>
           {owners.length === 0 ?<tr ><td colspan="6" className={classes.Tempty}>{t('result')}</td></tr> : owners.map((x) => (
    
            <tr  key={x._id} title={t('details')}>
              {/* <td onClick={(event) => viewData(event, x)}><Link to={`/bridge/proprietaire/det/${x._id}/voiture`}>{x.lastName}</Link></td> */}
          
              <td className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}> {x.firstName} </td>
              <td className={classes.linkC}  onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.lastName}</td>
              <td className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.telephone}</td>
              <td  className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.email}</td>
              <td className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.cars.length}</td>
             
              <td className={classes.icons}>
                  {/* <span className={classes.eye} onClick={(event) => viewData(event, x)}>
                  <Link to={`/bridge/proprietaire/det/${x._id}/voiture`}>  <i class="far fa-eye"></i></Link>
                  </span> */}
                  <span className={classes.pencil} onClick={(event) => trig(event, x)} title={t('EditAction')}>
                      <i className="bi bi-pencil-square pencil"></i>
                  </span>
                  <span className={classes.trash} onClick={(event) => del(event, x)} title={t('deleteAction')}>
                      <i className="bi bi-trash trash"></i>
                  </span>
              </td>
            </tr>

            ))}
          </tbody>: <tbody>
           {result.length ===0 ?<tr><td colspan="5" className={classes.Tempty}>{t('result')}</td></tr> : result.map((x) => (
              
            <tr  title={t('details')} className={classes.linkC} key={x._id}  onClick={()=>{
              history.push(`/bridge/proprietaire/det/${x._id}/voiture`)
            }}>
              {/* <td onClick={(event) => viewData(event, x)}><Link to={`/bridge/proprietaire/det/${x._id}/voiture`}>{x.lastName}</Link></td> */}
          
              <td className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}> {x.firstName} </td>
              <td className={classes.linkC}  onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.lastName}</td>
              <td className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.telephone}</td>
              <td  className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.email}</td>
              <td className={classes.linkC} onClick={()=>{history.push(`/bridge/proprietaire/det/${x._id}/voiture`)}}>{x.cars.length}</td>
             
             
              <td className={classes.icons}>
                  {/* <span className={classes.eye} onClick={(event) => viewData(event, x)}>
                   <i class="far fa-eye"></i>
                  </span> */}
                  <span className={classes.pencil} onClick={(event) => trig(event, x)}>
                      <i className="bi bi-pencil-square pencil"></i>
                  </span>
                  <span className={classes.trash} onClick={(event) => del(event, x)}>
                      <i className="bi bi-trash trash"></i>
                  </span>
              </td>
            </tr>
            ))}
          </tbody>}
          </table>
         {!filter ? <Stack spacing={2} direction="column" alignItems="end" >
          <Pagination count={10} size="large"  onChange={handlePageClick} />
        </Stack> : <Stack spacing={2} direction="column" alignItems="end" >
          <Pagination count={10} size="large"  onChange={handlePageClick2} />
        </Stack>}
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
          previousClassName={"page-link"}
          nextClassName={"page-item"}
          nextClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        /> */}
        </div>
      </div>
    </>
  );
};

export default Tab;
