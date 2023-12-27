import React, { useEffect, useState } from "react"
import {
  createDropdownList,
  createFeet,
  getVehicleDetailsFromVIN,
} from "./store/becFleetSlice"
import { Button, Modal } from "react-bootstrap"
import { PiNotePencilBold } from "react-icons/pi"
import { GrAdd } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux"
// import { GrAdd } from "react-icons/gr";
import {
  CreatableDropdownField,
  DropdownField,
  TextInputField,
  TextareaField,
  DatePickerField,
} from "../../../components/Fields"
import AddedOption from "../../guests/allInOne/AddedOption"

import { Formik, Form } from "formik"
import * as yup from "yup"

const AddVehicle = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  const { dropdownList, vehicleDetails } = useSelector((state) => state.fleets)

  const [nameplateOptions, setNameplateOptions] = useState([])
  const [brandsOptions, setBrandsOptions] = useState([])
  const [modelDescOptions, setModelDescOptions] = useState([])
  const [extColOptions, setExtColOptions] = useState([])
  const [intColOptions, setIntColOptions] = useState([])
  const [engineTypeOptions, setEngineTypeOptions] = useState([])
  const [fuelTypeOptions, setFuelTypeOptions] = useState([])

  useEffect(() => {
    if (dropdownList?.brand) {
      const nameplateOptions = dropdownList.nameplate.length
        ? dropdownList.nameplate.map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setNameplateOptions(nameplateOptions)
      const brandsOptions = dropdownList.brand.length
        ? dropdownList.brand.map((name) => ({
            value: name,
            label: name,
          }))
        : []

      setBrandsOptions(brandsOptions)
      const modelDescOptions = dropdownList.modeldesc.length
        ? dropdownList.modeldesc.map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setModelDescOptions(modelDescOptions)
      const extColOptions = dropdownList.exteriorcolor.length
        ? dropdownList.exteriorcolor.map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setExtColOptions(extColOptions)
      const intColOptions = dropdownList.interiorcolor.length
        ? dropdownList.interiorcolor.map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setIntColOptions(intColOptions)
      const engineTypeOptions = dropdownList.enginetype.length
        ? dropdownList.enginetype.map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setEngineTypeOptions(engineTypeOptions)
      const fuelTypeOptions = dropdownList.fueltype.length
        ? dropdownList.fueltype.map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setFuelTypeOptions(fuelTypeOptions)
    }
  }, [dropdownList])

  const validationSchema = yup.object().shape({
    vin: yup.mixed().required("VIN number is required"),
    nameplate: yup.string().required("Name Plate is required"),
    brand: yup.string().required("Brand is required"),
    date_of_registration: yup
      .string()
      .required("Date of registration is required"),
    kms: yup.number().positive().required("KMS is required"),
    modeldesc: yup.string().required("Model description is required"),
    exteriorcolor: yup.string().required("Exterior Color is required"),
    interiorcolor: yup.string().required("Interior Color is required"),
    enginetype: yup.string().required("Engine Tupe is required"),
    fueltype: yup.string().required("Fuel Type is required"),
    registration_no: yup.mixed().required("Registration Number is required"),
  })

  const handleChange = (e) => {
    if (e.target.value.length > 16)
      dispatch(getVehicleDetailsFromVIN(e.target.value))
  }

  const handleSubmit = async (values) => {
    let obj = { ...values }

    if (vehicleDetails?.vista_api_data?.added_option) {
      obj.added_option = JSON.stringify(
        vehicleDetails?.vista_api_data?.added_option
      )
    }

    if (vehicleDetails?.build_url) {
      obj.build_url = vehicleDetails?.build_url
    }

    const response = await dispatch(createFeet(obj)).unwrap()
    if (response.data.status) handleAddHideModal()
  }

  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => {
          handleAddHideModal()
        }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={selectedItem}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, values, setFieldValue, isSubmitting }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Add BEC Vehicle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row g-3">
                  <div className="col-md-6">
                    <TextInputField
                      label="VIN Number"
                      type="text"
                      name="vin"
                      onChange={(e) => {
                        handleChange(e)
                        setFieldValue("vin", e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Brand"
                      options={brandsOptions}
                      defaultValue={vehicleDetails?.brand || ""}
                      name="brand"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Name Plate"
                      options={nameplateOptions}
                      defaultValue={vehicleDetails?.nameplate || ""}
                      name="nameplate"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInputField
                      label="Registration Number"
                      type="text"
                      name="registration_no"
                    />
                  </div>
                  <div className="col-md-6">
                    <DatePickerField
                      label="Date Of Registration"
                      type="date"
                      name="date_of_registration"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Model Description"
                      options={modelDescOptions}
                      defaultValue={vehicleDetails?.mod_desc || ""}
                      name="modeldesc"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Exterior Color"
                      defaultValue={vehicleDetails?.vista_api_data?.color || ""}
                      options={extColOptions}
                      name="exteriorcolor"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Interior Color"
                      options={intColOptions}
                      defaultValue={
                        vehicleDetails?.vista_api_data?.color_interior || ""
                      }
                      name="interiorcolor"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Engine"
                      defaultValue={vehicleDetails?.engine_type || ""}
                      options={engineTypeOptions}
                      name="enginetype"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Fuel Type"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.fuel_type || ""
                      }
                      options={fuelTypeOptions}
                      name="fueltype"
                    />
                  </div>

                  <div className="col-md-6">
                    <TextInputField
                      label="KMs"
                      name="kms"
                      type="number"
                      placeholder="Enter KMS"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    handleAddHideModal()
                  }}
                >
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
    </>
  )
}

export default AddVehicle
