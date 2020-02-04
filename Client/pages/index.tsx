import React from 'react'
import Layout from '../components/Layout'

const index: React.FC = () => (
  <div id="landingPage">
    <div id="topTitle">
      <h1> Macros</h1>
    </div>
    <form id="logInForm">
      <input type="text"></input>
      <input type="text"></input>
      <button type="submit">Log in</button>
    </form>
    <h3>Don't have an account?</h3>
    <button type="button">Sign up</button>
    <style jsx>{``}</style>
  </div>
)

export default index
