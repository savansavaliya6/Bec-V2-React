import classNames from "classnames"
import React from "react"
import { useState } from "react"
import { Button, Modal, ProgressBar } from "react-bootstrap"
import { BsCloudArrowUp } from "react-icons/bs"
import { FaFileCsv } from "react-icons/fa"
import { Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import Axios from "../../../services/api"
import { FilePickerField } from "../../../components/Fields"
import { getVouchers } from "./store/voucherSlice"

const ImportCSV = ({ importModal, handleHideImportModal }) => {
  const [progressArr, setProgressArr] = useState([])

  const dispatch = useDispatch()
  const { params } = useSelector((state) => state.vouchers)

  const handleSubmit = async (values) => {
    let obj = { ...values }

    try {
      let data = new FormData()
      data.append("csv_file", obj["file-upload"][0])
      // dispatch(setRandomProgress())
      const role = sessionStorage.getItem("role")

      const response = await Axios.post(`/${role}/import-voucher`, data, {
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
          getVouchers({
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

  return (
    <Modal size="xl" show={importModal} onHide={handleHideImportModal}>
      <Formik
        enableReinitialize={true}
        initialValues={{ "file-upload": "" }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Upload CSV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
