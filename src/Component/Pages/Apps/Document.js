import React, { Fragment, useMemo } from "react";
import styles from "./Document.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Card } from "react-bootstrap";
import STable from "../../Tables/SortingTable";
import {ColumnDoc}  from "../../Tables/coulms";
import documents from "../../Tables/MOCK_DATA (4).json";
import GlobalFilter from "../../Tables/GlobalFilter";
import { useTable, useGlobalFilter, useSortBy ,usePagination,useRowSelect} from "react-table";
import SelectCheckbox from "../../Tables/Checkbox";

const Document = () => {

  const columns = useMemo(() => ColumnDoc, []);
  const data = useMemo(() => documents, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <SelectCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <SelectCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  );

  const { globalFilter } = state;

  const  firstPageRows= page.slice(0,10)

    return (
        <Fragment>
      <div className={styles.container}>
        <Container fluid>
          <Row>
            <Col>
              <p className={styles.numberOfDoc}>20 pannes</p>
            </Col>
          </Row>
          <Row>
            <Col className="pb-3">
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            </Col>
          </Row>
          <Row>
            <Col>
            <Card className={styles.Card}>
            <STable
                  getTable={getTableProps}
                  GTBP={getTableBodyProps}
                  HG={headerGroups}
                  page ={firstPageRows}
                  Prows={prepareRow}
                  previousPage={previousPage}
                  next={nextPage}
                  state={state}
                  PO={pageOptions}
                  GP={gotoPage}
                  PC={pageCount}
                  SFR={selectedFlatRows}
                />
            </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
    )
}

export default Document
