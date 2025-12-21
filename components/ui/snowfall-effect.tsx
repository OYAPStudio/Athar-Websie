"use client"

import Snowfall from "react-snowfall"

export function SnowfallEffect() {
  return (
    <Snowfall
      color="white"
      snowflakeCount={150}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  )
}
