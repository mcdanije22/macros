import React, { useState } from 'react'
import { Input, Button, message, Row, Col } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

interface signUpFormData {
  email: String
  userName: String
  fullName: String
  password: String
}

const signUp = () => {
  const url = process.env.DOMAIN_URL
  const [signUpForm, updateSignUpForm] = useState<signUpFormData>({
    email: '',
    userName: '',
    fullName: '',
    password: '',
  })
  const router = useRouter()

  const handleInputChange = e => {
    const name = e.target.name
    updateSignUpForm({
      ...signUpForm,
      [name]: e.target.value,
    })
  }
  const submitRegistration = () => {
    const { email, userName, fullName, password } = signUpForm
    if (
      email === '' ||
      email.length < 3 ||
      userName === '' ||
      userName.length < 3 ||
      fullName === '' ||
      password === '' ||
      password.length < 8
    ) {
      message.error('Please fill in all fields')
    } else if (!email.includes('@')) {
      message.error('please provide valid email')
    } else {
      axios
        .post(`${url}/api/users/register`, {
          email,
          userName,
          fullName,
          password,
        })
        .then(res =>
          message.success('Welcome to macros community, please login')
        )
      router.push('/login')
    }
  }
  return (
    <div id="signUpPage">
      <Head>
        <title>Sign up</title>
      </Head>
      <h1>Create an account</h1>
      <form id="signUpForm">
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <Input
              name="email"
              placeholder="Email"
              allowClear
              style={{ margin: '1rem 0' }}
              onChange={handleInputChange}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  submitRegistration()
                }
              }}
            />
            <Input
              name="userName"
              placeholder="Username"
              allowClear
              style={{ margin: '1rem 0' }}
              onChange={handleInputChange}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  submitRegistration()
                }
              }}
            />
            <Input
              name="fullName"
              placeholder="Full Name"
              allowClear
              style={{ margin: '1rem 0' }}
              onChange={handleInputChange}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  submitRegistration()
                }
              }}
            />
            <Input
              name="password"
              placeholder="Password"
              allowClear
              style={{ margin: '1rem 0' }}
              onChange={handleInputChange}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  submitRegistration()
                }
              }}
            />
            <Button
              type="primary"
              style={{ marginTop: '1rem', width: '100%' }}
              onClick={submitRegistration}
            >
              Sign up
            </Button>
          </Col>
        </Row>
      </form>
      <div id="logInOption">
        <h3>Already have an account?</h3>
        <Link href="login">
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
