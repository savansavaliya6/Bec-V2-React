// import React, { memo } from "react"
// import { useEffect } from "react"
// import { useCallback } from "react"
// import { useState } from "react"
// import { FormControl, Dropdown } from "react-bootstrap"
// import Select from "react-select"

// const options = [
//   { value: 25, label: "25" },
//   { value: 50, label: "50" },
//   { value: 100, label: "100" },
// ]

// const SearchFilters = ({
//   searchTerm,
//   handleSearchChange,
//   itemsPerPage,
//   handleItemsPerPageChange,
// }) => {
//   const [debounceSearch, setDebounceSearch] = useState(searchTerm)

//   useEffect(() => {
//     const timer = setTimeout(
//       () => handleSearchChange({ target: { value: debounceSearch } }),
//       500
//     )
//     return () => clearTimeout(timer)
//   }, [debounceSearch, handleSearchChange])

//   return (
//     <div className="mb-3 d-flex  justify-content-between">
//       <FormControl
//         type="text"
//         placeholder="Search..."
//         value={debounceSearch}
//         className="search-filter"
//         onChange={(e) => setDebounceSearch(e.target.value)}
//       />
//       <div className="d-flex align-items-center">
//         <label className="me-2">Show Records:</label>
//         <Select
//           classNamePrefix="react-select"
//           value={{ value: itemsPerPage, label: itemsPerPage.toString() }}
//           options={options}
//           onChange={(selectedOption) =>
//             handleItemsPerPageChange(selectedOption.value)
//           }
//         />
//       </div>
//     </div>
//   )
// }

// export default memo(SearchFilters)
import React, { memo } from "react"
import { FormControl, Dropdown } from "react-bootstrap"
import Select from "react-select"

const SearchFilters = ({
  searchTerm,
  handleSearchChange,
  itemsPerPage,
  handleItemsPerPageChange,
}) => {
  const options = [
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ]
  return (
    <div className="mb-3 d-flex  justify-content-between">
      <FormControl
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className="search-filter"
        onChange={handleSearchChange}
      />
      <div className="d-flex align-items-center">
        <label className="me-2">Show Records:</label>
        <Select
          classNamePrefix="react-select"
          value={{ value: itemsPerPage, label: itemsPerPage.toString() }}
          options={options}
          onChange={(selectedOption) =>
            handleItemsPerPageChange(selectedOption.value)
          }
        />
      </div>
    </div>
  )
}

export default memo(SearchFilters)
