import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import FoodCard from '../components/foodCard/FoodCard'

const NewsFeed: React.FC = () => {
  const [currentPosts, getPosts] = useState([])
  useEffect(() => {
    // async function asyncFunc() {
    const asyncFunc = async () => {
      const postsList: Response = await axios.get(
        'http://localhost:5000/foodposts'
      )
      console.log(postsList)
    }
    asyncFunc()
  })
  return (
    <Layout title="NewsFeed | Macros">
      <div id="cardList">
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
      <style jsx>{``}</style>
    </Layout>
  )
}

export default NewsFeed
