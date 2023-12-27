import React, { memo, useState, useEffect } from "react"
import { Table, Spinner } from "react-bootstrap"
import Loader from "../Loader/loader"
import { Input, Label } from "reactstrap"
import { Link } from "react-router-dom"

const TableComponent = ({
  data,
  columns,
  sortKey,
  sortDirection,
  handleSort,
  loading,
  children,
}) => {
  const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false)

  useEffect(() => {
    const delayNoRecordsMessage = setTimeout(() => {
      setShowNoRecordsMessage(true)
    }, 500)

    return () => {
      clearTimeout(delayNoRecordsMessage)
    }
  }, [data])

  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <>
      {/* <div style={{ maxHeight: "50vh", overflowY: "auto" }}></div> */}
      <div style={{ height: "60vh", maxHeight: "60vh", overflowY: "auto" }}>
        <Table hover>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  align={column.headerAlign}
                  onClick={() => handleSort(column.key)}
                  style={column.headerStyle && column.headerStyle}
                  className={`table-header-color ${
                    column.headerAlign ? "" : "text-center"
                  } text-nowrap ${column.key === "actions" ? "sticky" : ""}`}
                >
                  {column.label.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      align={column.cellAlign}
                      style={column.cellStyle && column.cellStyle}
                      className={`table-cell-color ${
                        column.cellAlign ? "" : "text-center"
                      } text-nowrap ${
                        column.key === "actions" ? "sticky" : ""
                      }`}
                    >
                      {column.cell ? column.cell(item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {!loading && showNoRecordsMessage && !sortedData.length && (
          <div className="d-flex justify-content-center mb-3">
            There are no records to display
          </div>
        )}
      </div>
    </>
  )
}

export default memo(TableComponent)
