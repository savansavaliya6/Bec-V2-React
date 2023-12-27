// import React, { useEffect, useState } from "react"

// import { Button, Modal } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import { FilePickerField } from "../../../../components/Fields"
// import { BsCloudArrowUp } from "react-icons/bs"
// import { GrGallery } from "react-icons/gr"
// import "../../../Instructor/uploadMedia/upload-media.css"
// import Webcam from "react-webcam"
// import { Formik, Form } from "formik"
// import * as yup from "yup"
// import {
//   Checkbox,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material"

// const AddVehicle = ({ selectedItem, onNext, onPrevious }) => {
//   const dispatch = useDispatch()
//   const [selectedOption, setSelectedOption] = useState("upload")

//   const initialValues = {
//     licence_image: "",
//   }

//   const validationSchema = yup.object().shape({})

//   const handleAddShowModal = () => {
//     setShowModal(true)
//   }

//   const handleAddHideModal = () => {
//     setShowModal(false)
//   }

//   const handleCheckboxChange = (option) => {
//     setSelectedOption(option.target.value)
//   }

//   return (
//     <>
//       <Formik
//         enableReinitialize={true}
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(values) => handleSubmit(values)}
//       >
//         {({ values, setFieldValue }) => (
//           <Form>
//             <Modal.Header closeButton>
//               <Modal.Title>Upload Licence Image</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <RadioGroup
//                 row
//                 // aria-labelledby="demo-controlled-radio-buttons-group"
//                 name="controlled-radio-buttons-group"
//                 value={selectedOption}
//                 onChange={handleCheckboxChange}
//               >
//                 <FormControlLabel
//                   value="capture"
//                   control={<Radio />}
//                   label="Capture Image"
//                 />
//                 <FormControlLabel
//                   value="upload"
//                   control={<Radio />}
//                   label="Upload Image"
//                 />
//               </RadioGroup>

//               <div className="row g-3">
//                 {selectedOption == "upload" ? (
//                   <div className="upload">
//                     <div className="upload-files">
//                       <header>
//                         <p>
//                           <BsCloudArrowUp />
//                           <span className="load">Upload</span>
//                         </p>
//                       </header>
//                       <div className="body" id="drop">
//                         <GrGallery className="File-icon" />
//                         <p className="pointer-none">
//                           Please Upload Images here. <br />
//                         </p>
//                         <div className="d-flex justify-content-center flex-column">
//                           <div>
//                             <label
//                               htmlFor="file-upload"
//                               className="custom-file-upload"
//                             >
//                               <BsCloudArrowUp /> Upload File
//                             </label>
//                             <FilePickerField
//                               type="file"
//                               id="file-upload"
//                               name="licence_image"
//                               multiple={false}
//                               accept="application/pdf,image/*"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <Webcam height={600} width={600} />
//                 )}
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="outline-dark" onClick={onPrevious}>
//                 Previous
//               </Button>

//               <Button variant="dark" onClick={onNext}>
//                 Next
//               </Button>
//             </Modal.Footer>
//           </Form>
//         )}
//       </Formik>
//     </>
//   )
// }

// {
//   /* <Form>
// <Modal.Header closeButton>
//   <Modal.Title>Upload Licence Image</Modal.Title>
// </Modal.Header>
// <Modal.Body>
//   <FormControlLabel
//     control={
//       <Checkbox onChange={handleCheckboxChange} />} label="Upload Image"
//   />
//   <FormControlLabel
//     control={
//       <Checkbox onChange={handleCheckboxChange1} />} label="Capture Image"
//   />
//   <div className="row g-3">
//     {uploadImage &&
//       // <div>
//       //   <FilePickerField
//       //     label="Upload Licence Image"
//       //     type="file"
//       //     name="licence_image"
//       //     multiple={false}
//       //     accept="application/pdf,image/*"
//       //   />
//       // </div>

//       <div className="upload">
//         <div className="upload-files">
//           <header>
//             <p>
//               <BsCloudArrowUp />
//               <span className="load">Upload</span>
//             </p>
//           </header>
//           <div className="body" id="drop">
//             <GrGallery className="File-icon" />
//             <p className="pointer-none">
//               Please Upload Images here. <br />
//             </p>
//             <div className="d-flex justify-content-center flex-column">
//               <div>
//                 <label
//                   htmlFor="file-upload"
//                   className="custom-file-upload"
//                 >
//                   <BsCloudArrowUp /> Upload File
//                 </label>
//                 <FilePickerField
//                   type="file"
//                   id="file-upload"
//                   name="licence_image"
//                   multiple={false}
//                   accept="image/x-png,image/jpeg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     }

//     {captureImage &&
//       <div onClick={() => handleAddShowModal()}>Capture Image</div>
//     }
//   </div>

// </Modal.Body>
// <Modal.Footer>
//   <Button variant="outline-dark" onClick={onPrevious}>
//     Previous
//   </Button>

//   <Button variant="dark" onClick={onNext}>
//     Next
//   </Button>
// </Modal.Footer>
// </Form> */
// }

// export default AddVehicle

import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  CheckboxFieldGroup,
  CheckboxFieldGroupForGuest,
  DatePickerField,
  DropdownField,
  RadioInput,
  TextInputField,
} from "../../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"
import { gatherData, getInterestList } from "../../store/customersSlice"
import toast from "react-hot-toast"

const Step3 = ({ selectedItem, onNext, onPrevious }) => {
  const dispatch = useDispatch()

  const { guestInterestList, formData } = useSelector(
    (state) => state.customers
  )

  const initialValues = {
    brand: formData?.brand || "",
    interests: formData?.interests || "",
  }

  const validationSchema = yup.object().shape({
    brand: yup.string().required("Please select a brand"),
    // interests: yup
    //   .array()
    //   .of(yup.string()) // Ensure that the values are strings
    //   .min(1, "Please select at least one interest") // At least one interest is required
    //   .required("Please select at least one interest"), // The field itself is required
  })

  const handleSubmit = async (values) => {
    if (values.interests.length) {
      let obj = { ...values }
      dispatch(gatherData(obj))
      onNext()
    } else {
      toast.error("Please select at least one interest")
    }
  }

  useEffect(() => {
    dispatch(getInterestList())
  }, [])

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>Add Interests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <DropdownField
                    label="Brand"
                    options={[
                      { value: "Jaguar", label: "Jaguar" },
                      { value: "Land Rover", label: "Land Rover" },
                    ]}
                    name="brand"
                  />
                </div>
                <h6>Interests</h6>

                {guestInterestList.map((list) => (
                  <div className="mb-3" key={list.id}>
                    <CheckboxFieldGroupForGuest
                      label={list.category}
                      name="interests"
                      options={
                        list.subcategory && JSON.parse(list.subcategory).length
                          ? JSON.parse(list.subcategory).map((c) => ({
                              label: c,
                              value: c,
                            }))
                          : []
                      }
                    />
                  </div>
                ))}
              </div>
            </Modal.Body>

            <br />
            <Modal.Footer>
              <Button variant="outline-dark" onClick={onPrevious}>
                Previous
              </Button>

              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Next
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Step3
