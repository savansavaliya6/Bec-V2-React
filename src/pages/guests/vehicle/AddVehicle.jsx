import React, { useEffect, useState } from "react"
import {
  createDropdownList,
  createVehicle,
  getVehicleDetailsFromVIN,
} from "./store/vehicleSlice"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  CreatableDropdownField,
  DropdownField,
  TextInputField,
} from "../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"
import AddedOption from "../allInOne/AddedOption"

const AddVehicle = ({ showModal, handleAddHideModal, selectedItem }) => {
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
    }
    const customerhashOptions = customerHashList.length
      ? customerHashList.map((id) => ({
          value: id.customerhash,
          label: `${id.f_name} ${id.l_name}`,
        }))
      : []
    setCustomerHashOptions(customerhashOptions)
  }, [dropdownList, customerHashList])

  const fuelTypeOptions = [
    {
      value: "Petrol",
      label: "Petrol",
    },
    {
      value: "Diesel",
      label: "Diesel",
    },
    {
      value: "CNG",
      label: "CNG",
    },
    {
      value: "EV",
      label: "EV",
    },
  ]

  // const validationSchema = yup.object().shape({
  //   customerhash: yup.string().required("Customer Name is required"),
  //   vin: yup.string(),
  //   name_plate: yup.string().when("vin", ([vin], schema) => {
  //     return vin ? schema.required("Name Plate is required") : schema
  //   }),
  //   brand: yup.string().required("Brand is required"),
  //   model_description: yup.string().when("vin", ([vin], schema) => {
  //     return vin ? schema.required("Model description is required") : schema
  //   }),
  //   ex_color: yup.string().when("vin", ([vin], schema) => {
  //     return vin ? schema.required("Exterior Color is required") : schema
  //   }),
  //   in_color: yup.string().when("vin", ([vin], schema) => {
  //     return vin ? schema.required("Interior Color is required") : schema
  //   }),
  //   engine: yup.string().when("vin", ([vin], schema) => {
  //     return vin ? schema.required("Engine Type is required") : schema
  //   }),
  //   fuel_type: yup.string().when("vin", ([vin], schema) => {
  //     return vin ? schema.required("Fuel Type is required") : schema
  //   }),
  // })

  const validationSchema = yup.object().shape({
    customerhash: yup.string().required("Customer Name is required"),
    vin: yup.string().nullable(),
    name_plate: yup
      .string()
      .nullable()
      .when("vin", ([vin], schema) => {
        return vin ? schema.required("Name Plate is required") : schema
      }),
    brand: yup.string().required("Brand is required"),
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
    if (vehicleDetails?.vista_api_data?.added_option?.list) {
      obj.added_options = JSON.stringify(
        vehicleDetails?.vista_api_data?.added_option
      )
    }
    const response = await dispatch(createVehicle(obj)).unwrap()
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
      handleAddHideModal()
    }
  }

  return (
    <>
      {/*<AddedOption
        showAddedOptions={showAddedOptions}
        handleAddedOptionsHideModal={handleAddedOptionsHideModal}
        data={vehicleDetails?.vista_api_data?.added_option?.list}
      />*/}

      <Modal size="lg" show={showModal} onHide={handleAddHideModal}>
        <Formik
          enableReinitialize={true}
          initialValues={selectedItem}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Add Vehicle</Modal.Title>
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
                      options={brandsOptions}
                      defaultValue={vehicleDetails?.brand || ""}
                      name="brand"
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Name Plate"
                      options={nameplateOptions}
                      defaultValue={vehicleDetails?.nameplate || ""}
                      name="name_plate"
                    />
                  </div>

                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Model Description"
                      options={modelDescOptions}
                      defaultValue={vehicleDetails?.mod_desc || ""}
                      name="model_description"
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Exterior Color"
                      defaultValue={vehicleDetails?.vista_api_data?.color || ""}
                      options={extColOptions}
                      name="ex_color"
                    />
                  </div>

                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Interior Color"
                      options={intColOptions}
                      defaultValue={
                        vehicleDetails?.vista_api_data?.color_interior || ""
                      }
                      name="in_color"
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Engine"
                      defaultValue={vehicleDetails?.engine_type || ""}
                      options={engineTypeOptions}
                      name="engine"
                    />
                  </div>
                  <div className="col-md-6">
                    <CreatableDropdownField
                      label="Fuel Type"
                      defaultValue={
                        vehicleDetails?.vista_api_data?.fuel_type || ""
                      }
                      options={fuelTypeOptions}
                      name="fuel_type"
                    />
                  </div>

                  {/*{vehicleDetails?.vista_api_data?.added_option?.list ? (
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
    </>
  )
}

export default AddVehicle
