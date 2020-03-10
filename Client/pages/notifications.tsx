import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { UserContext } from '../components/userContext'
import Layout from '../components/Layout'

const Notifications = () => {
  const { user } = useContext(UserContext)
  console.log(user)
  return (
    <Layout>
      <div id="notficationsPage">
        <ul id="notficationsList">
          {user.notifications.map((notification, i) => {
            console.log(notification)
            return (
              <Link key={i} href={notification.href} as={notification.as}>
                <li>
                  <div className="notificationLeftSide">
                    <img
                      src={`https://avatars.dicebear.com/v2/initials/${notification.actionUserName}.svg`}
                      alt={`${notification.actionUserName}'s profile`}
                    />
                  </div>
                  <div className="notificationRightSide">
                    <p>{notification.message}</p>
                    <p style={{ color: '#707070' }}>
                      {notification.actionDate
                        ? notification.actionDate.slice(0, 10)
                        : ''}
                    </p>
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      <style jsx>{`
        #notficationsList li {
          list-style: none;
          display: flex;
          margin-bottom: 3rem;
        }
        #notficationsList img {
          width: 40px;
          border-radius: 40px;
        }
        li img {
          margin-right: 2rem;
        }
        #notficationsList p {
          margin: 0;
          font-size: 1rem;
          color: black;
        }
      `}</style>
    </Layout>
  )
}

export default Notifications
