import React from 'react'
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <style jsx global>{`
        * {
          font-family: 'Darker Grotesque', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default MyApp
