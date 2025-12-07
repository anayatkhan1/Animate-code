/**
 * Example usage of WindowFrame component
 * 
 * This file demonstrates how to use the WindowFrame component
 * in different scenarios. You can copy these patterns for your own compositions.
 */

import React from "react"
import { AbsoluteFill, Composition, Sequence } from "remotion"
import { WindowFrame } from "./window-frame"

// ============================================================================
// Example 1: Basic usage with custom content
// ============================================================================
export function BasicExample() {
  return (
    <WindowFrame>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D1117",
        }}
      >
        <div style={{ color: "white", fontSize: 24 }}>
          Your content here
        </div>
      </AbsoluteFill>
    </WindowFrame>
  )
}

// ============================================================================
// Example 2: Custom styling
// ============================================================================
export function CustomStyledExample() {
  return (
    <WindowFrame
      borderColor="#ff5f57"
      borderWidth={2}
      borderRadius={12}
      backgroundColor="#1e1e1e"
      showControls={true}
      paddingTop={40}
      outerBackgroundColor="#000000"
      outerPadding={30}
    >
      <AbsoluteFill style={{ backgroundColor: "#1e1e1e" }}>
        {/* Your content */}
      </AbsoluteFill>
    </WindowFrame>
  )
}

// ============================================================================
// Example 3: Without window controls
// ============================================================================
export function NoControlsExample() {
  return (
    <WindowFrame
      showControls={false}
      borderColor="#333"
      borderRadius={0}
    >
      <AbsoluteFill style={{ backgroundColor: "#0D1117" }}>
        {/* Your content */}
      </AbsoluteFill>
    </WindowFrame>
  )
}

// ============================================================================
// Example 4: Full composition example
// ============================================================================
export function FullCompositionExample() {
  return (
    <Composition
      id="Example"
      component={ExampleVideo}
      durationInFrames={300}
      fps={60}
      width={1920}
      height={1080}
    />
  )
}

function ExampleVideo() {
  return (
    <WindowFrame
      borderColor="#2d2d2d"
      borderWidth={1}
      borderRadius={8}
      backgroundColor="#0D1117"
      showControls={true}
    >
      <AbsoluteFill style={{ backgroundColor: "#0D1117" }}>
        {/* Your sequences, animations, etc. */}
        <Sequence from={0} durationInFrames={300}>
          <div style={{ color: "white", padding: 40 }}>
            Your animated content
          </div>
        </Sequence>
      </AbsoluteFill>
    </WindowFrame>
  )
}


