import React, { useState, useContext } from 'react'
import Layout from '../../components/Layout'
import axios, { AxiosResponse } from 'axios'
import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import { Icon } from 'antd'
import { UserContext } from '../../components/userContext'

const FoodPost: NextPage<any> = props => {
  const { user } = useContext(UserContext)
  const [currentInfo, setCurrentInfo] = useState<String>('overview')
  const changeView = e => {
    setCurrentInfo(e.target.id)
  }

  const {
    title,
    saves,
    tags,
    ingredients,
    directions,
    macros,
    summary,
    comments,
    foodPhoto /*min-height: 400px*/,
    id,
  } = props.data
  const { userName, photo, fullName } = props.data.user
  console.log(props.data.user)
  return (
    <Layout title={title}>
      <div className="postContainer">
        <div className="topInfo">
          <Link href="/user/[id]" as={`/user/${props.data.user._id}`}>
            <div className="postArthur">
              <img
                src={`https://avatars.dicebear.com/v2/initials/${fullName[0]}.svg`}
                alt={`${userName}'s profile`}
              />
              <h3>{userName}</h3>
            </div>
          </Link>
          <h5>{saves} Saves</h5>
        </div>
        <h1>{title}</h1>
        <div className="topButtons">
          <li>
            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
          </li>
          <li>
            <Icon type="facebook" style={{ color: '#4A66AD' }} />
          </li>
          <li>
            <Icon type="instagram" style={{ color: '#B53E68' }} />
          </li>
          <li>
            <Icon type="twitter" style={{ color: '#4B9CE8' }} />
          </li>
        </div>
        <div className="heroImage">
          <img src={foodPhoto} alt={`${title} hero`} />
        </div>
        <div className="tags">
          {tags.map((tag, i) => {
            return (
              <Link href="/" key={i}>
                <p>#{tag}</p>
              </Link>
            )
          })}
        </div>
        <div className="stats">
          <h1>
            {macros.protein}p {macros.carbohydrates}c {macros.fat}f
          </h1>
          <h1>{macros.calories} Calories</h1>
        </div>
        <nav className="postNav">
          <ul>
            <li id="overview" onClick={changeView}>
              Overview
              <hr />
            </li>
            <li id="ingredients" onClick={changeView}>
              Ingredients
              <hr />
            </li>
            <li id="directions" onClick={changeView}>
              Directions
              <hr />
            </li>
            <li id="comments" onClick={changeView}>
              Comments
              <hr />
            </li>
          </ul>
        </nav>
        <div className="mainInfo">
          <div className="overview">
            <h1>Summary</h1>
            <p>{summary}</p>
          </div>
          <div className="ingredients">
            <h1>Ingredients</h1>
            {ingredients.map((ingredient, i) => {
              return (
                <p key={i}>
                  {ingredient.servingSize}
                  {ingredient.servingSizeUnit} {ingredient.description}
                </p>
              )
            })}
          </div>
          <div className="directions">
            <h1>Directions</h1>
            <ul>
              {directions.map((direction, i) => {
                return (
                  <li key={i} className="directionList">
                    <h1>{i + 1}.</h1>
                    <p>{direction}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="comments">
            <h1>Comments</h1>
            <h3 className="noComments">No Comments</h3>
            {comments.map((comment, i) => {
              return (
                <div className="comment" key={i}>
                  <div className="postArthur">
                    <img
                      src={comment.user.photo}
                      alt={`${comment.user.userName} Profile`}
                    />
                    <h3>{comment.user.userName}</h3>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .postContainer p,
        h5 {
          font-size: 1.2rem;
        }
        h1 {
          margin: 1.5rem 0;
        }
        .topInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #262626;
          margin-bottom: 1rem;
        }
        .postArthur {
          display: flex;
        }
        .postArthur img {
          margin-right: 1rem;
          border-radius: 2rem;
          width: 40px;
          border: 1px solid black;
        }
        .postArthur {
          align-items: center;
        }
        .topButtons {
          display: flex;
        }
        .topButtons li {
          list-style: none;
          margin: 0 1rem 0.5rem 0;
          font-size: 1.5rem;
        }
        .heroImage img {
          width: 100%;
          border-radius: 2rem;
        }
        .tags {
          color: black;
          display: flex;
          flex-wrap: wrap;
          font-size: 1.5rem;
        }
        .tags p {
          margin-right: 0.5rem;
        }
        .stats {
          color: #262626;
          display: flex;
          justify-content: space-between;
        }
        .postNav ul {
          list-style: none;
          display: flex;
          justify-content: space-between;
          color: #707070;
        }
        hr {
          margin: 0.1rem 0.7rem;
          border: 0.5px black solid;
        }
        .mainInfo p {
          color: #707070;
          line-height: 2rem;
        }
        .ingredients p {
          margin: 1rem 0;
        }

        .directions h1 {
          margin: 1rem 0;
        }
        .directionList h1 {
          margin: 0;
        }
        .directions ul {
          list-style: none;
        }
        .directions li {
          display: flex;
        }
        .directions p {
          margin: 0 1rem;
          align-self: center;
        }
        .noComments {
          display: ${comments.length === 0 ? '' : 'none'};
        }
        .comment {
          margin-top: 2rem;
        }
        .comments p {
          margin-top: 1.5rem;
        }
        .overview {
          display: ${currentInfo === 'overview' ? '' : 'none'};
        }
        #overview {
          color: ${currentInfo === 'overview' ? 'black' : ''};
          cursor: pointer;
        }
        #overview hr {
          display: ${currentInfo === 'overview' ? '' : 'none'};
        }
        .ingredients {
          display: ${currentInfo === 'ingredients' ? '' : 'none'};
        }
        #ingredients {
          color: ${currentInfo === 'ingredients' ? 'black' : ''};
          cursor: pointer;
        }
        #ingredients hr {
          display: ${currentInfo === 'ingredients' ? '' : 'none'};
        }
        .directions {
          display: ${currentInfo === 'directions' ? '' : 'none'};
        }
        #directions {
          color: ${currentInfo === 'directions' ? 'black' : ''};
          cursor: pointer;
        }
        #directions hr {
          display: ${currentInfo === 'directions' ? '' : 'none'};
        }
        .comments {
          display: ${currentInfo === 'comments' ? '' : 'none'};
        }
        #comments {
          color: ${currentInfo === 'comments' ? 'black' : ''};
          cursor: pointer;
        }
        #comments hr {
          display: ${currentInfo === 'comments' ? '' : 'none'};
        }
      `}</style>
    </Layout>
  )
}

FoodPost.getInitialProps = async ({ query }) => {
  const { id } = query
  const url = 'http://localhost:5000'
  const response: AxiosResponse = await axios.get(`${url}/foodposts/${id}`)
  const currentPost = await response.data
  return {
    data: currentPost,
  }
}

export default FoodPost
