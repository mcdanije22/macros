import React, { useState, useEffect, useContext } from 'react'
import { NextPage, NextPageContext } from 'next'
import axios, { AxiosResponse } from 'axios'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import { Icon, Button } from 'antd'

const SearchPage: NextPage<any> = props => {
  console.log(props.data)
  return (
    <Layout title="Search">
      <div id="searchPage">
        <h1>Search Page</h1>
        <h3>Search results for "{props.query}" </h3>
        <div id="searchList">
          {props.data.length === 0 ? (
            <h1>No results found...</h1>
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
        <style jsx>{`
          h1,
          h3 {
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    </Layout>
  )
}
SearchPage.getInitialProps = async ({ query }) => {
  const { search } = query
  const url = 'http://localhost:5000'
  const response: AxiosResponse = await axios.get(
    `${url}/foodposts/search/${search}`
  )
  const searchPost = await response.data
  return {
    data: searchPost,
    query: search,
  }
}
export default SearchPage
