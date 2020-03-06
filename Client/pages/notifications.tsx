import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../components/userContext'
import axios from 'axios'

const Notfications = () => {
  const { user, setUser } = useContext(UserContext)
  return <div id="notficationsPage"></div>
}

export default Notfications
