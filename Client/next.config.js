// const withFonts = require('next-fonts')
// require('dotenv').config()

// module.exports = withFonts({
//   webpack(config, options) {
//     return config
//   },
//   env: {
//     NUTRITION_API_KEY: process.env.NUTRITION_API_KEY,
//   },
// })
const withCss = require('@zeit/next-css')
const withFonts = require('next-fonts')
require('dotenv').config()

module.exports = withCss({
  env: {
    NUTRITION_API_KEY: process.env.NUTRITION_API_KEY,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      ;(config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]),
        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
    }
    return config
  },
})
