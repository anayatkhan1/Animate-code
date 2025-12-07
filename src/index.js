import { registerRoot } from "remotion"

import AnimateCode from "./compositions/animate-code"
import CodeWithTerminal from "./compositions/code-with-terminal"

registerRoot(function RemotionRoot() {
  return (
    <>
      <AnimateCode />
      <CodeWithTerminal />
    </>
  )
})
