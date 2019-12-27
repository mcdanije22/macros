import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <div id="test">
      <li>
        <FontAwesomeIcon icon={faBars} />
      </li>
      <li>
        <Link href="/">
          <a>Macros</a>
        </Link>
      </li>
      <li>
        <FontAwesomeIcon icon={faBars} />
      </li>
      <style jsx>{`
        #test {
          display: flex;
          font-size: 2rem;
        }
      `}</style>
    </div>
  )
}
export default Nav
