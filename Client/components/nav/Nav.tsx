import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Icon, Input, message } from 'antd'
import { UserContext } from '../../components/userContext'

const NavBar: React.FC = () => {
  const { user, isUserLoggedIn } = useContext(UserContext)
  const [navBarStatus, isOpen] = useState<Boolean>(false)
  const [searchBarStatus, isActive] = useState<Boolean>(false)
  const toggleMenu = () => {
    isOpen(navBarStatus ? false : true)
  }
  const { Search } = Input
  const router = useRouter()

  const toggleSearchBar = () => {
    isActive(searchBarStatus ? false : true)
  }
  return (
    <nav id="navContainer">
      <div id="mobileNav">
        <ul id="navBarTop">
          <li>
            <button type="button" className="navIcon" onClick={toggleMenu}>
              <Icon type="menu" />
            </button>
          </li>
          <li style={{ display: searchBarStatus ? 'none' : '' }}>
            <Link
              href={isUserLoggedIn ? '/newsfeed/[id]' : '/'}
              as={`/newsfeed/${user._id}`}
            >
              <a>Macro</a>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="navIcon"
              style={{ display: searchBarStatus ? 'none' : '' }}
              onClick={toggleSearchBar}
            >
              <Icon type="search" />
            </button>
            <Search
              placeholder="Search by title..."
              onSearch={value => {
                if (value) {
                  toggleSearchBar()
                  router.push('/searchpage/[search]', `/searchpage/${value}`)
                } else {
                  message.error('Please enter a search term')
                  toggleSearchBar()
                }
              }}
              style={{ width: 300, display: searchBarStatus ? '' : 'none' }}
              size="large"
            />
          </li>
        </ul>
        {/* <ul id="navbarBottom">
          <li>Top</li>
          <li>New</li>
          <li>Protein</li>
          <li>Carbs</li>
          <li>Fats</li>
        </ul> */}
      </div>
      <div id="appDrawer">
        <ul id="topIcons">
          <li>
            <button type="button" className="navIcon" onClick={toggleMenu}>
              <Icon type="menu" />
            </button>
          </li>
          <li>
            <Link href="/createpost">
              <button type="button" className="navIcon">
                <Icon type="plus" />
              </button>
            </Link>
          </li>
        </ul>
        <nav>
          <ul id="menuList">
            <Link
              href={isUserLoggedIn ? '/newsfeed/[id]' : '/'}
              as={`/newsfeed/${user._id}`}
            >
              <a>Home</a>
            </Link>
            <Link href="/">
              <a>Saves</a>
            </Link>
            <Link href="/notifications">
              <a>Notifications</a>
            </Link>
            <Link
              href="/user/[id]"
              as={isUserLoggedIn ? `/user/${user._id}` : '/'}
            >
              <a>Profile</a>
            </Link>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        * {
          color: white;
          z-index: 999;
        }
        #navContainer {
          background-color: #504761;
          position: fixed;
          width: 100%;
        }
        #navContainer a {
          text-decoration: none;
        }
        #mobileNav {
          display: ${navBarStatus ? 'none' : ''};
        }
        #navBarTop {
          display: flex;
          justify-content: space-between;
          list-style: none;
          padding: 1rem 1rem 0.5rem 1rem;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .navIcon {
          border: none;
          background-color: #504761;
          font-size: 1.5rem;
        }
        #navbarBottom {
          display: flex;
          list-style: none;
          justify-content: space-evenly;
        }
        #appDrawer {
          display: ${navBarStatus ? 'block' : 'none'};
          background-color: #504761;
          height: 100vh;
        }
        #topIcons {
          display: flex;
          justify-content: space-between;
          list-style: none;
          padding: 1rem;
          font-size: 1.5rem;
        }
        #menuList {
          padding: 2rem 0 2rem 1rem;
          display: flex;
          flex-direction: column;
        }
        #menuList a {
          font-size: 2rem;
          margin: 1rem 0;
        }
      `}</style>
    </nav>
  )
}

export default NavBar
