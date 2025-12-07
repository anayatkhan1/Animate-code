import { registerRoot } from "remotion"

import Anayat from "./compositions/anayat"

registerRoot(function RemotionRoot() {
  return (
    <>

      <Anayat />
    </>
  )
})
