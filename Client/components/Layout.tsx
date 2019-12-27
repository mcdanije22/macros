import React from 'react'
import Head from 'next/head'
import NavBar from './NavBar'

interface Props {
  title: string
}

const Layout: React.FC<Props> = ({ children, title = 'Macros' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <NavBar />
      {children}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Open Sans', sans-serif;
        }
      `}</style>
    </div>
  )
}

export default Layout
