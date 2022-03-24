import {useState,useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Store/Auth";
import ReactPaginate from "react-paginate";
import classes from "./Tab.module.css";
import GlobalFilter from "./GlobalFilter";

import axios from "axios";
import { useDebounce } from 'usehooks-ts'

const TabV = ({ trig,  cars, headers ,del,doc, addRe}) => {

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
 
  const handleChange =(e)=>{
    setQuery(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setLoading(true)
      setMessage('')
    }else{
      setFilter(false)     
    }
  
  }

  const handleChangeO =(e)=>{
    setQueryL(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setLoading(true)
      setMessage('')
    }else{
      setFilter(false)     
    }
  
  }
  const handleChangeT =(e)=>{
    setQueryT(e.target.value)
    if( e.target.value.trim().length > 0){
      setFilter(true)
      setLoading(true)
      setMessage('')
    }
  }

  useEffect(()=>{
    console.log(query)
    axios.post(` http://192.168.100.74:4040/user/searchDriver`,{keyword:query},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
      console.log(res.data.proprietors)
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      setResult(res.data.proprietors)
    }).catch((err)=>{
       console.log('error')
    })

  },[ debouncedValue])
  useEffect(()=>{
    console.log(query)
    
    axios.post(`http://192.168.100.74:4040/user/searchProprietor`,{keyword:queryL},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      console.log(res.data.proprietors)
      setResult(res.data.proprietors)
    }).catch((err)=>{
       console.log('error')
    })

  },[ debouncedValueL])

  useEffect(()=>{
    console.log(query)
    axios.post(` http://192.168.100.74:4040/user/searchProprietor`,{keyword:queryT},
    {headers: {  
      Authorization: "Bearer " + AuthCtx.token,
  },})
    .then((res)=>{
      // alert(JSON.stringify(res.data.proprietors, null, 2));
      console.log(res.data.proprietors)
      setResult(res.data.proprietors)
    }).catch((err)=>{
       console.log('error')
    })
  },[ debouncedValueT])
      
      const handlePageClick = () => {};
    return (
        <>
           <div className={classes.reseting}>
               <div  className={classes.table_wrapper}>
               <table className={classes.fl_table}>
          <thead>
           
             <tr> 
                <p>Value real-time: {query}</p>
                <p>Debounced value: {debouncedValue}</p></tr>
              
              <tr> 
                <p>Value real-time: {queryL}</p>
                <p>Debounced value: {debouncedValueL}</p>
                </tr>
                <tr> 
                <p>Value real-time: {queryT}</p>
                <p>Debounced value: {debouncedValueT}</p>
                </tr>
              
              <tr>
              {headers.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
            </tr>
           
            <tr>
              <th><GlobalFilter  values={query}  filterH={ handleChange} placeholder='search FirstName'/></th>
              <th><GlobalFilter  values={queryL}  filterH={  handleChangeO} placeholder='search LastName'/></th>
              <th><GlobalFilter  values={queryT}  filterH={ handleChangeT}  placeholder='search Tel'/></th>
              <th></th>
             
              <th></th>
             
            </tr>
          </thead>
         { !filter ? <tbody>
          {cars.length === 0 ? <tr><td colspan="5" className={classes.Tempty}><p>NO cars !</p></td></tr>:cars.map((x)=>(<tr key={x._id}>
              <td >{x.fname} </td>
              <td >{x.lname}</td>
              <td>{x.telephone}</td>
              <td >{x.email}</td>
             
              <td className={classes.icons} >
              <span  className={classes.doc} onClick={(event) => doc(event, x)}><i class="far fa-folder"></i></span>
              <span  className={classes.pencil } onClick={(event)=>trig(event,x)}><i className="bi bi-pencil-square pencil"></i></span>
              <span  className={classes.trash} onClick={(event) => del(event, x)}><i className="bi bi-trash trash"></i></span>
                    
                </td>
           </tr>))} 
          </tbody> :<tbody>
          {result.length === 0 ? <tr><td colspan="5" className={classes.Tempty}><p>NO cars !</p></td></tr>:result.map((x)=>(<tr key={x._id}>
              <td >{x.fname} {x.lname}</td>
              <td >{x.email}</td>
              <td>{x.telephone}</td>
              <td  >{x.address}</td>
              <td className={classes.icons}>
              <span  className={classes.doc} onClick={(event) => doc(event, x)}><i class="far fa-folder"></i></span>
              <span  className={classes.pencil } onClick={(event)=>trig(event,x)}><i className="bi bi-pencil-square pencil"></i></span>
              <span  className={classes.trash} onClick={(event) => del(event, x)}><i className="bi bi-trash trash"></i></span>
                    
                </td>
           </tr>))} 
          </tbody>}
        </table>
                <ReactPaginate
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
                />
                </div>
                </div> 
        </>
    )
}

export default TabV
