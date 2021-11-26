import React from "react"
import { format, subDays } from "date-fns"
import Wheel from "./Wheel"

export default () => {
  function formateDate(_relative: number, absolute: number) {
    return format(subDays(new Date(), absolute), "iii d LLL")
  }
  return (
    <div
      style={{
        height: "240px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
      }}
    >
      <div style={{ width: 180, height: 180 }}>
        <Wheel
          loop
          length={24}
          width={140}
          perspective="right"
          setValue={formateDate}
        />
      </div>
      <div style={{ width: 70, height: 180 }}>
        <Wheel loop length={24} width={23} />
      </div>
      <div style={{ width: 70, height: 180 }}>
        <Wheel loop length={60} width={23} perspective="left" />
      </div>
    </div>
  )
}
