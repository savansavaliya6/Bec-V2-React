import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { DropdownField, TextInputField } from "../../../components/Fields"
import { assignVoucher } from "./store/voucherSlice"
import { getCustomerHashList } from "../vehicle/store/vehicleSlice"

const Assign = ({ showAssignModal, handleAssignHideModal, selectedItem }) => {
  const [customerHashOptions, setCustomerHashOptions] = useState([])

  const dispatch = useDispatch()
  const { customerHashList } = useSelector((state) => state.vehicles)

  const {
    guest: { form },
  } = useSelector((state) => state.guests)

  const validationSchema = yup.object().shape({
    customerhash: yup.string().required("Customer Name is required"),
  })

  useEffect(() => {
    const customerhashOptions = customerHashList.length
      ? customerHashList.map((id) => ({
          value: id.customerhash,
          label: `${id.f_name} ${id.l_name}`,
        }))
      : []
    setCustomerHashOptions(customerhashOptions)
  }, [customerHashList])

  useEffect(() => {
    dispatch(getCustomerHashList())
  }, [])

  const handleSubmit = async (values) => {
    let obj = { ...values }
    obj.voucher_id = selectedItem.coupon_id
    delete obj.customername
    const response = await dispatch(assignVoucher(obj)).unwrap()
    if (response.data.status) handleAssignHideModal()
  }
  return (
    <Modal size="lg" show={showAssignModal} onHide={handleAssignHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={{ customerhash: selectedItem.customerhash }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Assign Voucher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <DropdownField
                    options={customerHashOptions}
                    isDisabled={form?.customerhash ? true : false}
                    defaultValue={form?.customerhash ? form.customerhash : ""}
                    label="Customer Name"
                    name="customerhash"
                  />
                </div>
                <div className="col-md-6">
                  <TextInputField
                    label="Customer Token"
                    name="customername"
                    disabled
                    value={
                      form?.customerhash
                        ? form.customerhash
                        : values.customerhash
                    }
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleAssignHideModal}>
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

export default Assign
