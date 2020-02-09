import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

const index: React.FC = () => {
  const [toggleStatus, setToggle] = useState<String>('')

  return (
    // <Layout>
    <div id="landingPage">
      <Head>
        <title>Macros</title>
      </Head>
      <div id="landingSection">
        <div id="landingHeader">
          <h1>Welcome to Macros</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
        </div>
        <div id="landingButtons">
          <Link href="login">
            <button type="submit" className="logButtons">
              Login In
            </button>
          </Link>
          <Link href="signup">
            <button type="submit" className="logButtons">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        #landingPage {
          display: flex;
          flex-direction: column;
        }
        #landingHeader {
          text-align: center;
          font-size: 1rem;
          margin: 12rem 1rem 4rem 1rem;
          padding: 0 1rem;
        }
        #landingButtons {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .logButtons {
          margin: 0 2rem;
          border: 1px #4086e7 solid;
          background-color: transparent;
          margin-bottom: 1.5rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
    // </Layout>
  )
}

export default index
