import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const NavBar: React.FC = () => {
  const [navBarStatus, isOpen] = useState<Boolean>(false)
  const toggleMenu = () => {
    isOpen(navBarStatus ? false : true)
  }
  return (
    <nav id="navContainer">
      <div id="mobileNav">
        <ul id="navBarTop">
          <li>
            <button type="button" className="navIcon" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </li>
          <li>
            <Link href="/">
              <a>Macro</a>
            </Link>
          </li>
          <li>
            <button type="button" className="navIcon">
              <FontAwesomeIcon icon={faSearch} />
            </button>
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
              <FontAwesomeIcon icon={faBars} />
            </button>
          </li>
          <li>
            <button type="button" className="navIcon">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </li>
        </ul>
        <nav>
          <ul id="menuList">
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/">
              <a>Favorites</a>
            </Link>
            <Link href="/">
              <a>Notifications</a>
            </Link>
            <Link href="/">
              <a>Login/Sign up</a>
            </Link>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        * {
          color: white;
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
