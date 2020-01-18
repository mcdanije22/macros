import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import axios, { AxiosResponse } from 'axios'
import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../../components/nav/Nav'

const UserPage: NextPage<any> = () => {
  const [activeNav, setActiveNav] = useState('myPost')
  const toggleNav = e => {
    setActiveNav(e.target.id)
    console.log(e.target.id)
  }

  return (
    <div className="userPage">
      <Head>
        <title>title</title>
      </Head>
      <div id="topNav">
        <Nav />
      </div>
      <div className="heroHeader">
        <img className="heroUserImage" src="https://via.placeholder.com/400" />
        <h1>Josh McDaniel</h1>
        <button className="followButton">Follow</button>
      </div>
      <div className="mainSection">
        <div className="profileStats">
          <ul className="statList">
            <li>
              <p>500</p>
              <p>Followers</p>
            </li>
            <hr />
            <li>
              <p>500</p>
              <p>Following</p>
            </li>
            <hr />
            <li>
              <p>500</p>
              <p>Post</p>
            </li>
          </ul>
        </div>
        <nav className="profileNav">
          <ul className="navList">
            <li id="myPost" onClick={toggleNav}>
              My Post
              <hr id="myPost" />
            </li>
            <li id="saves" onClick={toggleNav}>
              Saves
              <hr id="myPost" />
            </li>
          </ul>
        </nav>
        <div className="galleryList">
          <div className="postList">t</div>
        </div>
      </div>
      <style jsx>{`
        #topNav {
          padding-bottom: 7rem;
        }
        .userPage {
        }
        .heroHeader {
          display: flex;
          justify-content: center;
          flex-direction: column;
          background-color: #2d344b;
          height: 420px;
        }
        .heroUserImage {
          border: 10px white solid;
          border-radius: 200px;
          width: 200px;
          margin: 0 auto;
          height: 200px;
          align-self: center;
        }
        h1 {
          color: white;
          align-self: center;
          margin-top: 1rem;
          font-size: 3rem;
        }
        .followButton {
          background-color: #5fc349;
          color: white;
          width: 10rem;
          text-align: center;
          align-self: center;
          margin: 1rem 0 2rem 0;
          padding: 0.5rem;
          border: none;
          border-radius: 2rem;
          font-size: 1.2rem;
        }
        .mainSection {
          background-color: white;
          height: 100vh;
          border-radius: 2rem 2rem 0 0;
          margin-top: -2rem;
        }
        .statList {
          display: flex;
          justify-content: center;
          list-style: none;
        }
        .statList li {
          margin: 2rem 1rem;
          text-align: center;
        }
        .statList hr {
          height: 2.5rem;
          align-self: center;
          border: 0.5px #707070 solid;
        }
        .navList {
          display: flex;
          list-style: none;
          margin: 0 1rem;
        }
        .navList li {
          margin: 0 1rem;
          font-size: 1.5rem;
        }
        .navList li hr {
          margin: 0 1rem 0 0;
        }
        #myPost {
          color: ${activeNav === 'myPost' ? ' #5fc349' : '#707070'};
        }
        #myPost hr {
          border: ${activeNav === 'myPost' ? '.5px solid #5fc349' : ''};
          display: ${activeNav === 'myPost' ? '' : 'none'};
        }
        #saves {
          color: ${activeNav === 'saves' ? ' #5fc349' : '#707070'};
        }
        #saves hr {
          border: ${activeNav === 'saves' ? '.5px solid #5fc349' : ''};
          display: ${activeNav === 'saves' ? '' : 'none'};
        }
        .galleryList {
          margin: 2rem;
        }
      `}</style>
    </div>
  )
}

export default UserPage
