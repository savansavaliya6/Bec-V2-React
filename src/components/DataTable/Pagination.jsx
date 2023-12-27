import React, { memo } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageButtonsToShow = 5; // Number of page buttons to show (excluding next/previous buttons)

  const getPageButtons = () => {
    const pageButtons = [];

    let startPage = Math.max(
      1,
      currentPage - Math.floor(pageButtonsToShow / 2)
    );
    let endPage = Math.min(totalPages, startPage + pageButtonsToShow - 1);

    if (endPage - startPage + 1 < pageButtonsToShow) {
      startPage = Math.max(1, endPage - pageButtonsToShow + 1);
    }

    if (totalPages > pageButtonsToShow) {
      if (startPage > 1) {
        pageButtons.push(
          <li key={1} className="page-item">
            <a href="#!" className="page-link" onClick={() => onPageChange(1)}>
              1
            </a>
          </li>
        );
        if (startPage > 2) {
          pageButtons.push(
            <li key="ellipsis-before" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <a href="#!" className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      );
    }

    if (totalPages > pageButtonsToShow) {
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageButtons.push(
            <li key="ellipsis-after" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
        pageButtons.push(
          <li key={totalPages} className="page-item">
            <a
              href="#!"
              className="page-link"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </a>
          </li>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="d-flex justify-content-end me-5">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              href="#!"
              className="page-link"
              onClick={() => onPageChange(1)} // Go to first page
            >
              First
            </a>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              href="#!"
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {getPageButtons()}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              href="#!"
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </a>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              href="#!"
              className="page-link"
              onClick={() => onPageChange(totalPages)} // Go to last page
            >
              Last
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(Pagination);
