import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import ReactPlayer from "react-player"
import Loading from "../../../components/Loader/loader"
import { getMedia } from "../../instructor/uploadMedia/store/eventMediaSlice"

const index = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")
  const [mediaList, setMediaList] = useState([])
  const [viewImage, setViewImage] = useState(false)

  const handleViewMedia = (data) => {
    const media =
      data.length &&
      data.map((item) => {
        function getFileExtension(url) {
          const pathParts = url.split("/")
          const fileName = pathParts[pathParts.length - 1]
          const fileNameParts = fileName.split(".")

          if (fileNameParts.length > 1) {
            return fileNameParts[1].toLowerCase()
          }
          return ""
        }

        function getFileType(mediaURL) {
          const extension = getFileExtension(mediaURL)

          if (
            extension.startsWith("jpg") ||
            extension.startsWith("jpeg") ||
            extension.startsWith("png") ||
            extension.startsWith("webp")
          ) {
            return "image"
          } else if (
            extension.startsWith("mp4") ||
            extension.startsWith("mov") ||
            extension.startsWith("webm") ||
            extension.startsWith("mkv") ||
            extension.startsWith("avi") ||
            extension.startsWith("mpeg")
          ) {
            return "video"
          }
          return "unknown" // Handle other types as needed
        }

        const itemType = getFileType(item.media)

        return {
          original: item.media,
          type: itemType,
        }
      })
    setMediaList(media)
    setViewImage(true)
  }

  const columns = [
    {
      key: "view",
      label: "View",
      cell: (row) => (
        <div className="mt-1 text-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleViewMedia(row.event_media)}
          >
            View
          </button>
        </div>
      ),
    },
    {
      key: "event_name",
      label: "Event Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.event_name || "--"}</div>
      ),
    },
    {
      key: "event_code",
      label: "Event Code",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.event_code || "--"}</div>
      ),
    },
    {
      key: "created_by",
      label: "Created by",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.created_by.name || "--"}</div>
      ),
    },
    // {
    //   key: "instructor",
    //   label: "Instructor",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>{row.instructor || "--"}</div>
    //   ),
    // },
  ]

  const dispatch = useDispatch()
  const { media, totalPages, loading } = useSelector(
    (state) => state.eventMedia
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    dispatch(getMedia())
  }, [])

  return (
    <>
      <Breadcrumb />

      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Event Media</h2>
          </div>
          <hr></hr>
          <SearchFilters
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
          <div className="table-wrapper">
            <div className="table-wrapper table-responsive">
              {/* {loading ? (
                <Loading />
              ) : media && media.length ? (
                <> */}
              <DataTable data={media} columns={columns} />
            </div>
          </div>
        </form>
        <Pagination
          currentPage={currentPage}
          totalPages={media ? Math.ceil(totalPages / itemsPerPage) : 0}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal size="xl" show={viewImage} onHide={() => setViewImage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Event Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <ImageGallery
              // thumbnailPosition="left"
              showPlayButton={false}
              items={mediaList}
              // renderFullscreenButton={(onClick, isFullscreen) => (
              //   // <Fullscreen onClick={onClick} isFullscreen={isFullscreen} />
              //   <button onClick={onClick} isFullscreen={isFullscreen}>
              //     Full screen
              //   </button>
              // )}
              renderItem={(item) => {
                if (item.type === "video") {
                  return (
                    <div className="video-container">
                      <ReactPlayer
                        url={item.original}
                        width="100%"
                        height="100%"
                        controls={true}
                      />
                    </div>
                  )
                } else {
                  return (
                    <img src={item.original} className="image-gallery-image" />
                  )
                }
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setViewImage(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default index
