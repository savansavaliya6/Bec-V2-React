import React, { memo, useState } from "react"
import TableComponent from "./TableComponent"

const DataTable = ({ data, columns, loading }) => {
  const [sortKey, setSortKey] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedData = data && data.slice(startIndex, endIndex);
  // console.log(paginatedData);
  // const filteredData =paginatedData &&
  //   paginatedData.filter((item) =>
  //     columns.some((column) => {
  //       const columnKey = column.key;
  //       const columnValue = item[columnKey];

  //       if (Array.isArray(columnValue)) {
  //         return columnValue.some((value) =>
  //           value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //         );
  //       }

  //       if (typeof columnValue === "object") {
  //         // Convert object properties to a single string for searching
  //         const objectString = Object.values(columnValue)
  //           .map((value) => value.toString())
  //           .join(" ");

  //         return objectString.toLowerCase().includes(searchTerm.toLowerCase());
  //       }

  //       if (typeof columnValue === "boolean") {
  //         return true; // Include boolean values in filtering
  //       }

  //       if (
  //         typeof columnValue === "string" ||
  //         typeof columnValue === "number"
  //       ) {
  //         return columnValue
  //           .toString()
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase());
  //       }

  //       // Exclude custom cells, e.g., action buttons or image galleries
  //       return false;
  //     })
  //   );

  return (
    <div>
      <TableComponent
        data={data && data}
        columns={columns}
        sortKey={sortKey}
        sortDirection={sortDirection}
        handleSort={handleSort}
        loading={loading}
      />
    </div>
  )
}

export default memo(DataTable)
