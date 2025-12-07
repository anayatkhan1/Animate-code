# Utils & Helpers

This directory contains reusable components and utilities for Remotion compositions.

## WindowFrame Component

A reusable component that wraps content with a macOS-style window frame, including traffic light buttons (red, yellow, green) and customizable borders.

### Features

- ✅ macOS-style window controls (red, yellow, green buttons)
- ✅ Customizable border (color, width, radius)
- ✅ Customizable background colors
- ✅ Optional window controls
- ✅ Proper spacing for content
- ✅ Works seamlessly with Remotion's `AbsoluteFill` and `Sequence` components

### Usage

```tsx
import { WindowFrame } from "../../utils/window-frame"
import { AbsoluteFill, Sequence } from "remotion"

function MyVideo() {
  return (
    <WindowFrame
      borderColor="#2d2d2d"
      borderWidth={1}
      borderRadius={8}
      backgroundColor="#0D1117"
      showControls={true}
      paddingTop={40}
    >
      <AbsoluteFill style={{ backgroundColor: "#0D1117" }}>
        {/* Your content here */}
        <Sequence from={0} durationInFrames={300}>
          <div>Content</div>
        </Sequence>
      </AbsoluteFill>
    </WindowFrame>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to wrap inside the window frame |
| `borderColor` | `string` | `"#2d2d2d"` | Color of the window border |
| `borderWidth` | `number` | `1` | Width of the window border in pixels |
| `borderRadius` | `number` | `8` | Border radius for rounded corners |
| `backgroundColor` | `string` | `"transparent"` | Background color of the window |
| `showControls` | `boolean` | `true` | Whether to show macOS-style window controls |
| `paddingTop` | `number` | `40` | Top padding to account for window controls |
| `outerBackgroundColor` | `string` | `"#1a1a1a"` | Background color outside the window |
| `outerPadding` | `number` | `20` | Padding around the window |

### Examples

See `window-frame.example.tsx` for more usage examples.


