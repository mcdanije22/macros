import React, { useState, useEffect, useContext } from 'react'
import { NextPage, NextPageContext } from 'next'
import axios, { AxiosResponse } from 'axios'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import { Row, Col } from 'antd'

const SearchPage: NextPage<any> = props => {
  return (
    <Layout title="Search">
      <div id="searchPage">
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>

          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
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
          </Col>
        </Row>
      </div>
      <style jsx>{`
        h1,
        h3 {
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  )
}
SearchPage.getInitialProps = async ({ query }) => {
  const { search } = query
  const url = 'http://localhost:3000'
  const response: AxiosResponse = await axios.get(
    `${url}/api/searchposts/${search}`
  )
  const searchPost = await response.data
  return {
    data: searchPost,
    query: search,
  }
}
export default SearchPage
