import {useState,useEffect,useContext} from "react";
import AuthContext from "../Store/Auth";
import ReactPaginate from "react-paginate";
import classes from "./TabR.module.css";
import { useDebounce } from 'usehooks-ts'
import axios from "axios";
import GlobalFilter from "./GlobalFilter";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../Pages/Bridge/Dimensions";


const TabR = ({ headers,rev,trig,view,del,handleChange2,simm,ssCh,handleChange3}) => {
    const {t}=useTranslation();
    const AuthCtx=useContext( AuthContext)
    const [show,setShow]=useState(false)
    // const [sDate,setSDate] = useState('')
    // const [sIm,setSIm] = useState('')
    // const [sCh,setSch]=useState('')
    const [searchR,setSearchR]= useState([])
//     const [loading,setLoading] = useState(false)
//     const [message,setMessage] = useState('')
//     const debouncedValuesD = useDebounce(sDate, 2000)
//   const debouncedValuesI = useDebounce(sIm, 2000)
//   const debouncedValueTsC = useDebounce(sCh, 2000)
const {width } = useWindowDimensions();
let colSpanSIZE = 4
if(width < 548){
  colSpanSIZE= 6
}
      const handlePageClick = () => {};
    return (
        <>
           <div className={classes.reseting}>
               <div className={classes.table_wrapperRR}>
               <table className={classes.fl_tableRR}>
                <thead>
                    <tr>
                    {headers.map((headerItem, index) => (
                        <th key={index}>{headerItem.toUpperCase()}</th>
                    ))}
                    </tr>
            <tr className={classes.searchRow}>
              <th colSpan={colSpanSIZE}><GlobalFilter values={simm} filterH={handleChange2}  placeholder={t('SearchPH4')}/></th>
              <th colSpan='4' className={classes.firstColumnRR} ><GlobalFilter values={ssCh} filterH={handleChange3}  placeholder={t('SearchPH11')}/></th>

            </tr>
                </thead>
                {!show ?<tbody>
                       {rev.length === 0 ? <tr><td colspan="8" className={classes.Tempty}><p>NO Revenue !</p></td></tr>:rev.map ((c)=>(<tr key={c._id} className={classes.linkC}>
                           
                            <td>{ 
                             `${new Date(c.date).getFullYear()}/${new Date(c.date).getMonth()+1}/${new Date(c.date).getDate()}`
                            }</td>
                            <td onClick={(event) =>view(event, c)}>{c.car.immatriculation}</td>
                            <td onClick={(event) =>view(event, c)}>{c.driver.fname} {c.driver.lname}</td>
                            <td onClick={(event) =>view(event, c)}>{c.proprietor.firstName} {c.proprietor.lastName}</td>
                            <td onClick={(event) =>view(event, c)}>{c.fuel}</td>
                            <td onClick={(event) =>view(event, c)}>{c.failureCost}</td>
                            <td onClick={(event) =>view(event, c)}>{c.revenue}</td>
                            <td className={classes.iconsRR}>
                            <span className={classes.pencilRR} onClick={(event) => trig(event, c)} title={t('EditAction')}
                            >
                                <i className="bi bi-pencil-square pencil"></i>
                            </span>
                            <span className={classes.trashRR} onClick={(event) => del(event, c)} title={t('deleteAction')}>
                                <i className="bi bi-trash trash"></i>
                            </span>
                            </td>
                        </tr>))}
                    </tbody> :<tbody>
                       {searchR.length === 0 ? <tr><td colspan="8" className={classes.Tempty}><p>NO Revenue !</p></td></tr>:searchR.map ((c)=>(<tr key={c._id} className={classes.linkC}>
                           
                            <td>{ 
                            `${new Date(c.date).getFullYear()}/${new Date(c.date).getMonth()+1}/${new Date(c.date).getDate()}`
                            }</td>
                            <td onClick={(event) =>view(event, c)}>{c.car.immatriculation}</td>
                            <td onClick={(event) =>view(event, c)}>{c.driver.fname} {c.driver.lname}</td>
                            <td onClick={(event) =>view(event, c)}>{c.proprietor.firstName} {c.proprietor.lastName}</td>
                            <td onClick={(event) =>view(event, c)}>{c.fuel}</td>
                            <td onClick={(event) =>view(event, c)}>{c.failureCost}</td>
                            <td onClick={(event) =>view(event, c)}>{c.revenue}</td>
                            <td className={classes.iconsV}>
                            <span className={classes.pencilV} onClick={(event) => trig(event, c)}
                            >
                                <i className="bi bi-pencil-square pencil"></i>
                            </span>
                            <span className={classes.trash} onClick={(event) => del(event, c)}>
                                <i className="bi bi-trash trash"></i>
                            </span>
                            
                            </td>
                        </tr>))}
                    </tbody>}
                </table>

               </div>
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
        </>
    )
}

export default TabR
