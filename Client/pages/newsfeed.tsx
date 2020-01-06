import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import Layout from '../components/Layout'
import FoodCard from '../components/foodCard/FoodCard'

// interface Post {
//   id: String
//   user: String
//   title: String
//   tags: Array<String>
//   saves: Number
//   macros: Object
//   ingredients: Array<String>
//   directions: Array<Object>
//   comments: Array<String>
// }

const NewsFeed: React.FC = () => {
  const [currentPosts, getPosts] = useState([])

  const fetchPosts = async () => {
    const response: AxiosResponse = await axios.get(
      'http://localhost:5000/foodposts'
    )
    const postsList = await response.data
    getPosts(postsList)
  }

  useEffect(() => {
    try {
      fetchPosts()
    } catch (error) {
      console.log(error)
    }
  }, [])
  console.log(currentPosts)
  return (
    <Layout title="NewsFeed | Macros">
      <div id="cardList">
        {currentPosts.map((post, i) => {
          return (
            <FoodCard
              key={i}
              id={post._id}
              user={post.user}
              title={post.title}
              tags={post.tags}
              macros={post.macros}
              saves={post.saves}
            />
          )
        })}
      </div>
      <style jsx>{``}</style>
    </Layout>
  )
}

export default NewsFeed
