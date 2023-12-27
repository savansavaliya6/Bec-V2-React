import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import {
  createDropdownList,
  getVehicleDetailsFromVIN,
  updateFleet,
} from "./store/becFleetSlice"
import { useDispatch, useSelector } from "react-redux"
import { PiNotePencilBold } from "react-icons/pi"
import { GrAdd } from "react-icons/gr"

import {
  CreatableDropdownField,
  DropdownField,
  DatePickerField,
  TextInputField,
  TextareaField,
  RadioInput,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"

const EditVehicle = ({ showEditModal, handleEditHideModal, selectedItem }) => {
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

  const initialValues = {
    vin: selectedItem.vin,
    name_plate: selectedItem.nameplate,
    brand: selectedItem.brand,
    modeldesc: selectedItem.modeldesc,
    exteriorcolor: selectedItem.exteriorcolor,
    interiorcolor: selectedItem.interiorcolor,
    enginetype: selectedItem.enginetype,
    fueltype: selectedItem.fueltype,
    kms: selectedItem.kms,
    added_option: selectedItem.added_option,
    date_of_registration: selectedItem.date_of_registration,
    nameplate: selectedItem.nameplate,
    status: selectedItem.status,
    registration_no: selectedItem.registration_no,
  }

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
    status: yup
      .number()
      .oneOf([1, 0], "Select an option")
      .required("Select an option"),
  })

  const noteSchema = yup.object().shape({
    note: yup.string().required("Note is required"),
  })

  const handleChange = (e) => {
    if (e.target.value.length > 16)
      dispatch(getVehicleDetailsFromVIN(e.target.value))
  }

  const handleSubmit = async (values) => {
    let obj = { ...values }
    obj["id"] = Number(selectedItem.id) || ""
    if (vehicleDetails?.vista_api_data?.added_option) {
      obj.added_option = JSON.stringify(
        vehicleDetails?.vista_api_data?.added_option
      )
    }

    if (vehicleDetails?.build_url) {
      obj.build_url = vehicleDetails?.build_url
    }
    const response = await dispatch(updateFleet(obj)).unwrap()
    if (response.data.status) handleEditHideModal()
  }

  return (
    <>
      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => {
          handleEditHideModal()
        }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Edit Vehicle</Modal.Title>
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
                      defaultValue={
                        vehicleDetails?.brand
                          ? vehicleDetails?.brand
                          : initialValues.brand
                      }
                      options={brandsOptions}
                      name="brand"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Name Plate"
                      defaultValue={
                        vehicleDetails?.nameplate
                          ? vehicleDetails?.nameplate
                          : initialValues.nameplate
                      }
                      options={nameplateOptions}
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
                      defaultValue={
                        vehicleDetails?.date_of_registration
                          ? vehicleDetails?.date_of_registration
                          : initialValues.date_of_registration
                      }
                      name="date_of_registration"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Model Description"
                      defaultValue={
                        vehicleDetails?.mod_desc
                          ? vehicleDetails?.mod_desc
                          : initialValues.modeldesc
                      }
                      options={modelDescOptions}
                      name="modeldesc"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Exterior Color"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.exteriorcolor
                          ? vehicleDetails?.vista_api_data?.exteriorcolor
                          : initialValues.exteriorcolor
                      }
                      options={extColOptions}
                      name="exteriorcolor"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Interior Color"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.interiorcolor
                          ? vehicleDetails?.vista_api_data?.interiorcolor
                          : initialValues.interiorcolor
                      }
                      options={intColOptions}
                      name="interiorcolor"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Engine"
                      defaultValue={
                        vehicleDetails?.enginetype
                          ? vehicleDetails?.enginetype
                          : initialValues.enginetype
                      }
                      options={engineTypeOptions}
                      name="enginetype"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Fuel Type"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.fueltype
                          ? vehicleDetails?.vista_api_data?.fueltype
                          : initialValues.fueltype
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
                  <div className="col-md">
                    <RadioInput
                      label="Status"
                      name="status"
                      option={[
                        {
                          name: "Active",
                          value: 1,
                        },
                        {
                          name: "Inactive",
                          value: 0,
                        },
                      ]}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    handleEditHideModal()
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

export default EditVehicle
