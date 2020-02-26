import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../components/userContext'
import axios, { AxiosResponse } from 'axios'
import Layout from '../components/Layout'
import FoodCard from '../components/foodCard/FoodCard'

const Home: React.FC = () => {
  const router = useRouter()
  const { user, isUserLoggedIn } = useContext(UserContext)
  const [currentPosts, getPosts] = useState([])
  const url = 'http://localhost:5000'

  const fetchPosts = async () => {
    const response: AxiosResponse = await axios.get(`${url}/foodposts`)
    const postsList = await response.data
    getPosts(postsList)
  }

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push('/')
    } else {
      try {
        fetchPosts()
      } catch (error) {
        console.log(error)
      }
    }
  }, [])
  console.log(user)
  return (
    <Layout title="NewsFeed | Macros">
      <div id="cardList">
        {currentPosts.map((post, i) => {
          return (
            <FoodCard
              key={i}
              id={post._id}
              userName={post.user.userName}
              title={post.title}
              tags={post.tags}
              macros={post.macros}
              saves={post.saves}
              foodPhoto={post.foodPhoto}
            />
          )
        })}
      </div>
      <style jsx>{``}</style>
    </Layout>
  )
}

export default Home
