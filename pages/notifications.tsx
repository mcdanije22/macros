import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { UserContext } from '../components/userContext'
import Layout from '../components/Layout'
import { Modal, Button, Icon, message, Row, Col } from 'antd'
import axios, { AxiosResponse } from 'axios'

const Notifications = () => {
  const { user, setUser } = useContext(UserContext)
  const url = 'http://localhost:5000'
  const [notificationsList, setnotificationsList] = useState(null)
  if (user) {
    setnotificationsList(user.notifications)
  }

  return (
    <Layout>
      <div id="notficationsPage">
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <ul id="notficationsList">
              {user
                ? notificationsList.map((notification, i) => {
                    return (
                      <li key={i}>
                        <div className="notficationCard">
                          <Link href={notification.href} as={notification.as}>
                            <div className="orderClass">
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
                          </Link>
                          <Icon
                            type="close"
                            onClick={async () => {
                              try {
                                const newNotificationsList = await notificationsList.filter(
                                  item => item._id !== notification._id
                                )
                                axios.post(`${url}/users/deletenotification`, {
                                  newNotificationsList,
                                  userId: user._id,
                                })
                                setnotificationsList(newNotificationsList)
                                await setUser({
                                  ...user,
                                  notifications: newNotificationsList,
                                })
                              } catch (error) {
                                console.log(error)
                              }
                            }}
                          />
                        </div>
                      </li>
                    )
                  })
                : ''}
            </ul>
          </Col>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
        </Row>
      </div>
      <style jsx>{`
        .notficationCard {
          display: flex;
          justify-content: space-between;
          margin: 0.5rem 0;
          border: 1px solid #e7e7e9;
          padding: 1rem;
          border-radius: 6px;
          box-shadow: 0 2px 4px #aaaaaa;
          min-height: 6rem;
        }
        .orderClass {
          display: flex;
        }
        #notficationsList li {
          list-style: none;
          margin-bottom: 1.5rem;
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
