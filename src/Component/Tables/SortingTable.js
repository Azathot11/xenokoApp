import React from "react";
import "./Table.css";
const STable = (props) => {
  const { pageIndex } = props.state;

  return (
    <>
      <table {...props.getTable} className="tb">
        <thead>
          {props.HG.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="align">
              {headerGroup.headers.map((columns) => (
                <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>
                  {columns.render("Header")}
                  <span>
                    {columns.isSorted ? (columns.isSortedDesc ?
                      <i class="bi bi-arrow-down"></i>: <i class="bi bi-arrow-up"></i>
                    ) :''
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...props.GTBP}>
          {props.page.map((row,i) => {
            props.Prows(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="tdR">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
       
      </table>
      <div className="pageNavigation">
        
          <div className="forward">
            <span onClick={() => props.GP(0)}> {"<<"} </span>
            <span onClick={() => props.previousPage()}>Previous</span>
          </div>

          <span>
            {""}
            <strong>
              {pageIndex + 1} of {props.PO.length}
            </strong>
            {""}
          </span>
          <span >
               |Go to page : {''}
              <input type = 'number' defaultValue={pageIndex + 1}
              onChange={(e)=>{
                  const pageNumber = e.target.value ? Number(e.target.value) - 1:0
                  props.GP(pageNumber)
              }}
              style={{width : '30px'}}
              />
          </span>
          <div className="backward">
            <span onClick={() => props.next()}>Next</span>
            <span onClick={() => props.GP(props.PC - 1)}> {">>"} </span>
          </div>
      </div>
    </>
  );
};

export default STable;
