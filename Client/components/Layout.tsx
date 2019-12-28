import React from 'react'
import Nav from './nav/Nav'
import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Next App' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
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
