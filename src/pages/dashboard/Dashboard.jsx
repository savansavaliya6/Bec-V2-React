import React, { useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import Breadcrumb from "../../components/BreadCrumb"
import Schedule from "./Schedule"
import { useDispatch, useSelector } from "react-redux"
import { getDashboardData } from "./store/dashboardSlice"
import { useState } from "react"
import { FcRating } from "react-icons/fc"
import { IoStarSharp } from "react-icons/io5"
import { BsCalendar3Event } from "react-icons/bs"
import { FcCalendar } from "react-icons/fc"
import { RiCarFill } from "react-icons/ri"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"
import { HiTrophy } from "react-icons/hi2"

const Dashboard = () => {
  const dispatch = useDispatch()
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])

  const { data } = useSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(getDashboardData())
  }, [])

  useEffect(() => {
    if (data?.status) {
      data?.eventRegion?.map((item) => {
        setPieChartData((prev) => [
          ...prev,
          {
            label: item.region,
            value: item.total,
          },
        ])
      })

      Object.entries(data?.event_graph).map(([key, value]) => {
        if (key === "poor") {
          setBarChartData((p) => [...p, { label: "Poor", value: value }])
        } else if (key === "average") {
          setBarChartData((p) => [...p, { label: "Average", value: value }])
        } else if (key === "below_average") {
          setBarChartData((p) => [
            ...p,
            { label: "Below Average", value: value },
          ])
        } else if (key === "good") {
          setBarChartData((p) => [...p, { label: "Good", value: value }])
        } else if (key === "excellent") {
          setBarChartData((p) => [...p, { label: "Excellent", value: value }])
        }
      })
    }
  }, [data?.status])

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        return (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size="1x"
            className="me-1"
            style={{ color: "#ffc107" }}
          />
        )
      } else if (index === fullStars && hasHalfStar) {
        return (
          <FontAwesomeIcon
            icon={faStarHalf}
            key={index}
            size="1x"
            className="me-1"
            style={{ color: "#ffc107" }}
          />
        )
      } else {
        return (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size="1x"
            className="me-1"
            style={{ color: "#d4d4d4" }}
          />
        )
      }
    })

    return <>{stars}</>
  }

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"]

  return (
    <>
      <Breadcrumb />
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card dashoboard-card  p-1">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="dash-card-title">
                <span className="loud ">{data?.event ? data?.event : "0"}</span>
                Total Events
              </h2>
              <span>
                <FcCalendar size={25} />
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card dashoboard-card  p-1">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="dash-card-title">
                <span className="loud">
                  {data?.event_rating
                    ? `${
                        parseFloat(data?.event_rating) % 1 === 0
                          ? parseFloat(data?.event_rating).toFixed(0)
                          : parseFloat(data?.event_rating).toFixed(1)
                      }/10`
                    : "Loading"}
                </span>
                Event Rating
              </h2>
              <span>
                <HiTrophy color="#e78e25" size={28} />
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card dashoboard-card  p-1">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="dash-card-title">
                <span className="loud">
                  {/* {data?.instructor_rating
                    ? `${parseFloat(data?.instructor_rating).toFixed(1)}/10`
                    : "Loading"} */}
                  <StarRating
                    rating={parseFloat(data?.instructor_rating).toFixed(1)}
                  />
                </span>
                Avg Instructor Rating
              </h2>
              <span>
                <HiTrophy color="#e78e25" size={28} />
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card dashoboard-card  p-1">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="dash-card-title">
                <span className="loud">
                  {`${data?.active_fleet || 0}/${
                    data?.total_active_fleet || 0
                  }`}
                </span>
                Active Vehicles
              </h2>
              <span>
                <RiCarFill size={30} />
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card dashoboard-card">
            <div className="card-body ps-0 pb-2">
              <h5 className=" ps-3 pb-3">Event Ratings</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="label" />
                  <YAxis dataKey="value" domain={[0, data?.event]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card dashoboard-card">
            <div className="card-body ps-0 pb-2">
              <h5 className=" ps-3 pb-3">Events Per Region</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="label"
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className=" col-12">{<Schedule />}</div>
      </div>
    </>
  )
}

export default Dashboard
