import { useCurrentFrame } from "remotion"
import React from "react"

type Step = 
  | { duration: number; title: string }
  | { duration: number; type: "code" | "terminal" }

export function ProgressBar({
  steps,
}: {
  steps: Step[]
}) {
  const frame = useCurrentFrame()

  let currentStart = 0
  let currentIndex = 0
  let nextStart = steps[currentIndex]?.duration || 0
  while (nextStart <= frame && currentIndex < steps.length - 1) {
    currentIndex++
    currentStart = nextStart
    nextStart += steps[currentIndex].duration
  }
  const currentStepProgress =
    steps[currentIndex]?.duration > 0
      ? (frame - currentStart) / steps[currentIndex].duration
      : 0

  // Check if this is a code/terminal type progress bar
  const isCodeTerminalType = steps.length > 0 && "type" in steps[0]

  if (isCodeTerminalType) {
    // Code/Terminal progress bar - following exact code pattern
    const codeSteps = steps.filter((s) => "type" in s && s.type === "code")
    const terminalSteps = steps.filter((s) => "type" in s && s.type === "terminal")
    
    const codeDuration = codeSteps.reduce((acc, s) => acc + s.duration, 0)
    const terminalDuration = terminalSteps.reduce((acc, s) => acc + s.duration, 0)

    // Find current step type
    const currentStep = steps[currentIndex]
    const currentType = "type" in currentStep ? currentStep.type : null

    // Calculate code progress - following code pattern exactly
    let codeProgressWidth = "0%"
    if (currentType === "code") {
      // Currently in a code step - show progress
      codeProgressWidth = currentStepProgress * 100 + "%"
    } else {
      // Check if we've passed all code steps
      let codeFramesPassed = 0
      let videoFrame = 0
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        if ("type" in step && step.type === "code") {
          if (frame >= videoFrame + step.duration) {
            // We've passed this code step completely
            codeFramesPassed += step.duration
          } else if (frame > videoFrame) {
            // We're past the start but not past the end - this shouldn't happen if currentType is not code
            break
          }
        }
        videoFrame += step.duration
      }
      // If we've passed all code frames, show 100%
      if (codeFramesPassed >= codeDuration) {
        codeProgressWidth = "100%"
      }
    }

    // Calculate terminal progress - following code pattern exactly
    let terminalProgressWidth = "0%"
    if (currentType === "terminal") {
      // Currently in a terminal step - show progress
      terminalProgressWidth = currentStepProgress * 100 + "%"
    } else {
      // Check if we've passed all terminal steps
      let terminalFramesPassed = 0
      let videoFrame = 0
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        if ("type" in step && step.type === "terminal") {
          if (frame >= videoFrame + step.duration) {
            // We've passed this terminal step completely
            terminalFramesPassed += step.duration
          } else if (frame > videoFrame) {
            // We're past the start but not past the end - this shouldn't happen if currentType is not terminal
            break
          }
        }
        videoFrame += step.duration
      }
      // If we've passed all terminal frames, show 100%
      if (terminalFramesPassed >= terminalDuration) {
        terminalProgressWidth = "100%"
      }
    }

    return (
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 120,
          right: 120,
          display: "flex",
          gap: 6,
        }}
      >
        {/* Code progress */}
        <div
          style={{
            display: "flex",
            flex: codeDuration,
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 26,
              color: currentType === "code" ? "#fff" : "#fffa",
            }}
          >
            Code
          </div>
          <div
            style={{
              backgroundColor: "#fff2",
              borderRadius: 6,
              overflow: "hidden",
              height: 10,
              width: "100%",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#fffb",
                borderRadius: 6,
                width: codeProgressWidth,
              }}
            />
          </div>
        </div>

        {/* Terminal progress */}
        <div
          style={{
            display: "flex",
            flex: terminalDuration,
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 26,
              color: currentType === "terminal" ? "#fff" : "#fffa",
            }}
          >
            Terminal
          </div>
          <div
            style={{
              backgroundColor: "#fff2",
              borderRadius: 6,
              overflow: "hidden",
              height: 10,
              width: "100%",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#4caf50", // Green color for terminal
                borderRadius: 6,
                width: terminalProgressWidth,
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Regular step-based progress bar (for code composition)
  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: 120,
        right: 120,
        display: "flex",
        gap: 6,
      }}
    >
      {steps.map((step, index) => {
        const stepWithTitle = step as { duration: number; title: string }
        const isCurrent = index === currentIndex
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flex: stepWithTitle.duration,
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 26,
                color: isCurrent ? "#fff" : "#fffa",
              }}
            >
              {stepWithTitle.title}
            </div>
            <div
              style={{
                backgroundColor: "#fff2",
                borderRadius: 6,
                overflow: "hidden",
                height: 10,
                width: "100%",
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#fffb",
                  borderRadius: 6,
                  width:
                    index > currentIndex
                      ? 0
                      : isCurrent
                      ? currentStepProgress * 100 + "%"
                      : "100%",
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

