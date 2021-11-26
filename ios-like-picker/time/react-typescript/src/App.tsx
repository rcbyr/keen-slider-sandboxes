import React from "react"
import Wheel from "./Wheel"
import "./styles.css"

export default () => {
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
      <div style={{ width: 70, height: 180 }}>
        <Wheel initIdx={1} length={24} width={23} loop={false} />
      </div>
      <div style={{ width: 70, height: 180 }}>
        <Wheel
          initIdx={35}
          length={60}
          width={23}
          loop={false}
          perspective="left"
        />
      </div>
    </div>
  )
}
