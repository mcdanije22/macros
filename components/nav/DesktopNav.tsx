import React, { useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Icon, Input, message, Menu, Dropdown } from 'antd'
import { UserContext } from '../userContext'

const DesktopNav: React.FC = () => {
  const { user, isUserLoggedIn } = useContext(UserContext)
  const { Search } = Input
  const router = useRouter()

  const searchInputRef = useRef<any>()

  const logUserOut = () => {
    message.success('Logged out')
    router.push('/')
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link
          href="/searchcategory/[category]"
          as={`/searchcategory/low calories`}
        >
          <a style={{ padding: '1rem 3rem' }}>Low Calories</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          href="/searchcategory/[category]"
          as={`/searchcategory/high protein`}
        >
          <a style={{ padding: '1rem 3rem' }}>High Protein</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          href="/searchcategory/[category]"
          as={`/searchcategory/low carbohydrate`}
        >
          <a style={{ padding: '1rem 3rem' }}>Low Carbs</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/searchcategory/[category]" as={`/searchcategory/low fat`}>
          <a style={{ padding: '1rem 3rem' }}>Low Fats</a>
        </Link>
      </Menu.Item>
    </Menu>
  )

  const userMenu = (
    <Menu>
      <Menu.Item style={{ padding: '1rem 3rem' }}>
        <Link href="/user/[id]" as={`/user/${isUserLoggedIn ? user._id : ''}`}>
          <a>Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Item style={{ padding: '1rem 3rem' }}>
        <p onClick={logUserOut}>Log out</p>
      </Menu.Item>
    </Menu>
  )
  const notificationsMenu = (
    <Menu>
      {user !== null
        ? user.notifications.slice(0, 8).map((notification, i) => {
            return (
              <Menu.Item key={i}>
                <Link href={notification.href} as={notification.as}>
                  <p style={{ padding: '.5rem 1rem' }}>
                    {notification.message}
                  </p>
                </Link>
              </Menu.Item>
            )
          })
        : []}
      <Menu.Item>
        <Link href="/notifications">
          <p style={{ padding: '.5rem 1rem' }}>View more...</p>
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <nav id="navContainer">
      <ul id="navBarleft">
        <li>
          <Link
            href={isUserLoggedIn ? '/newsfeed/[id]' : '/'}
            as={`/newsfeed/${isUserLoggedIn ? user._id : ''}`}
          >
            <a>Macro</a>
          </Link>
        </li>
        <li>
          <Search
            id="test"
            ref={searchInputRef}
            placeholder="Search by title..."
            onSearch={value => {
              if (value) {
                router.push('/searchpage/[search]', `/searchpage/${value}`)
              } else {
                message.error('Please enter a search term')
              }
            }}
            style={{ width: 600 }}
            size="large"
          />
        </li>
        <li>
          <Dropdown overlay={menu}>
            <div style={{ display: 'flex' }}>
              <p> category</p>
              <button
                type="button"
                style={{
                  backgroundColor: ' #504761',
                  border: 'none',
                  fontSize: '1rem',
                }}
              >
                <Icon
                  type="down"
                  style={{
                    margin: '0rem 0 1rem .5rem',
                    fontSize: '.8rem',
                  }}
                />
              </button>
            </div>
          </Dropdown>
        </li>
      </ul>
      <ul id="navBarRight">
        <li style={{ alignSelf: 'center', marginRight: '.5rem' }}>
          <Link href="/createpost">
            <button type="button" className="navIcon">
              <Icon type="plus" />
            </button>
          </Link>
        </li>
        <Dropdown overlay={notificationsMenu}>
          <li style={{ alignSelf: 'center' }}>
            <Icon type="bell" />
          </li>
        </Dropdown>
        <li>
          <Dropdown overlay={userMenu}>
            <div id="userButton">
              <img
                src={`https://avatars.dicebear.com/v2/initials/${
                  isUserLoggedIn ? user.userName.substring(0, 2) : ''
                }.svg`}
                alt={`${isUserLoggedIn ? user.userName : ''}'s profile`}
              />
            </div>
          </Dropdown>
        </li>
      </ul>

      <style jsx>{`
        * {
          color: white;
          z-index: 999;
        }
        #navContainer {
          background-color: #504761;
          position: fixed;
          width: 100%;
          height: 5rem;
          display: flex;
          justify-content: space-between;
        }
        #navContainer a {
          text-decoration: none;
        }
        .navIcon {
          border: none;
          background-color: #504761;
          font-size: 1.5rem;
        }
        #navBarleft {
          display: flex;
          justify-content: space-between;
          list-style: none;
          padding: 1rem 1rem 0 1rem;
          font-size: 1.5rem;
        }
        #navBarleft li {
          margin-right: 1rem;
        }
        #navBarRight {
          display: flex;
          justify-content: space-between;
          list-style: none;
          padding: 1rem 1rem 0 0;
          font-size: 1.5rem;
        }
        #userButton img {
          border-radius: 2rem;
          width: 50px;
          border: 1px solid black;
          margin-left: 1rem;
          align-self: start;
        }
        @media only screen and (max-width: 991px) {
          #navContainer {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}

export default DesktopNav
