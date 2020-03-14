import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../components/userContext'
import { NextPage, NextPageContext } from 'next'
import axios, { AxiosResponse } from 'axios'
import Layout from '../../components/Layout'
import FoodCard from '../../components/foodCard/FoodCard'

const NewsFeed: NextPage<any> = props => {
  const { user, isUserLoggedIn } = useContext(UserContext)

  console.log(props)
  console.log(user)
  return (
    <Layout title="NewsFeed | Macros">
      <div id="cardList">
        {props.data.map((post, i) => {
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

NewsFeed.getInitialProps = async ({ query }) => {
  const { id } = query
  const url = 'http://localhost:5000'
  const response: AxiosResponse = await axios.get(`${url}/foodposts`)
  const allPost = await response.data
  return {
    data: allPost,
  }
}

export default NewsFeed
