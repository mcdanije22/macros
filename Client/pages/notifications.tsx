import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { UserContext } from '../components/userContext'
import axios from 'axios'
import Layout from '../components/Layout'

const Notfications = () => {
  const { user } = useContext(UserContext)
  console.log(user)
  return (
    <Layout>
      <div id="notficationsPage">
        <ul>
          {user.notfications.map((notification, i) => {
            console.log(notification)
            return (
              <Link key={i} href={notification.href} as={notification.as}>
                <li>{notification.message}</li>
              </Link>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Notfications
