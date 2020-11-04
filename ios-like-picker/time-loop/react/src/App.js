import React from "react"
import Wheel from "./Wheel"
import "./styles.css"

export default () => {
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
      <div style={{ width: 70 }}>
        <Wheel loop length={24} width={23} />
      </div>
      <div style={{ width: 70 }}>
        <Wheel loop length={60} width={23} perspective="left" />
      </div>
    </div>
  )
}
