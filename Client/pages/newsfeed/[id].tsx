import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../components/userContext'
import { NextPage, NextPageContext } from 'next'
import axios, { AxiosResponse } from 'axios'
import Layout from '../../components/Layout'
import FoodCard from '../../components/foodCard/FoodCard'
import PostCard from '../../components/PostCard'
import { Icon, Button } from 'antd'

const NewsFeed: NextPage<any> = props => {
  const router = useRouter()
  const { user, isUserLoggedIn } = useContext(UserContext)
  const [activeDisplay, setActiveDisplay] = useState<string>('feed')
  const [randomPost, setRanomPost] = useState()
  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push('/')
    }
  })
  const toggleDisplay = e => {
    setActiveDisplay(e.target.id)
  }
  const getRandomPost = async () => {
    if (activeDisplay !== 'discover') {
      try {
        const url = 'http://localhost:5000'
        const response: AxiosResponse = await axios.get(
          `${url}/foodposts/random`
        )
        setRanomPost(response.data[0])
        setActiveDisplay('discover')
        console.log(response.data[0])
      } catch (error) {
        console.log(error)
      }
    }
  }
  const getRandomPostButton = async () => {
    try {
      const url = 'http://localhost:5000'
      const response: AxiosResponse = await axios.get(`${url}/foodposts/random`)
      setRanomPost(response.data[0])
      setActiveDisplay('discover')
      console.log(response.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  console.log(user)
  return (
    <Layout title="NewsFeed | Macros">
      <ul id="feedToggle">
        <li id="discover" onClick={getRandomPost}>
          Discover
          <hr />
        </li>
        <li id="feed" onClick={toggleDisplay}>
          Feed
          <hr />
        </li>
      </ul>
      <div id="feedList">
        {props.data.map((post, i) => {
          return (
            <PostCard
              key={i}
              id={post._id}
              userName={post.user.userName}
              title={post.title}
              tags={post.tags}
              macros={post.macros}
              saves={post.saves}
              foodPhoto={post.foodPhoto}
              userId={post.user._id}
            />
          )
        })}
      </div>
      <div id="discoverPost">
        {activeDisplay === 'discover' ? (
          <PostCard
            id={randomPost._id}
            userName={randomPost.user.userName}
            title={randomPost.title}
            tags={randomPost.tags}
            macros={randomPost.macros}
            saves={randomPost.saves}
            foodPhoto={randomPost.foodPhoto}
            userId={randomPost.user._id}
          />
        ) : (
          'test'
        )}
      </div>
      <div
        style={{
          display: activeDisplay === 'discover' ? 'flex' : 'none',
          justifyContent: 'center',
        }}
      >
        <Button type="primary" onClick={getRandomPostButton}>
          <Icon type="reload" />
          Find Something New
        </Button>
      </div>
      <style jsx>{`
        #feedToggle {
          list-style: none;
          display: flex;
          margin-bottom: 1rem;
        }
        #feedToggle li {
          margin-right: 1rem;
          font-size: 2rem;
        }
        li hr {
          border: 0.5px #5fc349 solid;
          margin-right: 1.1rem;
        }
        #discover hr,
        #discoverPost {
          display: ${activeDisplay === 'discover' ? '' : 'none'};
        }
        #discover {
          color: ${activeDisplay === 'discover' ? '#5fc349' : 'black'};
        }
        #feed hr,
        #feedList {
          display: ${activeDisplay === 'feed' ? '' : 'none'};
        }
        #feed {
          color: ${activeDisplay === 'feed' ? '#5fc349' : 'black'};
        }
      `}</style>
    </Layout>
  )
}

NewsFeed.getInitialProps = async ({ query }) => {
  const { id } = query
  const url = 'http://localhost:5000'
  const response: AxiosResponse = await axios.get(
    `${url}/foodposts/userfeed/${id}`
  )
  const allPost = await response.data
  return {
    data: allPost,
  }
}

export default NewsFeed
