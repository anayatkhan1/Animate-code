import React from "react"
import { AbsoluteFill } from "remotion"

/**
 * macOS-style window control buttons
 */
function WindowControls() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 40,
        display: "flex",
        alignItems: "center",
        paddingLeft: 12,
        gap: 8,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      {/* Red button (close) */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#ff5f57",
          border: "0.5px solid rgba(0, 0, 0, 0.2)",
          boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.1)",
        }}
      />
      {/* Yellow button (minimize) */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#ffbd2e",
          border: "0.5px solid rgba(0, 0, 0, 0.2)",
          boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.1)",
        }}
      />
      {/* Green button (maximize) */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#28c840",
          border: "0.5px solid rgba(0, 0, 0, 0.2)",
          boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  )
}

/**
 * Simple WindowFrame component that just adds macOS-style buttons to the header
 * 
 * @param children - The content to wrap
 * @param showControls - Whether to show macOS-style window controls (default: true)
 */
export function WindowFrame({
  children,
  showControls = true,
}: {
  children: React.ReactNode
  showControls?: boolean
}) {
  return (
    <AbsoluteFill style={{ position: "relative" }}>
      {showControls && <WindowControls />}
      {children}
    </AbsoluteFill>
  )
}

