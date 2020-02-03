import React from 'react'
import Nav from './nav/Nav'
import Head from 'next/head'
import Footer from './Footer'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Macros' }) => {
  return (
    <div>
      <Head>
        <title>{`${title} | Macros`}</title>
      </Head>
      <Nav />
      <div id="pageContent">{children}</div>
      <Footer />
      <style jsx global>{`
        html,
        body {
          height: 100%;
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
          font-weight: lighter;
          font-family: 'Darker Grotesque', sans-serif;
        }
        #pageContent {
          padding: 6rem 1rem;
          min-height: 100vh;
        }
      `}</style>
    </div>
  )
}
export default Layout
