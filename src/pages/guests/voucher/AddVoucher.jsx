import React, { useEffect, useState } from "react"
import { createVoucher } from "./store/voucherSlice"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  DatePickerField,
  DropdownField,
  TextInputField,
} from "../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"
import moment from "moment"

const AddVoucher = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  const [retailersList, setRetailersList] = useState([])
  const { retailerList } = useSelector((state) => state.vouchers)

  const validationSchema = yup.object().shape({
    coupon_id: yup.string().required("Voucher ID is required"),
    coupon_expiry_date: yup
      .string()
      .required("Voucher expiry date is required"),
    retailer: yup.string().required("Retailer Name is required"),
  })

  useEffect(() => {
    const retailerOptions = retailerList.length
      ? retailerList.map((id) => ({ value: id.id, label: id.dealer_name }))
      : []
    setRetailersList(retailerOptions)
  }, [retailerList])

  const handleSubmit = async (values) => {
    let obj = { ...values }
    obj["retailer_id"] = Number(values.retailer)

    delete obj.retailer
    const response = await dispatch(createVoucher(obj)).unwrap()
    if (response.data.status) handleAddHideModal()
  }

  return (
    <Modal size="lg" show={showModal} onHide={handleAddHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={selectedItem}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add Voucher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <TextInputField label="Voucher Id" name="coupon_id" />
                </div>
                <div className="col-md-6">
                  <DropdownField
                    label="Retailer Name"
                    options={retailersList}
                    name="retailer"
                  />
                </div>

                <div className="col-md-6">
                  <DatePickerField
                    label="Voucher Expiry Date"
                    type="date"
                    options={{
                      minDate: moment().format("YYYY-MM-DD"),
                    }}
                    name="coupon_expiry_date"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleAddHideModal}>
                Cancel
              </Button>
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddVoucher
