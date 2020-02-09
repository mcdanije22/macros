import React, { useState } from 'react'
import { Input, Button } from 'antd'
import Link from 'next/link'
import Head from 'next/head'

const logIn = () => {
  return (
    <div id="logInPage">
      <Head>
        <title>Log in</title>
      </Head>
      <h1>Log into your account</h1>
      <form id="logInForm">
        <Input placeholder="Email" allowClear style={{ margin: '1rem 0' }} />
        <Input placeholder="Password" allowClear style={{ margin: '1rem 0' }} />
        <Button type="primary" style={{ marginTop: '1rem' }}>
          Log in
        </Button>
      </form>
      <div id="signUpOption">
        <h3>Don't have an account?</h3>
        <Link href="signup">
          <h3
            style={{ marginLeft: '.2rem', color: '#438EF7', cursor: 'pointer' }}
          >
            Sign up
          </h3>
        </Link>
      </div>
      <style jsx>{`
        #logInPage h1 {
          text-align: center;
          margin: 12rem 1rem 1rem 1rem;
        }
        #logInForm {
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
        }
        #signUpOption {
          text-align: center;
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
export default logIn
