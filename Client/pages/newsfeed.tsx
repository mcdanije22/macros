import React from 'react'
import Layout from '../components/Layout'
import FoodCard from '../components/foodCard/FoodCard'

const NewsFeed: React.FC = () => (
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

export default NewsFeed
