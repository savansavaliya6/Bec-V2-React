import React, { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment-timezone"
import { useDispatch, useSelector } from "react-redux"
import { getEvents } from "./store/instructorSlice"
import EventDetail from "./EventDetail"

const localizer = momentLocalizer(moment)

const index = () => {
  const dispatch = useDispatch()
  const { events } = useSelector((state) => state.instructor)

  const [showEventDetailModal, setShowEventDetailModal] = useState(false)

  const [eventsList, setEventsList] = useState([])
  const [clickedEvent, setClickedEvent] = useState({})
  const [id, setId] = useState("")

  useEffect(() => {
    if (events.length) {
      const myEventsList = events?.length
        ? events?.map((events) => ({
            title: events?.event_name,
            start: moment(events?.start_time)
              .tz("Africa/Johannesburg")
              .toDate(),
            end: moment(events?.end_time).tz("Africa/Johannesburg").toDate(),
            allDay: false,
            desc: events?.event_code,
          }))
        : []
      setEventsList(myEventsList)
    }
  }, [events])

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  const handleSelect = (e) => {
    let clickedEvent = events.filter((event) => event.event_code == e.desc)

    let obj = {
      "Event Name": clickedEvent[0].event_name,
      "Event Code": clickedEvent[0].event_code,
      "Event Category": clickedEvent[0].event_category.name,
      "Event type": clickedEvent[0].event_type.name,
      "Start Date": moment(clickedEvent[0]?.start_time)
        .tz("Africa/Johannesburg")
        .format("MMM Do YYYY, (h:mm A)"),
      // "Start Time": clickedEvent[0].start_time.split(" ")[1],
      "End Date": moment(clickedEvent[0]?.end_time)
        .tz("Africa/Johannesburg")
        .format("MMM Do YYYY, (h:mm A)"),
      // "End Time": clickedEvent[0].end_time.split(" ")[1],
      Region: clickedEvent[0].region,
      Retailer: clickedEvent[0].retailer.dealer_name,
      "Project Manager": clickedEvent[0].project_manager,
      "Number of Guests": clickedEvent[0].number_of_guest || "-",
      // "Multi-day Attendance": clickedEvent[0].attendance ? "Yes" : "No",
    }

    setId(clickedEvent[0].id)
    setClickedEvent(obj)
    handleShowEventDetailModal(obj)
  }

  const handleShowEventDetailModal = (row) => {
    setClickedEvent(row)
    setShowEventDetailModal(true)
  }

  const handleHideEventDetailModal = (row) => {
    setShowEventDetailModal(false)
    setClickedEvent({})
  }

  const eventStyle = (event, start, end, isSelected) => {
    const getRandomColor = () => {
      let letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)]
      return color
    }
    const shadeColor = (color, percent) => {
      const f = parseInt(color.slice(1), 16)
      const t = percent < 0 ? 0 : 255
      const p = percent < 0 ? percent * -1 : percent
      const R = f >> 16
      const G = (f >> 8) & 0x00ff
      const B = f & 0x0000ff
      return (
        "#" +
        (
          0x1000000 +
          (Math.round((t - R) * p) + R) * 0x10000 +
          (Math.round((t - G) * p) + G) * 0x100 +
          (Math.round((t - B) * p) + B)
        )
          .toString(16)
          .slice(1)
      )
    }
    const color = getRandomColor()
    const lighterShade = shadeColor(color, 30)
    const darkerShade = shadeColor(color, -30)
    const gradient = `linear-gradient(to right, ${lighterShade},  ${darkerShade})`

    var style = {
      // backgroundColor: darkerShade,
      backgroundImage: gradient,
      borderRadius: "5px",
      opacity: 0.9,
      color: "black",
      border: "0px",
      display: "block",
    }
    return {
      style: style,
    }
  }

  return (
    <>
      <EventDetail
        showEventDetailModal={showEventDetailModal}
        handleHideEventDetailModal={handleHideEventDetailModal}
        data={clickedEvent}
        id={id}
      />
      <div>
        <h2 className="mb-5">Instructor Schedule </h2>
        <Calendar
          localizer={localizer}
          events={eventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelect}
          eventPropGetter={eventStyle}
        />
      </div>
    </>
  )
}

export default index
