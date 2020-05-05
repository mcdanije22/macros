import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { UserContext } from '../components/userContext'
import { Button, Row, Col } from 'antd'

const index: React.FC = () => {
  const { user, setUser } = useContext(UserContext)
  console.log(user)
  useEffect(() => {
    setUser(null)
  }, [])

  return (
    <div id="landingPage">
      <Head>
        <title>Macros</title>
      </Head>
      <div id="landingSection">
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <div id="landingHeader">
              <h1 style={{ color: 'white' }}>Welcome to Macros</h1>
              <p>
                Join the community and take control of your nutrition with the
                help and support of others.
              </p>
            </div>
            <div id="landingButtons">
              <Link href="login">
                <Button type="primary" style={{ margin: '0 6rem 1.5rem 6rem' }}>
                  Log In
                </Button>
              </Link>
              <Link href="signup">
                <Button
                  type="primary"
                  style={{
                    margin: '0 6rem 1.5rem 6rem',
                    backgroundColor: '#504761',
                    border: 'none',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        #landingPage {
          display: flex;
          flex-direction: column;
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url('/static/images/landing.jpg');
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
