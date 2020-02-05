import React from 'react'
import Layout from '../components/Layout'
import { Button } from 'antd'

const index: React.FC = () => (
  <Layout>
    <div id="landingPage">
      <div id="topTitle">
        <h1 id="landingHeader"> Macros</h1>
      </div>
      <div id="landingButtons">
        <Button type="primary" shape="round">
          Login In
        </Button>
        <Button type="primary" shape="round">
          Sign Up
        </Button>
      </div>
      <form id="logInForm">
        <input type="text"></input>
        <input type="text"></input>
        <button type="submit">Log in</button>
      </form>
      <h3>Don't have an account?</h3>
      <button type="button">Sign up</button>
      <style jsx>{`
        #landingHeader {
          text-align: center;
        }
        #landingButtons {
          display: flex;
          flex-direction: column;
        }
        #landingButtons button {
          margin: 4rem;
        }
      `}</style>
    </div>
  </Layout>
)

export default index
