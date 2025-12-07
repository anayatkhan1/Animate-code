# Remotion Code Animation

Create beautiful animated code videos using [Remotion](https://remotion.dev) and [CodeHike](https://codehike.org). Perfect for tutorials, demos, and showcasing code changes.

<table>
  <tr>
    <td>
      <video src="https://github.com/user-attachments/assets/769f5366-d3c2-4d98-8fde-e0bd359ea1c0"
             width="300"
             controls>
      </video>
    </td>
    <td>
      <video src="https://github.com/user-attachments/assets/99a8ca22-64a7-449a-9a08-2da393da9c3d"
             width="300"
             controls>
      </video>
    </td>
  </tr>
</table>


## ✨ Features

- 🎬 **Animated Code Transitions** - Smooth token-by-token animations between code states
- 🖥️ **Terminal Support** - Display code changes alongside terminal output
- 📊 **Progress Bar** - Visual progress indicator for multi-step animations
- 🪟 **Window Frame UI** - macOS-style window frame with controls
- 🎨 **Syntax Highlighting** - Powered by CodeHike with GitHub Dark theme
- 📝 **Markdown-Based** - Define animations using simple markdown syntax
- ⚡ **Flexible Compositions** - Multiple composition types for different use cases

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Basic knowledge of React and Remotion

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-video

# Install dependencies
npm install

# Start the Remotion Studio
npm start
```

The Remotion Studio will open at `http://localhost:3000` where you can preview and edit your compositions.

## 📖 Usage

### Available Compositions

This project includes two main compositions:

1. **AnimateCode** - Simple code animation with smooth transitions
2. **CodeWithTerminal** - Code animation with a terminal panel side-by-side

### Creating Your Own Video

1. **Edit the content markdown file** in the composition directory:
   - `src/compositions/animate-code/content.md`
   - `src/compositions/code-with-terminal/content.md`

2. **Define steps** using the markdown syntax:

```markdown
## !!steps Step Name

!duration 180

\`\`\`jsx ! path/to/file.ts
// Your code here
\`\`\`
```

3. **Add annotations** for highlighting:

```markdown
// !mark[3:55] 55 50
```

4. **Preview in Remotion Studio** - Open `http://localhost:3000` and select your composition

5. **Render the video**:

```bash
npm run build
```

### Markdown Syntax

#### Steps

Define animation steps using `## !!steps` followed by the step title:

```markdown
## !!steps Code
## !!steps Terminal
```

#### Duration

Set the duration (in frames) for each step:

```markdown
!duration 180
```

#### Code Blocks

Include code blocks with file paths:

```markdown
```jsx ! app/cart/actions.ts
export function myFunction() {
  // code here
}
\`\`\`
```

#### Annotations

Highlight specific lines or patterns:

```markdown
// !mark[3:55] 55 50  // Highlight lines 3-55, start at frame 55, duration 50
// !mark[/pattern/] 110  // Highlight pattern, start at frame 110
```

## 📁 Project Structure

```
my-video/
├── src/
│   ├── compositions/
│   │   ├── animate-code/          # Simple code animation
│   │   │   ├── content.md         # Markdown content
│   │   │   ├── index.jsx         # Composition definition
│   │   │   ├── code.tsx          # Code component
│   │   │   └── token-transitions.tsx
│   │   └── code-with-terminal/   # Code + Terminal animation
│   │       ├── content.md
│   │       ├── index.jsx
│   │       ├── code.tsx
│   │       ├── terminal.tsx
│   │       └── token-transitions.tsx
│   ├── utils/
│   │   ├── progress-bar.tsx      # Progress indicator
│   │   └── window-frame.tsx      # macOS-style window frame
│   └── index.js                  # Root composition registry
├── remotion.config.js            # Remotion configuration
└── package.json
```

## ⚙️ Configuration

### Remotion Config

Edit `remotion.config.js` to customize:

- **Syntax highlighting theme**: Currently set to `github-dark`
- **Studio port**: Default `3000`
- **Concurrency**: Set to `1` for stability
- **Render timeout**: `60000ms`

### Customization

#### Change Background Colors

In `src/compositions/code-with-terminal/index.jsx`:

```jsx
const backgroundColor = activeStep?.type === "terminal" ? "#0C0C0C" : "#0D1117"
```

#### Adjust Window Frame

Modify `WindowFrame` props in your composition:

```jsx
<WindowFrame
  showControls={true}
  borderColor="#2d2d2d"
  borderRadius={8}
/>
```

#### Change Animation Speed

Adjust `durationInFrames` in your code components:

```jsx
<Code
  oldCode={prevCode?.code}
  newCode={step.code}
  durationInFrames={90}  // Adjust this value
/>
```

## 🎬 Rendering Videos

### Development Preview

```bash
npm start
```

### Production Render

```bash
npm run build
```

The rendered video will be saved to `out/Anayat.mp4` (or the filename specified in your build script).

### Custom Render

```bash
npx remotion render src/index.js <CompositionId> out/video.mp4
```

## 🛠️ Development

### Adding a New Composition

1. Create a new directory in `src/compositions/`
2. Create `index.jsx` with your composition
3. Create `content.md` with your markdown content
4. Register it in `src/index.js`

### Project Scripts

- `npm start` - Start Remotion Studio
- `npm run build` - Render video to `out/Anayat.mp4`
- `npm run render` - Render with concurrency=1
- `npm run upgrade` - Upgrade Remotion

## 📚 Dependencies

- **[Remotion](https://remotion.dev)** - Create videos programmatically with React
- **[CodeHike](https://codehike.org)** - Syntax highlighting and code animations
- **[Zod](https://zod.dev)** - Schema validation for markdown parsing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Remotion](https://remotion.dev) for the amazing video framework
- [CodeHike](https://codehike.org) for syntax highlighting
- The open source community for inspiration and support

---

Made with ❤️ using Remotion and CodeHike
