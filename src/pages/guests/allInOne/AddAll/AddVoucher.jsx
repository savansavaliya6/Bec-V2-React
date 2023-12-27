import React, { useEffect, useState } from "react"
import { assignVoucher, createVoucher } from "../../voucher/store/voucherSlice"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  DatePickerField,
  DropdownField,
  RadioInput,
  TextInputField,
} from "../../../../components/Fields"
import VoucherTable from "../VoucherTable"

import { Formik, Form } from "formik"
import * as yup from "yup"
import moment from "moment"

const AddVoucher = ({
  showModal,
  handleAddHideModal,
  selectedItem,
  setSelectedItem,
  onNext,
  onPrevious,
}) => {
  const [AddVoucher, setAddVoucher] = useState(false)

  const dispatch = useDispatch()

  const [retailersList, setRetailersList] = useState([])
  const { retailerList } = useSelector((state) => state.vouchers)
  const {
    guest: { form },
  } = useSelector((state) => state.guests)

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
    try {
      const response = await dispatch(createVoucher(obj)).unwrap()

      if (response.data.status) {
        if (obj.assign_voucher == 1) {
          let payload = {}
          payload.voucher_id = values.coupon_id
          payload.customerhash = form?.customerhash
          await dispatch(assignVoucher(payload))
        }
        onNext()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {AddVoucher && (
        <Formik
          enableReinitialize={true}
          initialValues={selectedItem}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <Modal.Header>
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
                      name="coupon_expiry_date"
                      options={{
                        minDate: moment().format("YYYY-MM-DD"),
                      }}
                    />
                  </div>
                  {form?.customerhash ? (
                    <div className="col-md-4 mb-5">
                      <RadioInput
                        label="Assign this Voucher to this Guest."
                        name="assign_voucher"
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
                  ) : null}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" onClick={onPrevious}>
                  Previous
                </Button>
                <Button variant="dark" type="submit" disabled={isSubmitting}>
                  Save & Next
                </Button>
                <Button variant="dark" onClick={onNext}>
                  Next
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      )}
      <br />

      <VoucherTable addVoucher={AddVoucher} setAddVoucher={setAddVoucher} />
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onPrevious}>
          Previous
        </Button>

        <Button variant="dark" onClick={onNext}>
          Next
        </Button>
      </Modal.Footer>
    </>
  )
}

export default AddVoucher
