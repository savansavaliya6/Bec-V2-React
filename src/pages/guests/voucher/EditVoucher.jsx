import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { updateVoucher } from "./store/voucherSlice"
import { useDispatch, useSelector } from "react-redux"

import {
  DatePickerField,
  DropdownField,
  TextInputField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import moment from "moment"

const EditVoucher = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  const [retailersList, setRetailersList] = useState([])
  const { retailerList } = useSelector((state) => state.vouchers)

  const initialValues = {
    coupon_id: selectedItem.coupon_id,
    coupon_expiry_date: selectedItem.coupon_expiry_date,
    retailer: selectedItem.retailer?.id,
  }

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
    obj["id"] = Number(selectedItem.id) || ""
    obj["retailer_id"] = Number(values.retailer)
    delete obj.retailer
    const response = await dispatch(updateVoucher(obj)).unwrap()
    if (response.data.status) handleEditHideModal()
  }

  return (
    <Modal size="lg" show={showEditModal} onHide={handleEditHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit Voucher</Modal.Title>
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
                    defaultValue={initialValues.retailer}
                    name="retailer"
                  />
                </div>

                <div className="col-md-6">
                  <DatePickerField
                    label="Voucher Expiry Date"
                    name="coupon_expiry_date"
                    options={{
                      minDate: moment().format("YYYY-MM-DD"),
                    }}
                  />
                </div>

                {/* <div className="col-md-6">
                <RadioInput
                  label="Voucher Used?"
                  name="coupon_used"
                  option={[
                    {
                      name: "Yes",
                      value: 1,
                    },
                    {
                      name: "No",
                      value: 0,
                    },
                  ]}
                />
              </div>
              <div className="col-md-6">
                <RadioInput
                  label="Voucher Validated?"
                  name="coupon_validate"
                  option={[
                    {
                      name: "Yes",
                      value: 1,
                    },
                    {
                      name: "No",
                      value: 0,
                    },
                  ]}
                />
              </div> */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleEditHideModal}>
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

export default EditVoucher
