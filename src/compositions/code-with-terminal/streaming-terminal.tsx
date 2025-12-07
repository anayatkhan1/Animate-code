import React from "react"
import { useCurrentFrame, interpolate } from "remotion"
import { loadFont } from "@remotion/google-fonts/RobotoMono"

const { fontFamily } = loadFont()

export function StreamingTerminal({
  text,
  durationInFrames = 300,
}: {
  text: string
  durationInFrames?: number
}) {
  const frame = useCurrentFrame()
  
  // Calculate how many characters to show based on current frame
  const totalChars = text.length
  const charsToShow = interpolate(
    frame,
    [0, durationInFrames],
    [0, totalChars],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  )
  
  const displayedText = text.slice(0, Math.floor(charsToShow))
  
  return (
    <div
      style={{
        fontSize: 20,
        lineHeight: 1.6,
        fontFamily,
        color: "#fffa",
        width: "100%",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      <div style={{ textAlign: "center", height: "1.5rem" }}>
        Terminal
      </div>
      <div
        style={{
          fontFamily,
          color: "#fffa",
          padding: "8px 0",
        }}
      >
        {displayedText}
        {Math.floor(charsToShow) < totalChars && (
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "20px",
              backgroundColor: "#fffa",
              marginLeft: "2px",
              animation: "blink 1s infinite",
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

