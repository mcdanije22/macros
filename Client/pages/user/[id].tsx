import React, { useState, useContext, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Nav from '../../components/nav/Nav'
import FoodCard from '../../components/foodCard/FoodCard'
import { UserContext } from '../../components/userContext'

const UserPage: NextPage<any> = props => {
  const { user } = useContext(UserContext)
  const [activeNav, setActiveNav] = useState('myPost')
  const toggleNav = e => {
    setActiveNav(e.target.id)
  }
  const {
    userName,
    photo,
    posts,
    saves,
    followingCount,
    followerCount,
    _id,
    fullName,
  } = props.data
  console.log(posts)
  return (
    <div className="userPage">
      <Head>
        <title>{userName}</title>
      </Head>
      <div id="topNav">
        <Nav />
      </div>
      <div className="heroHeader">
        <img
          className="heroUserImage"
          src={`https://avatars.dicebear.com/v2/initials/${fullName[0]}.svg`}
          alt={`${userName} profile photo`}
        />
        <h1>{userName}</h1>
        {user._id === _id ? (
          ''
        ) : (
          <button className="followButton">Follow</button>
        )}
      </div>
      <div className="mainSection">
        <div className="profileStats">
          <ul className="statList">
            <li>
              <p>{followerCount}</p>
              <p>Followers</p>
            </li>
            <hr />
            <li>
              <p>{followingCount}</p>
              <p>Following</p>
            </li>
            <hr />
            <li>
              <p>{posts.length}</p>
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
          <div className="postList">
            {posts.map((post, i) => {
              return (
                <FoodCard
                  key={i}
                  id={post._id}
                  userName={post.userName}
                  title={post.title}
                  tags={post.tags}
                  macros={post.macros}
                  saves={post.saves}
                  foodPhoto={post.foodPhoto}
                />
              )
            })}
          </div>
          <div className="saveList">
            {saves.map((post, i) => {
              return (
                <FoodCard
                  key={i}
                  id={post._id}
                  userName={post.userName}
                  title={post.title}
                  tags={post.tags}
                  macros={post.macros}
                  saves={post.saves}
                  foodPhoto={post.foodPhoto}
                />
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .statList p {
          margin: 0;
        }
        #topNav {
          padding-bottom: 4rem;
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
          margin: 0rem 0 2rem 0;
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
        .postList {
          display: ${activeNav === 'myPost' ? '' : 'none'};
        }
        .savesList {
          display: ${activeNav === 'saves' ? '' : 'none'};
        }
      `}</style>
    </div>
  )
}

UserPage.getInitialProps = async ({ query }) => {
  const { id } = query
  const url = 'http://localhost:5000'
  const response: AxiosResponse = await axios.get(`${url}/users/${id}`)
  const currentUser = await response.data
  return {
    data: currentUser,
  }
}
export default UserPage
