import React, { useState } from 'react'
import { Input, Button } from 'antd'
import Link from 'next/link'
import Head from 'next/head'

const signUp = () => {
  return (
    <div id="signUpPage">
      <Head>
        <title>Sign up</title>
      </Head>
      <h1>Join Macros</h1>
      <form id="signUpForm">
        <Input placeholder="Email" allowClear style={{ margin: '1rem 0' }} />
        <Input placeholder="Username" allowClear style={{ margin: '1rem 0' }} />
        <Input
          placeholder="Full Name"
          allowClear
          style={{ margin: '1rem 0' }}
        />
        <Input placeholder="Password" allowClear style={{ margin: '1rem 0' }} />
        <Input
          placeholder="Confirm password"
          allowClear
          style={{ margin: '1rem 0' }}
        />

        <Button type="primary" style={{ marginTop: '1rem' }}>
          Log in
        </Button>
      </form>
      <div id="logInOption">
        <h3>Already have an account?</h3>
        <Link href="">
          <h3
            style={{ marginLeft: '.2rem', color: '#438EF7', cursor: 'pointer' }}
          >
            Log in
          </h3>
        </Link>
      </div>
      <style jsx>{`
        #signUpPage h1 {
          text-align: center;
          margin: 12rem 1rem 1rem 1rem;
        }
        #signUpForm {
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
        }
        #logInOption {
          text-align: center;
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
export default signUp
