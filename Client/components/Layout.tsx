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
          background: rgb(243, 244, 246);
          background: linear-gradient(
            352deg,
            rgba(243, 244, 246, 1) 0%,
            rgba(255, 255, 255, 1) 100%
          );
        }
      `}</style>
    </div>
  )
}
export default Layout
