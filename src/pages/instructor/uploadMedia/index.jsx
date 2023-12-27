import React, { useEffect, useMemo, useState } from "react"
import Breadcrumb from "../../../components/BreadCrumb"
import "../uploadMedia/upload-media.css"
import { useDispatch, useSelector } from "react-redux"
import { DropdownField, FilePickerField } from "../../../components/Fields"
import { Formik, Form } from "formik"
import { GrGallery } from "react-icons/gr"
import { BsCloudArrowUp } from "react-icons/bs"
import * as yup from "yup"
import { getEventsDropDown } from "../../event/events/store/eventsSlice"
import toast from "react-hot-toast"
import { Button, ProgressBar } from "react-bootstrap"
import { uploadMedia } from "./store/eventMediaSlice"
import Axios from "../../../services/api"
import classNames from "classnames"
import {
  completeProgress,
  setRandomProgress,
} from "../../../store/loadingBarSlice"

const index = () => {
  const dispatch = useDispatch()
  const { eventsList } = useSelector((state) => state.events)
  const [progressArr, setProgressArr] = useState([])

  const validationSchema = yup.object().shape({
    event_id: yup.string().required("Event Name is required"),
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

  useEffect(() => {
    dispatch(getEventsDropDown())
  }, [])

  const handleSubmit = async (values) => {
    let obj = { ...values }

    const uploadFile = async (file, event_id, index) => {
      let data = new FormData()
      data.append("event_id", event_id)
      data.append("media[]", file)
      // dispatch(setRandomProgress())
      const role = sessionStorage.getItem("role")

      const response = await Axios.post(`/${role}/eventMedia/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function (progressEvent) {
          let uploadPercentage = parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          )
          progressArr[index] = {
            fileName: file.name,
            progress: uploadPercentage,
          }

          setProgressArr([...progressArr])
        },
      })
      if (response.data.status) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
      // dispatch(completeProgress())
    }

    let uploadPromises = obj["file-upload"].map((file, index) =>
      uploadFile(file, obj["event_id"], index)
    )

    Promise.all(uploadPromises)
      .then(() => {
        setProgressArr([])
      })
      .catch(() => {
        setProgressArr([])
      })
  }

  return (
    <>
      <Breadcrumb />
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Upload Event Media</h2>
          </div>
          <hr></hr>

          <div>
            <Formik
              enableReinitialize={true}
              initialValues={{ event_id: "", "file-upload": "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, errors, isSubmitting }) => (
                <Form>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <DropdownField
                        options={
                          eventsList?.length
                            ? eventsList.map((event, i) => ({
                                value: event.id,
                                label: event.event_name,
                              }))
                            : []
                        }
                        label="Choose Event"
                        name="event_id"
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
                            <GrGallery className="File-icon" />
                            <p className="pointer-none">
                              Please Upload Images or Videos here. <br />
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
                                  accept="image/x-png,image/jpeg,video/mp4"
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
                          <div key={index}>File {percentage?.fileName}:</div>
                          {/* <progress value={percentage.progress} max="100" /> */}
                          <ProgressBar
                            animated
                            striped
                            variant="success"
                            now={percentage?.progress}
                            label={`${percentage?.progress}%`}
                          />
                          {/* {percentage.progress}% */}
                        </>
                      ))}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
