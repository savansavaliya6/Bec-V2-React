import React, { Fragment, useEffect, useMemo, useState } from "react"
import { Collapse } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import logo from "./../../assets/images/logo-white.png"
import classNames from "classnames"
import { RxDashboard } from "react-icons/rx"
import { FiUser, FiUsers } from "react-icons/fi"
import { MdCarRental, MdManageAccounts } from "react-icons/md"
import { FaRegUserCircle } from "react-icons/fa"
import { BsCalendarEvent } from "react-icons/bs"
import { LuSettings2 } from "react-icons/lu"
import { FaUsersLine } from "react-icons/fa6"
import {
  FcBusinessman,
  FcComboChart,
  FcConferenceCall,
  FcDisclaimer,
  FcEngineering,
  FcMultipleCameras,
  FcOvertime,
  FcPlanner,
  FcPodiumWithSpeaker,
  FcPortraitMode,
  FcReadingEbook,
  FcRules,
  FcServices,
  FcSurvey,
  FcVoicePresentation,
} from "react-icons/fc"

const SideBar = ({ hideSidebar, darkMode }) => {
  const [color, setColor] = useState("#fff")
  const [guestCode, setguestCode] = useState("")
  const role = sessionStorage.getItem("role")
  const instructor = sessionStorage.getItem("instructor")

  const { id } = useParams()
  useEffect(() => {
    if (darkMode) {
      setColor("#808080")
    } else {
      setColor("#4f6a92")
    }
  }, [darkMode])

  const location = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100"><path d="M77.5,28.28l-18-9a3.2,3.2,0,0,0-2.62,0L40.25,27.66,23.5,19.28a3.1,3.1,0,0,0-3.13.12A2.88,2.88,0,0,0,19,21.91v45a2.92,2.92,0,0,0,1.63,2.62l18,9a3.2,3.2,0,0,0,2.63,0L58,70.16l16.63,8.38a2.52,2.52,0,0,0,1.37.37,2.75,2.75,0,0,0,1.62-.5A2.88,2.88,0,0,0,79,75.91v-45A2.81,2.81,0,0,0,77.5,28.28ZM72.75,34V57.78a1.87,1.87,0,0,1-2.5,1.88c-4.63-1.75-.88-9.5-4.25-13.75-3.13-3.88-7.13.13-11-6C51.37,34,56.25,29.78,60.75,27.53a2.13,2.13,0,0,1,1.75,0l9.25,4.63A2,2,0,0,1,72.75,34ZM47.62,68.78a2.1,2.1,0,0,1-2.25-.25,6.57,6.57,0,0,1-2.25-4.63c0-3-5-2-5-8,0-4.87-5.75-6.13-10.63-5.63a1.88,1.88,0,0,1-2.12-2V30a1.86,1.86,0,0,1,2.75-1.75l10.75,5.38a.44.44,0,0,1,.25.13l.37.25c4.5,2.63,3.62,4.75,1.75,8-2.13,3.62-3,0-6-1s-6,1-5,3,4,0,6,2,2,5,8,3,7-1,9,1a6.31,6.31,0,0,1,0,9c-1.75,1.75-2.5,5.5-3.25,8a2,2,0,0,1-1,1.25Z" fill="${color}"/></svg>`

  const add_contact = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"   width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 100 100" xml:space="preserve">

	<path fill="${color}" d="M46,9H6c-2.7,0-5,2.2-5,5v24c0,2.7,2.3,5,5,5h40c2.8,0,5-2.2,5-5V14C51,11.2,48.8,9,46,9z M24.8,37.2h-7.2
		h-7.2c-1.6,0-2.8-1.7-2.8-3.4c0.1-2.5,2.7-4,5.4-5.2c1.9-0.8,2.2-1.6,2.2-2.4c0-0.8-0.5-1.6-1.2-2.2c-1.1-1-1.7-2.5-1.7-4.1
		c0-3.2,1.9-5.8,5.2-5.8s5.2,2.7,5.2,5.8c0,1.7-0.6,3.2-1.7,4.1c-0.7,0.6-1.2,1.3-1.2,2.2c0,0.8,0.2,1.6,2.2,2.3
		c2.7,1.2,5.3,2.8,5.4,5.3C27.7,35.5,26.4,37.2,24.8,37.2z M44.3,31.4c0,0.9-0.8,1.7-1.7,1.7h-7.5c-0.9,0-1.7-0.7-1.7-1.7v-2.5
		c0-0.9,0.8-1.7,1.7-1.7h7.5c0.9,0,1.7,0.7,1.7,1.7V31.4z M44.3,22.3c0,0.9-0.8,1.7-1.7,1.7H30.2c-0.9,0-1.7-0.7-1.7-1.7v-2.5
		c0-0.9,0.8-1.7,1.7-1.7h12.5c0.9,0,1.7,0.7,1.7,1.7V22.3z"/>
</svg>
`

  const rating = `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 100 100" >
  <path fill="${color}" d="M27.4133467,3.10133815 L32.0133467,18.1013381 C32.2133467,18.7013381 32.8133467,19.0013381 33.4133467,19.0013381 L48.4133467,19.0013381 C49.9133467,19.0013381 50.5133467,21.0013381 49.3133467,21.9013381 L37.1133467,30.9013381 C36.6133467,31.3013381 36.4133467,32.0013381 36.6133467,32.6013381 L42.4133467,48.0013381 C42.8133467,49.4013381 41.3133467,50.6013381 40.1133467,49.7013381 L27.0133467,39.9013381 C26.5133467,39.5013381 25.8133467,39.5013381 25.2133467,39.9013381 L12.0133467,49.7013381 C10.8133467,50.6013381 9.21334668,49.4013381 9.71334668,48.0013381 L15.3133467,32.6013381 C15.5133467,32.0013381 15.3133467,31.3013381 14.8133467,30.9013381 L2.61334668,21.9013381 C1.41334668,21.0013381 2.11334668,19.0013381 3.51334668,19.0013381 L18.5133467,19.0013381 C19.2133467,19.0013381 19.7133467,18.8013381 19.9133467,18.1013381 L24.6133467,3.00133815 C25.0133467,1.60133815 27.0133467,1.70133815 27.4133467,3.10133815 Z M26.0133467,12.8023264 C26,14.1700393 26,33.5426636 26,34.4953918 C26.1865845,34.6476135 28.9331193,36.6890643 34.2396046,40.6197441 C34.9394191,41.144605 35.8141872,40.4447905 35.5809157,39.6283403 L35.5809157,39.6283403 L32.3085327,31.0201416 C31.9597778,30.2501831 32.3085327,29.7487793 32.7398682,29.4849854 L32.7398682,29.4849854 L39.6048489,24.6961622 C40.3046634,24.1713013 39.9547562,23.0049438 39.0799881,23.0049438 L39.0799881,23.0049438 L31.0206299,23.0049438 C30.6707226,23.0049438 29.7518921,22.8880615 29.5025635,21.9888306 L29.5025635,21.9888306 L26.8332347,13.4436151 C26.7175852,13.0388421 26.3602784,12.8204102 26.0133467,12.8023264 Z" />
</svg>`

  const feedback = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">

  <g>
    <g>
      <path fill="${color}" d="M79.1,56.5c-0.1-0.4-0.1-0.9,0.2-1.2C81,52.2,82,48.7,82,45c0-11.6-9.9-21-22-21c-5.2,0-10,1.8-13.8,4.7
        C58.7,31.4,68,42.2,68,55c0,3.6-0.7,7.1-2.1,10.2c2-0.5,3.9-1.3,5.7-2.4c0.4-0.2,0.8-0.3,1.2-0.1l6.4,2.3c1.1,0.4,2.2-0.7,1.9-1.9
        L79.1,56.5z"/>
    </g>
    <g>
      <path fill="${color}" d="M40,34c-12.1,0-22,9.4-22,21c0,3.7,1,7.2,2.8,10.3c0.2,0.4,0.3,0.8,0.2,1.2l-2.1,6.7
        c-0.4,1.2,0.7,2.3,1.9,1.9l6.4-2.3c0.4-0.1,0.9-0.1,1.2,0.1c3.4,2,7.3,3.1,11.6,3.1c12.1,0,22-9.4,22-21C62,43.4,52.1,34,40,34z
         M28,59c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4C32,57.2,30.2,59,28,59z M40,59c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4
        c2.2,0,4,1.8,4,4C44,57.2,42.2,59,40,59z M52,59c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4C56,57.2,54.2,59,52,59z"/>
    </g>
  </g>
  </svg>
  `

  const checkin = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 100 100"  xml:space="preserve">
<path fill="${color}" d="M26,2C15.5,2,7,10.5,7,21.1c0,13.2,13.6,25.3,17.8,28.5c0.7,0.6,1.7,0.6,2.5,0C31.5,46.3,45,34.3,45,21.1
	C45,10.5,36.5,2,26,2z M26,29c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S30.4,29,26,29z"/>
</svg>
`

  const note = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="30px" height="30px" viewBox="0 0 100 100" xml:space="preserve">
<g>
	<path fill="${color}" d="M71.3,67l-1.1,1.1C69,69.3,67.3,70,65.6,70h-3.3c-3,0-6.3-2.3-6.3-6.5v-3.1c0-2.5,1.1-4,1.8-4.8L71.3,42
		c0.4-0.4,0.7-1.2,0.7-1.7V30c0-3.3-2.7-6-6-6H34c-3.3,0-6,3-6,6h-2c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4h2v8h-2c-2.2,0-4,1.8-4,4
		c0,2.2,1.8,4,4,4h2v8h-2c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4h2c0,4,2.7,6,6,6h23h9c3.3,0,6-2.7,6-6v-2.7C72,66.7,71.7,66.6,71.3,67z
		 M61,39c0,1.1-0.9,2-2,2H39c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2V39z M52,63c0,1.1-0.9,2-2,2H39
		c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h11c1.1,0,2,0.9,2,2V63z M55,51c0,1.1-0.9,2-2,2H39c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h14
		c1.1,0,2,0.9,2,2V51z"/>
	<path fill="${color}" d="M81.4,45.6l-1.2-1.2c-0.8-0.8-2-0.8-2.8,0L62.1,59.9C62,59.9,62,60.1,62,60.2v3.3c0,0.3,0,0.5,0.3,0.5h3.3
		c0.1,0,0.3-0.1,0.4-0.1l15.4-15.4C82.2,47.6,82.2,46.4,81.4,45.6z"/>
</g>
</svg>
`

  const pdf = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="30px" height="30px" viewBox="0 0 56 64" enable-background="new 0 0 56 64" xml:space="preserve">
<g>
 <path fill="#8E030F" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"/>
 <path fill="#640103" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"/>
 <path fill="#FEB8AB" enable-background="new    " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"/>
</g>
<path fill="${color}" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7
 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z
  M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1
 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7
 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7
 C42.2,42.8,41.9,43.1,41.5,43.1z"/>
</svg>`

  const service_appointment = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 100 100">
    <rect x="60.31" y="60.99" width="5.48" height="5.48" rx="0.91" ry="0.91" fill="${color}" />
    <rect x="60.31" y="70.12" width="5.48" height="5.48" rx="0.91" ry="0.91" fill="${color}" />
    <rect x="51.17" y="60.99" width="5.48" height="5.48" rx="0.91" ry="0.91" fill="${color}" />
    <rect x="51.17" y="70.12" width="5.48" height="5.48" rx="0.91" ry="0.91" fill="${color}" />
    <rect x="42.03" y="60.99" width="5.48" height="5.48" rx="0.91" ry="0.91" fill="${color}" />
    <rect x="42.03" y="70.12" width="5.48" height="5.48" rx="0.91" ry="0.91" fill="${color}" />
    <path d="M71.83,20H28.3A8.11,8.11,0,0,0,20,27.81V72.19A8.08,8.08,0,0,0,28.16,80h5.9a3.62,3.62,0,0,1-.4-1.66V56A1.41,1.41,0,0,1,35,54.6H72.51A1.41,1.41,0,0,1,73.88,56V78.34a3.62,3.62,0,0,1-.31,1.47A8,8,0,0,0,80,72.19V27.81C80.14,23.56,76.42,20,71.83,20ZM30.78,36.1A2.85,2.85,0,0,1,28,33.35V30.6a2.85,2.85,0,0,1,2.76-2.75H44.85a2.85,2.85,0,0,1,2.76,2.75v2.75a2.85,2.85,0,0,1-2.76,2.75Zm43.1,14.14a1.41,1.41,0,0,1-1.37,1.37H35a1.41,1.41,0,0,1-1.37-1.37V48a3.67,3.67,0,0,1,3.66-3.65h4.57V42.48a2.74,2.74,0,0,1,5.48,0V44.3h12.8V42.48a2.74,2.74,0,0,1,5.48,0V44.3h4.57A3.67,3.67,0,0,1,73.88,48Z" fill="${color}" fill-rule="evenodd" />
  </svg>
`

  const upload = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 100 100" xml:space="preserve">
  <g>
    <path fill="${color}" d="M48.5,31h-3c-0.8,0-1.5,0.8-1.5,1.5v10c0,0.8-0.7,1.5-1.5,1.5h-33C8.7,44,8,43.3,8,42.5v-10
      C8,31.8,7.3,31,6.5,31h-3C2.7,31,2,31.8,2,32.5V46c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4V32.5C50,31.8,49.3,31,48.5,31z"/>
    <path fill="${color}" d="M27,2.4c-0.6-0.6-1.5-0.6-2.1,0L11.4,15.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0l5.6-5.6
      c0.6-0.6,1.8-0.2,1.8,0.7v21.2c0,0.8,0.6,1.5,1.4,1.5h3c0.8,0,1.6-0.8,1.6-1.5V15.3c0-0.9,1-1.3,1.7-0.7l5.6,5.6
      c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L27,2.4z"/>
  </g>
  </svg>
  `
  const canvas = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<g>
 <path fill="${color}" d="M73.9,65.9c-0.2,3.4-0.6,7.1-1.2,10.6c-0.2,1.1-1.2,2.1-2.3,2.2C63.6,79.6,56.8,80,50,80
   c-6.7,0-13.5-0.4-20.2-1.3c-1.1-0.1-2.1-1.2-2.3-2.2C26.5,70.9,26,65.2,26,59.6c0-5.7,0.5-11.4,1.4-16.9c0.2-1.1,1.2-2.1,2.3-2.3
   c4.1-0.5,8.2-0.8,12.2-1c0,0,3.3-0.2,3.1-3.2c-0.2-2.8-5-4.6-5-9.4c0-3.8,3.8-6.8,9.9-6.8c6.1,0,9.9,3.1,9.9,6.8
   c0,4.7-4.7,6.6-4.9,9.4c-0.2,3.1,3,3.2,3,3.2c4.1,0.2,8.3,0.5,12.4,1c1.1,0.2,2.1,1.2,2.3,2.3c0.7,3.9,1.1,7.4,1.3,11.2
   c0.1,1.1-0.9,2-2.1,2c-0.4,0-0.7-0.1-1.1-0.1c-1.2,0-2.9-0.7-3.7-1.6c0,0-2.7-2.7-5.5-2.7c-4.6-0.1-8.2,4.1-8.2,8.5
   c0,4.4,3.5,8.6,8.1,8.5c2.8-0.1,5.5-2.9,5.5-2.9c0.9-0.8,2.5-1.6,3.7-1.6c0.4-0.1,0.7-0.1,1.1-0.1C73.1,64,74,64.9,73.9,65.9z"/>
</g>
</svg>
`

  const coupon_codes = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100">
  <path
      d="M80,42V33a3,3,0,0,0-3-3H38v2H36V30H23a3,3,0,0,0-3,3v9a8,8,0,0,1,0,16h0v9a3,3,0,0,0,3,3H36V68h2v2H77a3,3,0,0,0,3-3V58a8,8,0,0,1,0-16ZM38,64H36V60h2Zm0-8H36V52h2Zm0-8H36V44h2Zm0-8H36V36h2ZM51,53.62,49.13,55l-2-2.75L45,55l-1.87-1.33,2-2.9-3.11-1,.69-2.18,3,1V45.05h2.53v3.52l3-1,.68,2.18-3.11,1Zm15.84,0L65,55l-2-2.75L60.85,55,59,53.62,61,50.72l-3.11-1,.68-2.18,3,1V45.05h2.53v3.52l3-1,.69,2.18-3.11,1Z"
      fill="${color}" />
</svg>`

  const custom31 = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<path fill="${color}" d="M75.5,43.2l-4.9-15.4C69.7,24.9,67,23,64,23H52H36c-3,0-5.7,1.9-6.7,4.8l-4.8,15.4c-2.6,0.7-4.5,3-4.5,5.8
 v12c0,2.6,1.7,4.8,4,5.7V75c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2v-8h16h12v8c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2v-8.3
 c2.3-0.8,4-3,4-5.7V49C80,46.2,78.1,43.9,75.5,43.2z M30,60c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S32.8,60,30,60z M52,43H32.2
 c-0.7,0-1.2-0.7-1-1.3l3.8-12c0.1-0.4,0.5-0.7,0.9-0.7h16h12c0.399,0,0.8,0.3,0.899,0.6l3.8,12.1c0.2,0.6-0.3,1.3-1,1.3H52z M69,60
 c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S71.8,60,69,60z"/>
</svg>
`

  const custom38 = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<g>
 <path fill="${color}" d="M50,45c-4.4,0-8,3.6-8,8c0,4.4,3.6,8,8,8c4.4,0,8-3.6,8-8C58,48.6,54.4,45,50,45z"/>
 <path fill="${color}" d="M74,35h-8.1c-0.801,0-1.5-0.4-1.801-1.2l-2.6-5.5c-1-2-3.1-3.3-5.4-3.3H43.9c-2.3,0-4.4,1.3-5.4,3.3
   l-2.6,5.5c-0.3,0.7-1,1.2-1.8,1.2H26c-3.3,0-6,2.7-6,6v28c0,3.3,2.7,6,6,6h48c3.3,0,6-2.7,6-6V41C80,37.7,77.3,35,74,35z M50,67.2
   c-7.7,0-14-6.3-14-14s6.3-14,14-14s14,6.3,14,14S57.7,67.2,50,67.2z"/>
</g>
</svg>
`

  const customer = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 100 100">
  <circle cx="55.73" cy="77.54" r="2.46" fill="${color}" />
  <circle cx="67.78" cy="77.54" r="2.46" fill="${color}" />
  <path d="M55.4,66.05h14.82c.46,.03,.86-.32,.9-.78l2.68-9.51c.16-.5-.12-1.03-.62-1.19-.09-.03-.19-.04-.28-.04h-22.88l-.33-1.44c-.2-.64-.79-1.09-1.46-1.11h-2.41c-.82,0-1.51,.62-1.58,1.44-.08,.79,.5,1.5,1.29,1.58,.06,0,.11,0,.17,0h1.44l1.3,4.36h0l3.36,11.49c.2,.64,.78,1.08,1.44,1.11h17.39c.8,0,1.47-.58,1.58-1.36,.09-.78-.48-1.49-1.26-1.58-.06,0-.12,0-.18,0h-15.36c-.64,0-1.22-.4-1.46-1v-.11c-.23-.76,.2-1.57,.97-1.8,.16-.05,.32-.07,.49-.06Z" fill="${color}" />
  <path d="M44.25,60.7l-.44-1.58c-.96-.31-1.81-.9-2.46-1.68-2.14-2.47-1.88-6.22,.59-8.36,1.1-.96,2.52-1.47,3.99-1.45h2.33c1.95-.01,3.78,.91,4.93,2.49h6.34c-1.9-1.25-3.91-2.32-6.02-3.17-3.57-1.44-4.01-2.9-4.01-4.34,.19-1.54,.94-2.95,2.11-3.98,2.15-2.01,3.31-4.86,3.17-7.8,0-5.8-3.57-10.82-9.81-10.82s-9.81,5.02-9.81,10.82c-.04,2.92,1.11,5.73,3.17,7.8,1.25,.98,2.05,2.44,2.19,4.03,0,1.44-.55,2.9-4.01,4.34-5.36,2.12-10.27,4.75-10.38,9.51-.16,3.07,2.17,5.71,5.25,5.91h13.15l-.27-1.71Z" fill="${color}" />
</svg>`

  const customers = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<ellipse fill="var(--circle-fill, ${color})" cx="41.3" cy="42.3" rx="12.2" ry="13.5"/>
<path fill="var(--circle-fill, ${color})" d="M52.6,57.4c-3.1,2.8-7,4.5-11.3,4.5c-4.3,0-8.3-1.7-11.3-4.6c-5.5,2.5-11,5.7-11,10.7v2.1
 c0,2.5,2,4.5,4.5,4.5h35.7c2.5,0,4.5-2,4.5-4.5v-2.1C63.6,63,58.2,59.9,52.6,57.4z"/>
<path fill="var(--circle-fill, ${color})" d="M68,47.4c-0.2-0.1-0.3-0.2-0.5-0.3c-0.4-0.2-0.9-0.2-1.3,0.1c-2.1,1.3-4.6,2.1-7.2,2.1c-0.3,0-0.7,0-1,0
 c-0.5,1.3-1,2.6-1.7,3.7c0.4,0.2,0.9,0.3,1.4,0.6c5.7,2.5,9.7,5.6,12.5,9.8H75c2.2,0,4-1.8,4-4v-1.9C79,52.6,73.3,49.6,68,47.4z"/>
<path fill="var(--circle-fill, ${color})" d="M66.9,34.2c0-4.9-3.6-8.9-7.9-8.9c-2.2,0-4.1,1-5.6,2.5c3.5,3.6,5.7,8.7,5.7,14.4c0,0.3,0,0.5,0,0.8
 C63.4,43,66.9,39.1,66.9,34.2z"/>
</svg>`

  const event = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px"
  viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">

<g>
 <g>
   <path fill="${color}" d="M76,42H24c-1.1,0-2,0.9-2,2v30c0,3.3,2.7,6,6,6h44c3.3,0,6-2.7,6-6V44C78,42.9,77.1,42,76,42z M40,70
     c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V70z M40,56c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4
     c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V56z M54,70c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V70z
      M54,56c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V56z M68,70c0,1.1-0.9,2-2,2h-4
     c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V70z M68,56c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4
     c1.1,0,2,0.9,2,2V56z"/>
 </g>
 <g>
   <path fill="${color}" d="M72,26h-5v-2c0-2.2-1.8-4-4-4s-4,1.8-4,4v2H41v-2c0-2.2-1.8-4-4-4s-4,1.8-4,4v2h-5c-3.3,0-6,2.7-6,6v2
     c0,1.1,0.9,2,2,2h52c1.1,0,2-0.9,2-2v-2C78,28.7,75.3,26,72,26z"/>
 </g>
</g>
</svg>
`

  const gform = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="30px" height="30px" viewBox="0 0 56 64" enable-background="new 0 0 56 64" xml:space="preserve">
<path fill="#5A1BA9" d="M5.113-0.026c-2.803,0-5.074,2.272-5.074,5.074v53.841c0,2.803,2.271,5.074,5.074,5.074h45.773
 c2.801,0,5.074-2.271,5.074-5.074V20.284L37.059-0.026C37.059-0.026,5.113-0.026,5.113-0.026z"/>
<path fill="#300B60" d="M55.977,20.352v1H43.178c0,0-6.312-1.26-6.129-6.707c0,0,0.208,5.707,6.004,5.707H55.977z"/>
<path fill="#AD7BEE" enable-background="new    " d="M37.074,0v14.561c0,1.656,1.104,5.791,6.104,5.791h12.799
 L37.074,0z"/>
<path fill="${color}" d="M12.739,39.41c0-0.4-0.3-0.7-0.7-0.7h-1.3c-0.4,0-0.7,0.3-0.7,0.7v1.3c0,0.4,0.3,0.7,0.7,0.7h1.3
 c0.4,0,0.7-0.3,0.7-0.7V39.41z M31.539,39.41c0-0.4-0.3-0.7-0.7-0.7h-15.7c-0.4,0-0.7,0.3-0.7,0.7v1.3c0,0.4,0.3,0.7,0.7,0.7h15.7
 c0.4,0,0.7-0.3,0.7-0.7V39.41z M12.739,45.71c0-0.4-0.3-0.7-0.7-0.7h-1.3c-0.4,0-0.7,0.3-0.7,0.7v1.3c0,0.4,0.3,0.7,0.7,0.7h1.3
 c0.4,0,0.7-0.3,0.7-0.7V45.71z M31.539,45.71c0-0.4-0.4-0.7-0.8-0.7h-15.5c-0.4,0-0.8,0.3-0.8,0.7v1.3c0,0.4,0.4,0.7,0.8,0.7h15.5
 c0.4,0,0.8-0.3,0.8-0.7V45.71z M12.739,51.91c0-0.4-0.3-0.7-0.7-0.7h-1.3c-0.4,0-0.7,0.3-0.7,0.7v1.3c0,0.4,0.3,0.7,0.7,0.7h1.3
 c0.4,0,0.7-0.3,0.7-0.7V51.91z M31.539,51.91c0-0.4-0.3-0.7-0.7-0.7h-15.7c-0.4,0-0.7,0.3-0.7,0.7v1.3c0,0.4,0.3,0.7,0.7,0.7h15.7
 c0.4,0,0.7-0.3,0.7-0.7V51.91z"/>
</svg>`

  const log_event = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 100 100" xml:space="preserve">
<g>
	<path fill="${color}" d="M38.7,40.2l-4.8,1.6C33.5,41.9,33,42,32.6,42c-1.4,0-2.8-0.7-3.7-1.8c-0.9-1.1-1.1-2.7-0.8-4.1l1.6-5.7
		l7.5-7.5c0.3-0.3,0.1-0.9-0.4-0.9H5.5C4.7,22,4,22.7,4,23.5V42c0,2.2,1.8,4,4,4h28c2.2,0,4-1.8,4-4v-0.8C40,40.5,39.3,40,38.7,40.2
		z"/>
	<path fill="${color}" d="M5.5,18h33c0.8,0,1.5-0.7,1.5-1.5V14c0-2.2-1.8-4-4-4h-3V9c0-1.6-1.3-3-3-3H30c-1.6,0-3,1.3-3,3v1H17V9
		c0-1.6-1.3-3-3-3H14c-1.6,0-3,1.3-3,3v1H8c-2.2,0-4,1.8-4,4v2.5C4,17.3,4.7,18,5.5,18z"/>
	<path fill="${color}" d="M43.5,23.1c-0.2-0.2-0.5-0.2-0.7,0l-9.4,9.4L32,37.2c-0.1,0.5,0.3,0.9,0.8,0.8l4.7-1.4l9.4-9.4
		c0.2-0.2,0.2-0.5,0-0.7L43.5,23.1z"/>
	<path fill="${color}" d="M51.5,20.2l-1.8-1.8c-0.6-0.6-1.7-0.6-2.4,0c0,0-1.1,1.1-1.6,1.7c-0.2,0.2-0.2,0.5,0,0.7l3.4,3.4
		c0.2,0.2,0.5,0.2,0.7,0c0.6-0.6,1.7-1.6,1.7-1.6C52.2,22,52.2,20.9,51.5,20.2z"/>
</g>
</svg>
`

  const new_case = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 100 100" xml:space="preserve">
<g>
 <path fill="${color}" d="M15,13h4c0.6,0,1-0.4,1-1v-2h12v2c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1V9.5c0-3-2.5-5.5-5.5-5.5H19.4
   c-3,0-5.4,2.4-5.4,5.4V12C14,12.6,14.4,13,15,13z"/>
 <path fill="${color}" d="M46,17H6c-2.2,0-4,1.8-4,4v23c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4V21C50,18.8,48.2,17,46,17z"/>
</g>
</svg>
`

  const new_child_case = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 100 100" xml:space="preserve">
<g>
	<path fill="${color}" d="M15,11h4c0.6,0,1-0.4,1-1V8h10v2c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1V7.5c0-3-2.5-5.5-5.5-5.5H19.4
		c-3,0-5.4,2.4-5.4,5.4V10C14,10.6,14.4,11,15,11z"/>
	<path fill="${color}" d="M32,34h2v-2c0-2.2,1.8-4,4-4h6c1.3,0,2.4,0.6,3.1,1.5c0.3,0.4,0.9,0.1,0.9-0.3V19c0-2.2-1.8-4-4-4H6
		c-2.2,0-4,1.8-4,4v23c0,2.2,1.8,4,4,4h21.8c0.4,0,0.6-0.3,0.5-0.7C28.1,44.9,28,44.5,28,44v-6C28,35.8,29.8,34,32,34z"/>
	<path fill="${color}" d="M48.5,38H44v-4.5c0-0.8-0.7-1.5-1.5-1.5h-3c-0.8,0-1.5,0.7-1.5,1.5V38h-4.5c-0.8,0-1.5,0.7-1.5,1.5v3
		c0,0.8,0.7,1.5,1.5,1.5H38v4.5c0,0.8,0.7,1.5,1.5,1.5h3c0.8,0,1.5-0.7,1.5-1.5V44h4.5c0.8,0,1.5-0.7,1.5-1.5v-3
		C50,38.7,49.3,38,48.5,38z"/>
</g>
</svg>
`

  const opportunity_contact_role = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<g display="none">
 <path display="inline" opacity="0.2" fill="#FFFFFF" enable-background="new" d="M84.6,0H80H20h-6.2H0v100h13h7h60h7.3H100V0
   H84.6z M20,80V20h60v60H20z"/>
</g>
<g display="none">
 
   <rect x="20.1" y="20.1" display="inline" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="59.8"/>
</g>
<g display="none">
 <g display="inline" opacity="0.5">
   <line fill="none" stroke-width="0.25" stroke-miterlimit="10" x1="79.9" y1="20.1" x2="20.1" y2="79.9"/>
   <line fill="none" stroke-width="0.25" stroke-miterlimit="10" x1="20.1" y1="20.1" x2="79.9" y2="79.9"/>
   <g>
     <rect x="20.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="22.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="24.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="26.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="28.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="30.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="32.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="34.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="36.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="38.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="40" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="42" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="44" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="46" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="48" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="50" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="52" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="54" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="56" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="58" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="60" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="62" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="63.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="65.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="67.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="69.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="71.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="73.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="75.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
     <rect x="20.1" y="77.9" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="59.8" height="2"/>
   </g>
   <g>
     <rect x="20.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="22.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="24.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="26.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="28.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="30.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="32.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="34.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="36.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="38.1" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="40" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="42" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="44" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="46" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="48" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="50" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="52" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="54" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="56" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="58" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="60" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="62" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="63.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="65.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="67.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="69.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="71.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="73.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="75.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
     <rect x="77.9" y="20.1" fill="none" stroke-width="0.25" stroke-miterlimit="10" width="2" height="59.8"/>
   </g>
 </g>
</g>
<path fill="${color}" d="M64.9,47.4c-8.2,0-15,6.7-15,15c0,8.2,6.7,15,15,15s15-6.7,15-15S73.1,47.4,64.9,47.4z M72.2,60.5l-2.8,2.8
 c-0.3,0.3-0.4,0.6-0.4,0.8l0.7,4.2c0.2,1.2-0.9,0.5-0.9,0.5L65.4,67c-0.5-0.3-1,0-1,0l-3.5,1.8c-0.9,0.5-0.9,0-0.9-0.4l0.7-3.9
 c0.1-0.8-0.3-1.1-0.3-1.2l-2.5-2.4l-0.3-0.3c-0.3-0.3-0.5-0.8,0.6-1l3.5-0.5c0.5-0.1,0.8-0.3,0.9-0.5l1.9-3.9
 c0.1-0.3,0.5-0.6,0.9,0.2l1.9,3.8c0.1,0.2,0.4,0.3,0.6,0.4h0.3l3.7,0.5H72C72.2,59.7,72.9,59.9,72.2,60.5z"/>
<path fill="${color}" d="M48.9,77.2c1,0,1.6-1.2,1-2c-3.2-3.6-5-8.2-5-13c0-3.4,1.1-7.2,2.9-10.2c2.1-3.6,4.5-5.1,6.4-7.9
 c3.1-4.6,3.7-11.2,1.7-16.2c-2-5.1-6.7-8.1-12.2-8s-10,3.5-11.7,8.6c-2,5.6-1.1,12.4,3.4,16.6c1.9,1.7,3.5,4.4,2.6,7
 c-0.2,0.5-0.8,1.3-2.2,1.9c-5.7,2.5-11.5,5.5-14.1,9.7c-0.5,0.8-1.5,2.8-1.6,5.6l0,0c0,0.7,0,1.3,0.1,2.2c0,0.4,0,0.4,0.1,0.8
 c0.3,1.7,1.3,3.2,2.8,4.1c0.6,0.3,2,0.8,4.7,0.8H48.9z"/>
</svg>
`

  const instructorMenu = {
    title: "Instructor",
    icon: <FcPodiumWithSpeaker size={25} className="icon-left" />,
    children: [
      {
        // icon: <img src={service_appointment} className="svg-icons" />,
        // icon: (
        //   <img
        //     src={`data:image/svg+xml;utf8,${encodeURIComponent(
        //       service_appointment
        //     )}`}
        //     className="svg-icons"
        //   />
        // ),
        icon: (
          <FcOvertime
            size={25}
            style={{
              marginLeft: "5px",
              marginRight: "3px",
            }}
          />
        ),

        title: "Schedule",
        link: "/instructor/schedule",
      },
      {
        // icon: (
        //   <img
        //     src={`data:image/svg+xml;utf8,${encodeURIComponent(upload)}`}
        //     className="svg-icons"
        //     style={{
        //       marginLeft: "5px",
        //       marginRight: "5px",
        //       marginBottom: "8px",
        //     }}
        //   />
        // ),
        icon: (
          <FcMultipleCameras
            size={25}
            style={{
              marginLeft: "5px",
              marginRight: "3px",
            }}
          />
        ),
        title: "Upload Event Media",
        link: "/instructor/upload-media",
      },
      {
        // icon: (
        //   <img
        //     src={`data:image/svg+xml;utf8,${encodeURIComponent(note)}`}
        //     className="svg-icons"
        //   />
        // ),
        icon: (
          <FcVoicePresentation
            size={25}
            style={{
              marginLeft: "5px",
              marginRight: "3px",
            }}
          />
        ),
        title: "Assign Notes",
        link: "/instructor/assign-notes",
      },
      {
        // icon: (
        //   <img
        //     src={`data:image/svg+xml;utf8,${encodeURIComponent(note)}`}
        //     className="svg-icons"
        //   />
        // ),
        icon: (
          <FcDisclaimer
            size={25}
            style={{
              marginLeft: "5px",
              marginRight: "3px",
            }}
          />
        ),

        title: "Attendance",
        link: "/instructor/attendance",
      },
    ],
  }

  const adminMenu = [
    {
      title: "Dashboard",
      icon: <FcComboChart size={25} className="icon-left" />,
      link: "/dashboard",
    },
    {
      title: "User Management",
      icon: <FcPortraitMode size={25} className="icon-left" />,
      link: "/users",
    },
    {
      title: "Guest Management",
      icon: <FcReadingEbook size={25} className="icon-left" />,
      children: [
        {
          // icon: (
          //   <img
          //     src={`data:image/svg+xml;utf8,${encodeURIComponent(customers)}`}
          //     className="svg-icons"
          //   />
          // ),
          icon: (
            <FcConferenceCall
              size={20}
              style={{
                marginLeft: "5px",
                marginRight: "3px",
              }}
            />
          ),
          title: "Guests",
          link: "/guests/create-guest",
        },
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                coupon_codes
              )}`}
              className="svg-icons"
            />
          ),
          title: "Vouchers",
          link: "/guests/create-voucher",
        },
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(custom31)}`}
              className="svg-icons"
            />
          ),
          title: "Vehicles",
          link: "/guests/create-vehicle",
        },
      ],
    },
    {
      title: "Administration",
      icon: <FcServices size={25} className="icon-left" />,
      children: [
        {
          title: "Settings",
          icon: <FcEngineering size={20} className="icon-left" />,
          children: [
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    new_case
                  )}`}
                  className="svg-icons"
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    marginBottom: "8px",
                  }}
                />
              ),
              title: "Manage Event Types",
              link: "/manage/types",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    new_child_case
                  )}`}
                  className="svg-icons"
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    marginBottom: "8px",
                  }}
                />
              ),
              title: "Manage Event Categories",
              link: "/manage/categories",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    log_event
                  )}`}
                  className="svg-icons "
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    // marginBottom: "8px",
                  }}
                />
              ),
              title: "Manage Event Activities",
              link: "/manage/activities",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(canvas)}`}
                  className="svg-icons "
                />
              ),
              title: "Manage Guest Interests List",
              link: "/manage/interests-list",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    opportunity_contact_role
                  )}`}
                  className="svg-icons "
                />
              ),
              title: "Manage Guest Types",
              link: "/manage/guest-types",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(canvas)}`}
                  className="svg-icons "
                />
              ),
              title: "Manage Conference Rooms",
              link: "/manage/conference-room",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    opportunity_contact_role
                  )}`}
                  className="svg-icons "
                />
              ),
              title: "Manage HOB",
              link: "/manage/hob",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    location
                  )}`}
                  className="svg-icons "
                />
              ),
              title: "Manage Region",
              link: "/manage/region",
            },
            {
              icon: (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    location
                  )}`}
                  className="svg-icons "
                />
              ),
              title: "Manage Compliments",
              link: "/manage/compliment",
            },
          ],
        },
        {
          // icon: (
          //   <img
          //     src={`data:image/svg+xml;utf8,${encodeURIComponent(custom31)}`}
          //     className="svg-icons"
          //   />
          // ),
          icon: (
            <MdCarRental
              size={25}
              style={{
                marginLeft: "5px",
                marginRight: "3px",
              }}
            />
          ),
          title: "BEC Fleet",
          link: "/manage/bec-fleet",
        },
        {
          // icon: (
          //   <img
          //     src={`data:image/svg+xml;utf8,${encodeURIComponent(pdf)}`}
          //     className="svg-icons"
          //   />
          // ),
          icon: (
            <FcRules
              size={25}
              style={{
                marginLeft: "5px",
                marginRight: "3px",
              }}
            />
          ),
          title: "Indemnity Forms",
          link: "/manage/indemnity-forms",
        },
        {
          // icon: (
          //   <img
          //     src={`data:image/svg+xml;utf8,${encodeURIComponent(gform)}`}
          //     className="svg-icons"
          //   />
          // ),
          icon: (
            <FcSurvey
              size={25}
              style={{
                marginLeft: "5px",
                marginRight: "3px",
              }}
            />
          ),
          title: "Feedback Form",
          link: "/manage/feedback-forms",
        },
      ],
    },
    {
      title: "Event Management",
      icon: <FcPlanner size={25} className="icon-left" />,
      children: [
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(event)}`}
              className="svg-icons"
            />
          ),
          title: "Events",
          link: "/event/events-list",
        },
        // {
        //   icon: (
        //     <img
        //       src={`data:image/svg+xml;utf8,${encodeURIComponent(customer)}`}
        //       className="svg-icons"
        //     />
        //   ),
        //   title: "Add Guests",
        //   link: "/event/guests",
        // },
        // {
        //   icon: (
        //     <img
        //       src={`data:image/svg+xml;utf8,${encodeURIComponent(custom31)}`}
        //       className="svg-icons"
        //     />
        //   ),
        //   title: "Assign Vehicles",
        //   link: "/event/vehicles",
        // },
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(custom38)}`}
              className="svg-icons"
            />
          ),
          title: "Event Media",
          link: "/event/media",
        },
      ],
    },
  ]

  const userMenu = [
    {
      title: "Dashboard",
      icon: <FcComboChart size={25} className="icon-left" />,
      link: "/dashboard",
    },
    {
      title: "User Management",
      icon: <FcPortraitMode size={25} className="icon-left" />,
      link: "/users",
    },
    {
      title: "Guest Management",
      icon: <FcReadingEbook size={25} className="icon-left" />,
      children: [
        {
          // icon: (
          //   <img
          //     src={`data:image/svg+xml;utf8,${encodeURIComponent(customers)}`}
          //     className="svg-icons"
          //   />
          // ),
          icon: (
            <FcConferenceCall
              size={20}
              style={{
                marginLeft: "5px",
                marginRight: "3px",
              }}
            />
          ),
          title: "Guests",
          link: "/guests/create-guest",
        },
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                coupon_codes
              )}`}
              className="svg-icons"
            />
          ),
          title: "Vouchers",
          link: "/guests/create-voucher",
        },
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(custom31)}`}
              className="svg-icons"
            />
          ),
          title: "Vehicles",
          link: "/guests/create-vehicle",
        },
      ],
    },
    {
      title: "Event Management",
      icon: <FcPlanner size={25} className="icon-left" />,
      children: [
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(event)}`}
              className="svg-icons"
            />
          ),
          title: "Events",
          link: "/event/events-list",
        },
        // {
        //   icon: (
        //     <img
        //       src={`data:image/svg+xml;utf8,${encodeURIComponent(customer)}`}
        //       className="svg-icons"
        //     />
        //   ),
        //   title: "Add Guests",
        //   link: "/event/guests",
        // },
        // {
        //   icon: (
        //     <img
        //       src={`data:image/svg+xml;utf8,${encodeURIComponent(custom31)}`}
        //       className="svg-icons"
        //     />
        //   ),
        //   title: "Assign Vehicles",
        //   link: "/event/vehicles",
        // },
        {
          icon: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(custom38)}`}
              className="svg-icons"
            />
          ),
          title: "Event Media",
          link: "/event/media",
        },
      ],
    },
  ]

  const guestMenu = [
    {
      title: "Register",
      icon: (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(add_contact)}`}
          className="svg-icons"
          style={{
            marginLeft: "5px",
            marginRight: "10px",
            // marginBottom: "8px",
          }}
        />
      ),
      link: "/guest/register/",
    },
    {
      title: "Check-in",
      icon: (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(checkin)}`}
          className="svg-icons"
          style={{
            marginLeft: "5px",
            marginRight: "10px",
            // marginBottom: "8px",
          }}
        />
      ),
      link: "/guest/check-in/",
    },
    {
      title: "Feedback",
      icon: (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(feedback)}`}
          className="svg-icons"
          style={{ marginRight: "5px" }}
        />
      ),
      link: "/guest/feedback/",
    },
    {
      title: "Rate",
      icon: (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(rating)}`}
          className="svg-icons"
          style={{
            marginLeft: "5px",
            marginRight: "10px",
            // marginBottom: "8px",
          }}
        />
      ),
      link: "/guest/rate/",
    },
  ]

  const adminInstructoMenu = [...adminMenu, instructorMenu]
  const userInstructorMenu = [...userMenu, instructorMenu]

  useEffect(() => {
    if (id) {
      if (!role) {
        setguestCode(id)
      }
    }
  }, [id])

  let menus =
    role && role === "admin"
      ? instructor == 1
        ? adminInstructoMenu
        : adminMenu
      : role === "user"
      ? instructor == 1
        ? userInstructorMenu
        : userMenu
      : guestMenu

  const renderMenuItems = (menuItems, submenu) => {
    return menuItems.map((menu, index) => (
      <Fragment key={index}>
        {!menu.children ? (
          <Link
            // key={menu.link}
            to={`${menu.link}${guestCode}`}
            className={classNames("nav-link", {
              active: `${menu.link}${guestCode}` === activeTab,
              "dropdown-item": submenu === "submenu",
            })}
            onClick={() => {
              setActiveTab(`${menu.link}${guestCode}`)
              hideSidebar()
            }}
          >
            {menu.icon}
            <span className="text">{menu.title}</span>
          </Link>
        ) : (
          <div className="sidebar-item" key={menu.title}>
            <span
              className="nav-link d-flex w-100"
              onClick={() => {
                handleDropdownToggle(index, submenu)
              }}
              aria-controls="example-collapse-text"
              aria-expanded={openStates[index]}
            >
              {menu.icon}
              <span className="text">{menu.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={openStates[index] ? "icon-right open" : "icon-right"}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
                />
              </svg>
            </span>

            <Collapse in={openStates[index]}>
              <div>{renderMenuItems(menu.children, "submenu")}</div>
            </Collapse>
          </div>
        )}
      </Fragment>
    ))
  }

  const [openStates, setOpenStates] = useState([])
  const [activeTab, setActiveTab] = useState("")
  const [indexState, setIndex] = useState(null)

  const handleDropdownToggle = (index, submenu) => {
    if (indexState !== index) {
      let newOpenStates = []
      if (submenu == "submenu") {
        newOpenStates = [...openStates]
      }
      newOpenStates[index] = !newOpenStates[index]
      setIndex(index)
      setOpenStates(newOpenStates)
    } else {
      let newOpenStates = [...openStates]
      newOpenStates[index] = !newOpenStates[index]
      setIndex(index)
      setOpenStates(newOpenStates)
    }
  }

  return (
    <aside className="sidebar-wrapper">
      <button className="sidebar-bg d-xl-none" onClick={hideSidebar}></button>
      <div className="sidebar-inner">
        <div className="logo-wrapper">
          <img
            alt="logo"
            src={logo}
            width={100}
            height={40}
            className="object-fit-contain sidebar-logo-img"
          />
        </div>
        <hr />
        <div className="menu-list">
          {menus.length && renderMenuItems(menus, "menus")}
        </div>
      </div>
    </aside>
  )
}

export default SideBar
