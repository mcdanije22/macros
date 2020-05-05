import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../components/userContext'
import { NextPage } from 'next'
import axios, { AxiosResponse } from 'axios'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import { Icon, Button, Row, Col, Card } from 'antd'
import Link from 'next/link'

const NewsFeed: NextPage<any> = props => {
  const url = process.env.DOMAIN_URL
  const router = useRouter()
  const { user, isUserLoggedIn } = useContext(UserContext)
  const [activeDisplay, setActiveDisplay] = useState<string>('feed')
  const [randomPost, setRanomPost] = useState(null)
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
        const response: AxiosResponse = await axios.get(
          `${url}/api/foodposts/random`
        )
        setRanomPost(response.data[0])
        setActiveDisplay('discover')
      } catch (error) {
        console.log(error)
      }
    }
  }
  const getRandomPostButton = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${url}/api/foodposts/random`
      )
      setRanomPost(response.data[0])
      setActiveDisplay('discover')
    } catch (error) {
      console.log(error)
    }
  }
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
      <div id="newsfeedContainer">
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}>
            <div id="userInfoContainer">
              <Card
                style={{
                  width: 300,
                  borderRadius: '.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div id="userInfo">
                  <Link href="/user/[id]" as={`/user/${user._id}`}>
                    <img
                      src={`https://avatars.dicebear.com/v2/initials/${user.userName}.svg`}
                      alt={`${user.userName}'s profile`}
                      className="userImg"
                    />
                  </Link>
                  <h2>{user.userName}</h2>
                </div>
                <ul className="statList">
                  <li>
                    <p>{user.followers.length}</p>
                    <p>Followers</p>
                  </li>
                  <hr />
                  <li>
                    <p>{user.following.length}</p>
                    <p>Following</p>
                  </li>
                  <hr />
                  <li>
                    <p>{user.posts.length}</p>
                    <p>Post</p>
                  </li>
                </ul>
              </Card>
            </div>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <div id="feedContainer">
              <div id="feedList">
                {props.data.length === 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: ' center',
                      flexDirection: 'column',
                    }}
                  >
                    <h1 style={{ textAlign: 'center' }}>
                      You're not following anyone or haven't posted anything...
                    </h1>
                    <Button
                      type="primary"
                      style={{ margin: '0 6rem' }}
                      onClick={() => setActiveDisplay('discover')}
                    >
                      Discover something new
                    </Button>
                  </div>
                ) : (
                  props.data.map((post, i) => {
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
                  })
                )}
              </div>
              <div id="discoverPost">
                {activeDisplay === 'discover' && randomPost ? (
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
                  ''
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
            </div>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        #userInfoContainer {
          display: none;
        }
        #followingListContainer {
          display: none;
        }
        #userInfo {
          display: flex;
        }
        #userInfo h2 {
          text-align: center;
          align-self: center;
          margin-left: 1rem;
        }
        .userImg {
          border-radius: 150px;
          width: 150px;
          border: 1px solid black;
          margin-bottom: 1rem;
          text-align: center;
        }
        .statList p {
          margin: 0;
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
        .followedUser {
          display: flex;
          margin-top: 2rem;
        }
        .followedUser img {
          margin: 0;
          margin-right: 2rem;
        }
        .followedUser h2 {
          align-self: center;
        }
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
        @media only screen and (min-width: 992px) {
          #feedToggle {
            justify-content: center;
          }
          #userInfoContainer {
            display: flex;
            justify-content: center;
          }
          #followingListContainer {
            display: block;
          }
        }
      `}</style>
    </Layout>
  )
}

NewsFeed.getInitialProps = async ({ query }) => {
  const { id } = query
  const url = process.env.DOMAIN_URL
  const response: AxiosResponse = await axios.get(
    `${url}/api/users/userfeed/${id}`
  )
  const allPost = await response.data
  return {
    data: allPost,
  }
}

export default NewsFeed
