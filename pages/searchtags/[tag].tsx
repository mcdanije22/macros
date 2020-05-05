import React from 'react'
import { NextPage } from 'next'
import axios, { AxiosResponse } from 'axios'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import { Row, Col } from 'antd'

const SearchTags: NextPage<any> = props => {
  return (
    <Layout title="Search">
      <div id="searchPage">
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <h1>Search Page</h1>
            <h3>Search results for "{props.query}" tags </h3>
            <div id="searchList">
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
          </Col>
        </Row>
      </div>
      <style jsx>{`
        h1 {
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  )
}
SearchTags.getInitialProps = async ({ query }) => {
  const { tag } = query
  const url = process.env.DOMAIN_URL
  const response: AxiosResponse = await axios.get(
    `${url}/api/searchposts/tags/${tag}`
  )
  const searchPost = await response.data
  return {
    data: searchPost,
    query: tag,
  }
}
export default SearchTags
