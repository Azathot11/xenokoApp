import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Store/Auth";
import ReactPaginate from "react-paginate";
import classes from "./Tab.module.css";

const TabV = ({ trig,  result, headers ,del,doc, addRe}) => {

    
      const handlePageClick = () => {};
    return (
        <>
           <div className={classes.reseting}>
               <div  className={classes.table_wrapper}>
                <table className={classes.fl_table}>
                <thead>
                    {/* <tr>
                    {headers.map((headerItem, index) => (
                        <th key={index}>{headerItem.toUpperCase()}</th>
                    ))}
                    </tr> */}
            <tr>
                <th>MODEL</th>
                <th >IMMATRCULATION</th>
                <th >CHASSIS</th>
                <th className={classes.disappear}>STATUS</th>
                <th>ACTIONS</th>
            </tr>
                
                </thead>
                <tbody>
                    {result.length === 0 ?<tr><td colspan="5" className={classes.Tempty}><p>NO result !</p></td></tr>: result.map((x) => (
                    <tr key={x._id} >
                            <td> <Link to={`/vinfo/${x._id}`}>{x.model}</Link></td>
                            <td><Link to={`/vinfo/${x._id}`}>{x.immatriculation}</Link></td>
                            <td><Link to={`/vinfo/${x._id}`}>{x.chassis}</Link></td>
                            <td className={classes.disappear}><Link to={`/vinfo/${x._id}`}>{x.status}</Link></td>
                       
                        <td className={classes.icons}>
                            {/* <Link to={`/vinfo/${x._id}`}>
                            <span className={classes.eye}>
                                <i class="far fa-eye"></i>
                            </span>
                            </Link> */}
                           
                             <span  className={classes.doc} onClick={(event) => doc(event, x)}><i class="far fa-folder"></i></span>
                             <span  className={classes.doc} onClick={(event) => addRe(event, x)}><i class="bi bi-cash-coin"></i></span>
                            <span className={classes.pencil} onClick={(event) => trig(event, x)}
                            >
                                <i className="bi bi-pencil-square pencil"></i>
                            </span>
                            
                            <span className={classes.trash}onClick={(event) => del(event, x)}>
                                <i className="bi bi-trash trash"></i>
                            </span>
                           
                        </td>
                    </tr>
                    ))}
                </tbody>
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
