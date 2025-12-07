// All configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config"

const chConfig = {
  syntaxHighlighting: {
    theme: "github-dark",
  },
}

const enableMdx = async (currentConfiguration) => {
  const { remarkCodeHike, recmaCodeHike } = await import("codehike/mdx")
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules
          ? currentConfiguration.module.rules
          : []),
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: "@mdx-js/loader",
              options: {
                remarkPlugins: [[remarkCodeHike, chConfig]],
                recmaPlugins: [[recmaCodeHike, chConfig]],
              },
            },
          ],
        },
      ],
    },
  }
}

Config.overrideWebpackConfig(enableMdx)
Config.setVideoImageFormat("jpeg")
Config.setStudioPort(3000)
// Let Remotion automatically find a free port for the renderer
// Config.setRendererPort(3001) // Removed to let Remotion find a free port
Config.setConcurrency(1)
// Increase timeout to prevent premature browser closure
Config.setDelayRenderTimeoutInMilliseconds(60000)
// Enable headless mode for stability
Config.setChromiumHeadlessMode(true)
