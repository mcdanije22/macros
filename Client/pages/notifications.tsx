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
                  <div className="notficationCard">
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
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      <style jsx>{`
        .notficationCard {
          display: flex;
          margin: 0.5rem 0;
          border: 1px solid #e7e7e9;
          padding: 1rem;
          border-radius: 4px;
          box-shadow: 0 2px 14px #aaaaaa;
          min-height: 6rem;
        }
        #notficationsList li {
          list-style: none;
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
