import { Block, HighlightedCodeBlock, parseRoot } from "codehike/blocks"
import { z } from "zod"
import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion"
import React from "react"
import { ProgressBar } from "../../utils/progress-bar"
import { Code } from "./code"
import { Terminal } from "./terminal"
import { WindowFrame } from "../../utils/window-frame"

import Content from "./content.md"
const { steps: rawSteps } = parseRoot(
  Content,
  Block.extend({
    steps: z.array(
      Block.extend({
        code: HighlightedCodeBlock,
        duration: z.string().transform((v) => parseInt(v, 10)),
      })
    ),
  })
)

// Add type based on step title
const steps = rawSteps.map((step) => ({
  ...step,
  type: step.title === "Terminal" ? "terminal" : "code",
}))

export default function RemotionRoot() {
  const duration = steps.reduce((acc, step) => acc + step.duration, 0)
  return (
    <Composition
      id="CodeWithTerminal"
      component={Video}
      defaultProps={{ steps }}
      durationInFrames={duration}
      fps={60}
      width={780}
      height={900}
    />
  )
}

function Video({ steps }) {
  const frame = useCurrentFrame()
  
  // Calculate start frames for each step
  const stepsWithFrames = steps.map((step, index) => {
    const from = steps
      .slice(0, index)
      .reduce((acc, s) => acc + s.duration, 0)
    return { ...step, from }
  })

  // Determine which step is currently active
  const activeStep = stepsWithFrames.find(
    (step) => frame >= step.from && frame < step.from + step.duration
  )
  
  // Set background color based on active step type
  const backgroundColor = activeStep?.type === "terminal" ? "#0C0C0C" : "#0D1117"

  return (
    <WindowFrame showControls={true}>
      <AbsoluteFill style={{ backgroundColor }}>
        <ProgressBar steps={steps} />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: 10,
          }}
        >
          {/* Code Panel */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {stepsWithFrames
              .filter((step) => step.type === "code")
              .map((step, index, codeSteps) => {
                const prevCodeStep =
                  index > 0 ? codeSteps[index - 1] : undefined
                return (
                  <Sequence
                    key={`code-${step.from}`}
                    from={step.from}
                    durationInFrames={step.duration}
                    name="Code"
                    style={{ padding: "16px 21px" }}
                  >
                    <Code
                      oldCode={prevCodeStep?.code}
                      newCode={step.code}
                      durationInFrames={90}
                    />
                  </Sequence>
                )
              })}
          </div>

          {/* Terminal Panel */}
          <div>
            {stepsWithFrames
              .filter((step) => step.type === "terminal")
              .map((step, index, terminalSteps) => {
                const prevTerminalStep =
                  index > 0 ? terminalSteps[index - 1] : undefined
                return (
                  <Sequence
                    key={`terminal-${step.from}`}
                    from={step.from}
                    durationInFrames={step.duration}
                    name="Terminal"
                    style={{ padding: "16px 21px" }}
                  >
                    <Terminal
                      oldCode={prevTerminalStep?.code}
                      newCode={step.code}
                      durationInFrames={190}
                    />
                  </Sequence>
                )
              })}
          </div>
        </div>
      </AbsoluteFill>
    </WindowFrame>
  )
}
