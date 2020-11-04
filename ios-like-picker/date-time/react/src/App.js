import React from "react"
import { format, subDays } from "date-fns"
import Wheel from "./Wheel"
import "./styles.css"

export default () => {
  function formateDate(idx) {
    return format(subDays(new Date(), idx), "iii d LLL")
  }
  return (
    <div
      style={{
        height: "200px",
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        background: "#000",
      }}
    >
      <div style={{ width: 150 }}>
        <Wheel
          loop
          length={24}
          width={140}
          perspective="right"
          setValue={(_, idx) => formateDate(idx)}
        />
      </div>
      <div style={{ width: 70 }}>
        <Wheel loop length={24} width={23} />
      </div>
      <div style={{ width: 70 }}>
        <Wheel loop length={60} width={23} perspective="left" />
      </div>
    </div>
  )
}
