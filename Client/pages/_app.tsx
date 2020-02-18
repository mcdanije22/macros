import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { UserContext } from '../components/userContext'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState<object>({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  )
}

export default MyApp
