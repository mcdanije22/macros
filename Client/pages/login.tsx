import React, { useState, useContext } from 'react'
import { Input, Button, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios, { AxiosResponse } from 'axios'
import { UserContext } from '../components/userContext'

interface logInForm {
  email: string
  password: string
}
const logIn = () => {
  const { user, setUser, isUserLoggedIn, userLoggedIn } = useContext(
    UserContext
  )
  const [loading, isLoading] = useState<Boolean>(false)
  const [logInForm, updateLogInForm] = useState<logInForm>({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleInputChange = e => {
    const name = e.target.name
    updateLogInForm({
      ...logInForm,
      [name]: e.target.value,
    })
  }
  const logUserIn = async (email: string, password: string) => {
    const url = 'http://localhost:5000/'
    try {
      const user: AxiosResponse = await axios.post(`${url}users/login`, {
        email,
        password,
      })
      isLoading(true)
      await setUser(user.data)
      await userLoggedIn(true)
      isLoading(false)
      await router.push(`/newsfeed/${user.data._id}`)
    } catch (error) {
      message.error('inccorect email or password')
      updateLogInForm({
        email: logInForm.email,
        password: '',
      })
    }
  }
  const submitLogIn = () => {
    const { email, password } = logInForm
    logUserIn(email, password)
  }

  return (
    <div id="logInPage">
      <Head>
        <title>Log in</title>
      </Head>
      <h1>Log into your account</h1>
      <form id="logInForm">
        <Input
          name="email"
          placeholder="Email"
          allowClear
          style={{ margin: '1rem 0' }}
          onChange={handleInputChange}
          value={logInForm.email}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              submitLogIn()
            }
          }}
        />
        <Input
          name="password"
          placeholder="Password"
          allowClear
          style={{ margin: '1rem 0' }}
          onChange={handleInputChange}
          value={logInForm.password}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              submitLogIn()
            }
          }}
        />
        {loading ? (
          <p>logging in...</p>
        ) : (
          <Button
            type="primary"
            style={{ marginTop: '1rem' }}
            onClick={submitLogIn}
          >
            Log in
          </Button>
        )}
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
