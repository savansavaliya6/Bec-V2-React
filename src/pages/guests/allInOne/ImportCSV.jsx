import classNames from "classnames"
import React from "react"
import { useState } from "react"
import { Button, Modal, ProgressBar } from "react-bootstrap"
import { BsCloudArrowUp } from "react-icons/bs"
import { FaFileCsv } from "react-icons/fa"
import { DropdownField, FilePickerField } from "../../../components/Fields"
import { Form, Formik } from "formik"
import * as yup from "yup"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGuestTypesList, getGuests } from "../guest/store/guestSlice"
import Axios from "../../../services/api"
import {
  completeProgress,
  setRandomProgress,
} from "../../../store/loadingBarSlice"
import toast from "react-hot-toast"

const ImportCSV = ({ importModal, handleHideImportModal }) => {
  const [progressArr, setProgressArr] = useState([])
  const [guestTypeList, setGuestTypeList] = useState([])

  const dispatch = useDispatch()
  const { guestTypesList, params } = useSelector((state) => state.guests)

  const validationSchema = yup.object().shape({
    guest_type: yup.string().required("Guest Type is required"),
    // "file-upload": yup
    //   .array()
    //   .min(1, "At least one file is required")
    //   .of(
    //     yup
    //       .mixed()
    //       .test("fileType", "Unsupported File Format", (value) => {
    //         const allowedFormats = ["image/jpeg", "image/png", "video/mp4"]
    //         return allowedFormats.includes(value.type)
    //       })
    //       .test("fileSize", "File Size is too large", (value) => {
    //         if (value.type.startsWith("image/")) {
    //           return value.size <= 5 * 1024 * 1024
    //         } else if (value.type === "video/mp4") {
    //           return value.size <= 50 * 1024 * 1024
    //         }
    //         return true
    //       })
    //   )
    //   .required("File is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }

    try {
      let data = new FormData()
      data.append("guest_type", obj.guest_type)
      data.append("csv_file", obj["file-upload"][0])
      // dispatch(setRandomProgress())
      const role = sessionStorage.getItem("role")

      const response = await Axios.post(`/${role}/import-customers`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function (progressEvent) {
          let uploadPercentage = parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          )
          progressArr[0] = {
            fileName: obj["file-upload"][0].name,
            progress: uploadPercentage,
          }

          setProgressArr([...progressArr])
        },
      })
      if (response.data.status) {
        setProgressArr([])
        handleHideImportModal()
        dispatch(
          getGuests({
            page: params.page,
            perPage: params.perPage,
            query: params.query,
          })
        )
        toast.success(response.data.message)
      } else {
        setProgressArr([])
        toast.error(response.data.message)
      }
      // dispatch(completeProgress())
    } catch (error) {
      setProgressArr([])
      toast.error(error)
      // dispatch(completeProgress())
    }
  }

  useEffect(() => {
    const guestListOptions = guestTypesList.length
      ? guestTypesList.map((id) => ({ value: id.name, label: id.name }))
      : []
    setGuestTypeList(guestListOptions)
  }, [guestTypesList])

  useEffect(() => {
    dispatch(getGuestTypesList())
  }, [])

  return (
    <Modal size="xl" show={importModal} onHide={handleHideImportModal}>
      <Formik
        enableReinitialize={true}
        initialValues={{ guest_type: "", "file-upload": "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Upload CSV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-4">
                  <DropdownField
                    label="Guest Type"
                    options={guestTypeList}
                    name="guest_type"
                  />
                </div>
              </div>
              <div className="row g-3">
                <div
                  className={classNames({
                    "col-md-6": progressArr.length,
                    "col-md-12": progressArr.length < 0,
                  })}
                >
                  <div className="upload">
                    <div className="upload-files">
                      <header>
                        <p>
                          <BsCloudArrowUp />
                          <span className="load">Upload</span>
                        </p>
                      </header>
                      <div className="body" id="drop">
                        <FaFileCsv className="File-icon" />
                        <p className="pointer-none">
                          Please Upload CSV File here. <br />
                        </p>
                        <div className="d-flex justify-content-center flex-column">
                          <div>
                            <label
                              htmlFor="file-upload"
                              className="custom-file-upload"
                            >
                              <BsCloudArrowUp /> Upload File
                            </label>
                            <FilePickerField
                              type="file"
                              id="file-upload"
                              name="file-upload"
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                          </div>
                          {values?.["file-upload"].length ? (
                            values?.["file-upload"].map((selectedFile) => (
                              <span
                                id="file-name"
                                className="ml-2"
                                key={selectedFile.name}
                              >
                                {selectedFile.name}
                              </span>
                            ))
                          ) : (
                            <p className="text-center mt-2">
                              No Files selected
                            </p>
                          )}

                          {values?.["file-upload"].length ? (
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn btn-dark btn-step mt-3"
                            >
                              Upload
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-5">
                  {progressArr.map((percentage, index) => (
                    <>
                      <div key={index}>File {percentage.fileName}:</div>
                      {/* <progress value={percentage.progress} max="100" /> */}
                      <ProgressBar
                        animated
                        striped
                        variant="success"
                        now={percentage.progress}
                        label={`${percentage.progress}%`}
                      />
                      {/* {percentage.progress}% */}
                    </>
                  ))}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleHideImportModal}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ImportCSV
