import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { createInterest } from "./store/guestInterestsSlice";
import { useDispatch } from "react-redux";
import {
  DropdownField,
  RadioInput,
  TextInputField,
  DatePickerField,
} from "../../../components/Fields";
import { Formik, Form } from "formik";
import * as yup from "yup";

function ViewCategory({ showViewModal, handleViewHideModal, selectedItem }) {
  return (
    <Modal size="md" show={showViewModal} onHide={handleViewHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Interests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-bordered" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Interests List </th>
            </tr>
          </thead>
          <tbody>
            {selectedItem?.subcategory &&
              JSON.parse(selectedItem.subcategory).map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowData}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleViewHideModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewCategory;
