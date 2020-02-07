import React from 'react'
import Layout from '../components/Layout'

const index: React.FC = () => (
  <Layout>
    <div id="landingPage">
      <div id="landingSection">
        <div id="landingHeader">
          <h1>Welcome to Macros</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
        </div>
        <div id="landingButtons">
          <button type="submit" className="logButtons">
            Login In
          </button>
          <button type="submit" className="logButtons">
            Sign Up
          </button>
        </div>
      </div>

      {/* <form id="logInForm">
        <input type="text"></input>
        <input type="text"></input>
        <button type="submit">Log in</button>
      </form>
      <h3>Don't have an account?</h3>
      <button type="button">Sign up</button> */}
      <style jsx>{`
        #landingPage {
          display: flex;
          flex-direction: column;
        }
        #landingHeader {
          text-align: center;
          font-size: 1rem;
          margin: 8rem 0 4rem 0;
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
  </Layout>
)

export default index
