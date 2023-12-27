import React, { useEffect, useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
// import QRCode from "qrcode.react"
// import { QrReader } from "react-qr-reader"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { gatherData } from "../../store/customersSlice"
import toast from "react-hot-toast"
import { useContext } from "react"
import FileContext from "../FileContext"
import { PDFDocument, rgb } from "pdf-lib"

const Step4 = ({ handleAddHideModal, selectedItem, onPrevious, onNext }) => {
  const { saveFile } = useContext(FileContext)
  const signatureRef = useRef(null)
  const wrapperRef = useRef(null)
  const { files } = useContext(FileContext)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [imageData, setImageData] = useState(null)

  const validationSchema = yup.object().shape({})

  const handleSubmit = () => {
    if (!imageData) {
      toast.error("Please sign before submitting")
    } else {
      onNext()
    }
  }

  // ------------------------

  // Decode Base64 data
  const decodeBase64 = (base64String) => {
    const dataUriRegex = /^data:[^;]+;base64,/
    const cleanedBase64 = base64String.replace(dataUriRegex, "")

    return Uint8Array.from(atob(cleanedBase64), (c) => c.charCodeAt(0))
  }

  const mergeSignatureIntoPDF = async (pdfBase64, signatureBase64) => {
    try {
      const pdfData = decodeBase64(pdfBase64)
      const signatureData = decodeBase64(signatureBase64)

      const pdfDoc = await PDFDocument.load(pdfData)
      const [lastPage] = pdfDoc.getPages().slice(-1) // Get the last page

      const { width: pageWidth, height: pageHeight } = lastPage.getSize()

      const imageWidth = 250
      const imageHeight = 50

      const x = pageWidth - imageWidth - 20
      const y = 70

      const image = await pdfDoc.embedPng(signatureData)
      lastPage.drawImage(image, {
        x,
        y,
        width: imageWidth,
        height: imageHeight,
      })
      // Save the merged PDF
      const mergedPdfBytes = await pdfDoc.save()

      // Display or save the merged PDF
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" })
      // const url = URL.createObjectURL(blob)
      return blob
      // window.open(url, "_blank")
    } catch (error) {
      console.error("Error merging PDF and signature:", error)
    }
  }

  // ----------------------------

  const handleSave = async () => {
    if (signatureRef.current.isEmpty()) {
      toast.error("Please sign before submitting")
    } else {
      const dataURL = signatureRef.current.toDataURL("image/png")
      const pdfBase64 = selectedItem.signed_base64URL

      const blob = await mergeSignatureIntoPDF(pdfBase64, dataURL)
      await saveFile({ name: "signatureImage", file: dataURL })

      setImageData(dataURL)
      // const binaryString = atob(dataURL.split(",")[1])
      // const length = binaryString.length
      // const uint8Array = new Uint8Array(length)
      // for (let i = 0; i < length; i++) {
      //   uint8Array[i] = binaryString.charCodeAt(i)
      // }
      // const blob = new Blob([uint8Array], { type: "image/png" })
      const file = new File([blob], "signedIndemnity.pdf", {
        type: "application/pdf",
      })

      await saveFile({ name: "signature", file: file })
      signatureRef.current.clear()
    }
  }

  useEffect(() => {
    const signatureWrapper = wrapperRef.current
    if (signatureWrapper) {
      const width = signatureWrapper.clientWidth
      const height = signatureWrapper.clientHeight
      setDimensions({ width, height })
    }
  }, [wrapperRef])

  useEffect(() => {
    const signature = files.find((i) => i.name === "signatureImage")

    if (signature) {
      setImageData(signature.file)
    }
  }, [])

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={selectedItem}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>Sign Indemnity form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <iframe
                src={selectedItem?.signedURL}
                title="PDF Document"
                width="100%"
                height="500px"
              />
              <h4>Please, Sign here.</h4>
              <div
                className="mb-2"
                ref={wrapperRef}
                style={{
                  border: "2px solid black",
                  height: "200px",
                }}
              >
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="black"
                  canvasProps={{
                    width: dimensions.width,
                    height: dimensions.height,
                  }}
                />
              </div>
              <div className="d-flex justify-content-end mb-2">
                <Button
                  variant="outline-dark"
                  className="me-2"
                  onClick={handleSave}
                  disabled={imageData}
                >
                  Save Signature
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    signatureRef.current.clear()
                    setImageData(null)
                  }}
                >
                  Reset
                </Button>
              </div>
              {imageData && (
                <div>
                  <h4>Saved Signature Image:</h4>
                  <div
                    className="mb-2"
                    style={{
                      border: "2px solid black",
                      height: "200px",
                    }}
                  >
                    <img src={imageData} alt="Saved Signature" />
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={onPrevious}>
                Previous
              </Button>
              <Button variant="dark" type="submit">
                Next
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Step4
