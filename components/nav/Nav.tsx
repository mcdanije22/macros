import React, { useState, useEffect, useContext, useRef } from 'react'
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
  const searchInputRef = useRef<any>()
  const clickOutside = e => {
    if (searchInputRef.current.props.id !== e.target.id) {
      isActive(false)
    }
  }
  console.log(searchInputRef)
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside)
    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [])
  const logUserOut = () => {
    message.success('Logged out')
    router.push('/')
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
              as={`/newsfeed/${isUserLoggedIn ? user._id : ''}`}
            >
              <a>Macro</a>
            </Link>
          </li>
          <li>
            <div>
              <button
                type="button"
                className="navIcon"
                style={{ display: searchBarStatus ? 'none' : '' }}
                onClick={toggleSearchBar}
              >
                <Icon type="search" />
              </button>
              <Search
                ref={searchInputRef}
                placeholder="Search by title..."
                onSearch={value => {
                  if (value) {
                    toggleSearchBar()
                    router.push('/searchpage/[search]', `/searchpage/${value}`)
                  } else {
                    message.error('Please enter a search term')
                  }
                }}
                style={{ width: 300, display: searchBarStatus ? '' : 'none' }}
                size="large"
              />
            </div>
          </li>
        </ul>
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
              as={`/newsfeed/${isUserLoggedIn ? user._id : ''}`}
            >
              <a>Home</a>
            </Link>
            <Link
              href="/searchcategory/[category]"
              as={`/searchcategory/low calories`}
            >
              <a onClick={toggleMenu}>Low Calories</a>
            </Link>
            <Link
              href="/searchcategory/[category]"
              as={`/searchcategory/high protein`}
            >
              <a onClick={toggleMenu}>High Protein</a>
            </Link>
            <Link
              href="/searchcategory/[category]"
              as={`/searchcategory/low carbohydrate`}
            >
              <a onClick={toggleMenu}>Low Carbs</a>
            </Link>
            <Link
              href="/searchcategory/[category]"
              as={`/searchcategory/low fat`}
            >
              <a onClick={toggleMenu}>Low Fats</a>
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
            <p onClick={logUserOut}>Log out</p>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        @media only screen and (min-width: 992px) {
          #navContainer {
            display: none;
          }
        }
        * {
          color: white;
          z-index: 999;
        }
        #navContainer {
          background-color: #504761;
          position: fixed;
          width: 100%;
          height: 5rem;
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
        #menuList a,
        p {
          font-size: 2rem;
          margin: 1rem 0;
        }
      `}</style>
    </nav>
  )
}

export default NavBar
