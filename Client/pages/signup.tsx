import React, { useState } from 'react'
import { Input, Button } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

interface signUpFormData {
  email: String
  userName: String
  fullName: String
  password: String
}

const signUp = () => {
  const [signUpForm, updateSignUpForm] = useState<signUpFormData>({
    email: '',
    userName: '',
    fullName: '',
    password: '',
  })

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
      alert('Please fill in all fields')
    } else if (!email.includes('@')) {
      alert('please provide valid email')
    } else {
      const url = 'http://localhost:5000/'
      axios
        .post(`${url}users/add`, {
          email,
          userName,
          fullName,
          password,
        })
        .then(res => console.log(res))
    }
  }
  console.log(signUpForm)

  return (
    <div id="signUpPage">
      <Head>
        <title>Sign up</title>
      </Head>
      <h1>Create an account</h1>
      <form id="signUpForm">
        <Input
          name="email"
          placeholder="Email"
          allowClear
          style={{ margin: '1rem 0' }}
          onChange={handleInputChange}
        />
        <Input
          name="userName"
          placeholder="Username"
          allowClear
          style={{ margin: '1rem 0' }}
          onChange={handleInputChange}
        />
        <Input
          name="fullName"
          placeholder="Full Name"
          allowClear
          style={{ margin: '1rem 0' }}
          onChange={handleInputChange}
        />
        <Input
          name="password"
          placeholder="Password"
          allowClear
          style={{ margin: '1rem 0' }}
          onChange={handleInputChange}
        />
        <Button
          type="primary"
          style={{ marginTop: '1rem' }}
          onClick={submitRegistration}
        >
          Sign up
        </Button>
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
