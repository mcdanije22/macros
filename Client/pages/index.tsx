import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

const index: React.FC = () => {
  return (
    <div id="landingPage">
      <Head>
        <title>Macros</title>
      </Head>
      <div id="landingSection">
        <div id="landingHeader">
          <h1 style={{ color: 'white' }}>Welcome to Macros</h1>
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
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url('https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 100vh;
        }
        #landingHeader {
          text-align: center;
          font-size: 1.3rem;
          margin: 12rem 1rem 4rem 1rem;
          padding: 0 1rem;
          color: white;
        }

        #landingButtons {
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
        }
        .logButtons {
          margin: 0 6rem;
          border: 1px white solid;
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
