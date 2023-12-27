import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import {
  createDropdownList,
  getVehicleDetailsFromVIN,
  updateVehicle,
} from "./store/vehicleSlice"
import { useDispatch, useSelector } from "react-redux"

import {
  CreatableDropdownField,
  DropdownField,
  TextInputField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import AddedOption from "../allInOne/AddedOption"

const EditVehicle = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  const { dropdownList, customerHashList, vehicleDetails } = useSelector(
    (state) => state.vehicles
  )
  const [nameplateOptions, setNameplateOptions] = useState([])
  const [brandsOptions, setBrandsOptions] = useState([])
  const [modelDescOptions, setModelDescOptions] = useState([])
  const [extColOptions, setExtColOptions] = useState([])
  const [intColOptions, setIntColOptions] = useState([])
  const [engineTypeOptions, setEngineTypeOptions] = useState([])
  const [fuelTypeOptions, setFuelTypeOptions] = useState([])
  const [customerHashOptions, setCustomerHashOptions] = useState([])

  const [showAddedOptions, setShowAddedOptions] = useState(false)

  useEffect(() => {
    if (dropdownList?.id) {
      const nameplateOptions = JSON.parse(dropdownList.nameplate).length
        ? JSON.parse(dropdownList.nameplate).map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setNameplateOptions(nameplateOptions)
      const brandsOptions = JSON.parse(dropdownList.brand).length
        ? JSON.parse(dropdownList.brand).map((name) => ({
            value: name,
            label: name,
          }))
        : []

      setBrandsOptions(brandsOptions)
      const modelDescOptions = JSON.parse(dropdownList.modeldesc).length
        ? JSON.parse(dropdownList.modeldesc).map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setModelDescOptions(modelDescOptions)
      const extColOptions = JSON.parse(dropdownList.exteriorcolor).length
        ? JSON.parse(dropdownList.exteriorcolor).map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setExtColOptions(extColOptions)
      const intColOptions = JSON.parse(dropdownList.interiorcolor).length
        ? JSON.parse(dropdownList.interiorcolor).map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setIntColOptions(intColOptions)
      const engineTypeOptions = JSON.parse(dropdownList.enginetype).length
        ? JSON.parse(dropdownList.enginetype).map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setEngineTypeOptions(engineTypeOptions)

      const fuelTypeOptions = JSON.parse(dropdownList.fueltype).length
        ? JSON.parse(dropdownList.fueltype).map((name) => ({
            value: name,
            label: name,
          }))
        : []
      setFuelTypeOptions(fuelTypeOptions)
    }
    const customerhashOptions = customerHashList.length
      ? customerHashList.map((id) => ({
          value: id.customerhash,
          label: `${id.f_name} ${id.l_name}`,
        }))
      : []
    setCustomerHashOptions(customerhashOptions)
  }, [dropdownList, customerHashList])

  const initialValues = {
    customerhash: selectedItem.customerhash,
    vin: selectedItem.vin,
    name_plate: selectedItem.name_plate,
    brand: selectedItem.brand,
    model_description: selectedItem.model_description,
    ex_color: selectedItem.ex_color,
    in_color: selectedItem.in_color,
    engine: selectedItem.engine,
    fuel_type: selectedItem.fuel_type,
    added_options: selectedItem.added_options,
  }

  const validationSchema = yup.object().shape({
    customerhash: yup.string().required("Customer Name is required"),
    vin: yup.string().nullable(),
    name_plate: yup
      .string()
      .nullable()
      .when("vin", ([vin], schema) => {
        return vin ? schema.required("Name Plate is required") : schema
      }),
    brand: yup.string().nullable().required("Brand is required"),
    model_description: yup
      .string()
      .nullable()
      .when("vin", ([vin], schema) => {
        return vin ? schema.required("Model description is required") : schema
      }),
    ex_color: yup
      .string()
      .nullable()
      .when("vin", ([vin], schema) => {
        return vin ? schema.required("Exterior Color is required") : schema
      }),
    in_color: yup
      .string()
      .nullable()
      .when("vin", ([vin], schema) => {
        return vin ? schema.required("Interior Color is required") : schema
      }),
    engine: yup
      .string()
      .nullable()
      .when("vin", ([vin], schema) => {
        return vin ? schema.required("Engine Type is required") : schema
      }),
    fuel_type: yup
      .string()
      .nullable()
      .when("vin", ([vin], schema) => {
        return vin ? schema.required("Fuel Type is required") : schema
      }),
  })
  const handleChange = (e) => {
    if (e.target.value.length > 16)
      dispatch(getVehicleDetailsFromVIN(e.target.value))
  }

  const handleAddedOptionsShowModal = () => {
    setShowAddedOptions(true)
  }

  const handleAddedOptionsHideModal = () => {
    setShowAddedOptions(false)
  }

  const handleSubmit = async (values) => {
    let obj = { ...values }
    delete obj.customername
    obj["id"] = Number(selectedItem.id) || ""

    const response = await dispatch(updateVehicle(obj)).unwrap()
    if (response.data.status) {
      let payload = {
        nameplate: values.name_plate,
        brand: values.brand,
        modeldesc: values.model_description,
        exteriorcolor: values.ex_color,
        interiorcolor: values.in_color,
        enginetype: values.engine,
      }
      dispatch(createDropdownList(payload))
      handleEditHideModal()
    }
  }

  return (
    <>
      {/*<AddedOption
        showAddedOptions={showAddedOptions}
        handleAddedOptionsHideModal={handleAddedOptionsHideModal}
        data={
          initialValues?.added_options &&
          JSON.parse(initialValues?.added_options).list
        }
      />*/}

      <Modal size="lg" show={showEditModal} onHide={handleEditHideModal}>
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
                    <DropdownField
                      options={customerHashOptions}
                      label="Customer Name"
                      name="customerhash"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInputField
                      label="Customer Token"
                      name="customername"
                      disabled
                      value={values.customerhash}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInputField
                      label="VIN Number (optional)"
                      type="text"
                      name="vin"
                      onChange={(e) => {
                        handleChange(e)
                        setFieldValue("vin", e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
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
                    <CreatableDropdownField
                      label="Name Plate"
                      defaultValue={
                        vehicleDetails?.jlr_model_name_desc
                          ? vehicleDetails?.jlr_model_name_desc
                          : initialValues.name_plate
                      }
                      options={nameplateOptions}
                      name="name_plate"
                    />
                  </div>

                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Model Description"
                      defaultValue={
                        vehicleDetails?.mod_desc
                          ? vehicleDetails?.mod_desc
                          : initialValues.model_description
                      }
                      options={modelDescOptions}
                      name="model_description"
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Exterior Color"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.color
                          ? vehicleDetails?.vista_api_data?.color
                          : initialValues.ex_color
                      }
                      options={extColOptions}
                      name="ex_color"
                    />
                  </div>

                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Interior Color"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.color_interior
                          ? vehicleDetails?.vista_api_data?.color_interior
                          : initialValues.in_color
                      }
                      options={intColOptions}
                      name="in_color"
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Engine"
                      defaultValue={
                        vehicleDetails?.engine_type
                          ? vehicleDetails?.engine_type
                          : initialValues.engine
                      }
                      options={engineTypeOptions}
                      name="engine"
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Fuel Type"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.fuel_type
                          ? vehicleDetails?.vista_api_data?.fuel_type
                          : initialValues.fuel_type
                      }
                      options={fuelTypeOptions}
                      name="fuel_type"
                    />
                  </div>

                  {/*{initialValues?.added_options ? (
                    <Button
                      className="col-md-4"
                      variant="outline-dark"
                      onClick={() => handleAddedOptionsShowModal()}
                    >
                      View Added Options
                    </Button>
                  ) : null}*/}
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
    </>
  )
}

export default EditVehicle
