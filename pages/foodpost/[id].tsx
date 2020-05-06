import React, { useState, useContext, useRef } from 'react'
import Layout from '../../components/Layout'
import axios, { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Icon, message, Button, Modal, Row, Col } from 'antd'
import { UserContext } from '../../components/userContext'
import Router from 'next/router'

const FoodPost: NextPage<any> = props => {
  const { user } = useContext(UserContext)
  const url = process.env.DOMAIN_URL
  const [currentInfo, setCurrentInfo] = useState<String>('overview')
  const changeView = e => {
    setCurrentInfo(e.target.id)
  }
  const [modalStatus, toggleModal] = useState<boolean>(false)
  const commentInputRef: any = useRef()
  const {
    title,
    saves,
    tags,
    ingredients,
    directions,
    macros,
    summary,
    comments,
    foodPhoto,
    _id,
  } = props.data
  const { userName, photo, fullName } = props.data.user
  console.log(props.data)
  const toggle = () => {
    toggleModal(modalStatus ? false : true)
  }

  const userLikePost = async () => {
    try {
      await axios.post(`${url}/api/users/savepost`, {
        postId: props.data._id,
        userId: user._id,
        postUserId: props.data.user._id,
      })
      message.success('Post saved!')
    } catch (error) {
      message.error('Post already saved')
    }
  }
  const addComment = async () => {
    try {
      await axios.post(`/api/foodposts/addcomment/${user._id}`, {
        comment: commentInputRef.current.value,
        postUserId: props.data.user._id,
        postid: _id,
      })
      comments.push({
        commentDate: new Date().toJSON(),
        comment: commentInputRef.current.value,
        user: {
          userName: user.userName,
        },
      })
      commentInputRef.current.value = ''
      message.success('Comment posted!')
      toggle()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title={title}>
      <div className="postContainer">
        <Row>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <div className="topInfo">
              <Link href="/user/[id]" as={`/user/${props.data.user._id}`}>
                <div className="postArthurImg">
                  <img
                    src={`https://avatars.dicebear.com/v2/initials/${userName.substring(
                      0,
                      2
                    )}.svg`}
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
                <Icon
                  type="heart"
                  theme="twoTone"
                  twoToneColor="#eb2f96"
                  onClick={userLikePost}
                />
              </li>
              <li>
                <a
                  href={`https://twitter.com/share?url=${url}${Router.asPath}`}
                  target="_blank"
                >
                  <Icon type="twitter" style={{ color: '#4B9CE8' }} />
                </a>
              </li>
              <li>
                <a
                  href={`http://reddit.com/submit?url=${url}${Router.asPath}`}
                  target="_blank"
                >
                  <Icon type="reddit" style={{ color: '#FF4500' }} />
                </a>
              </li>
              <li>
                <a
                  href={`http://www.facebook.com/sharer.php?u=${url}${Router.asPath}`}
                  target="_blank"
                >
                  <Icon type="facebook" style={{ color: '#4A66AD' }} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:?Subject=${title}&Body=${url}${Router.asPath}`}
                >
                  <Icon type="mail" theme="twoTone" twoToneColor="#FFAE42" />
                </a>
              </li>
            </div>
            <div className="heroImage">
              <img src={foodPhoto} alt={`${title} hero`} />
            </div>
            <div className="tags">
              {tags.map((tag, i) => {
                return (
                  <Link
                    href="/searchtags/[tag]"
                    as={`/searchtags/${tag}`}
                    key={i}
                  >
                    <Button
                      type="primary"
                      ghost
                      style={{ margin: '1rem .5rem 0 0', width: '6rem' }}
                    >
                      {tag}
                    </Button>
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
                <h3 className="noComments">No Comments...</h3>
                <Modal
                  title="Add comment"
                  visible={modalStatus}
                  footer={null}
                  onCancel={toggle}
                >
                  <textarea
                    name="comment"
                    ref={commentInputRef}
                    style={{ width: '100%', height: '10rem', padding: '1rem' }}
                    onKeyUp={e => {
                      if (e.key === 'Enter') {
                        addComment()
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    ghost
                    style={{ marginTop: '1rem' }}
                    onClick={addComment}
                  >
                    Submit
                  </Button>
                </Modal>
                <button id="commentButton" onClick={toggle}>
                  Add Comment
                </button>
                {comments
                  .sort((a, b) => (a.commentDate < b.commentDate ? 1 : -1))
                  .map((comment, i) => {
                    console.log(comment)
                    return (
                      <div className="commentContainer" key={i}>
                        <div className="comment">
                          <div className="commentLeftSide">
                            <div className="commentUserInfo">
                              <Link
                                href="/user/[id]"
                                as={`/user/${comment.user._id}`}
                              >
                                <img
                                  src={`https://avatars.dicebear.com/v2/initials/${comment.user.userName}.svg`}
                                  alt={`${comment.user.userName} Profile`}
                                />
                              </Link>
                            </div>
                            <div className="commentMain">
                              <h3>{comment.user.userName}</h3>
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                          <div className="commentRightSide">
                            <div className="commentDate">
                              <p>{comment.commentDate.slice(0, 10)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </Col>
          <Col sm={{ span: 0 }} lg={{ span: 8 }}></Col>
        </Row>
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
        .postArthurImg img {
          border-radius: 2rem;
          width: 50px;
          border: 1px solid black;
        }
        .postArthurImg {
          margin-right: 2rem;
          align-self: center;
          display: flex;
        }
        .postArthurImg h3 {
          align-self: center;
          margin-left: 1rem;
        }
        #commentButton {
          background-color: transparent;
          border: 1px #4d93e8 solid;
          color: #4d93e8;
          width: 8rem;
          padding: 0.5rem 1rem;
          margin-bottom: 2rem;
          border-radius: 0.5rem;
        }
        .commentUserInfo img {
          border-radius: 2rem;
          width: 35px;
          border: 1px solid black;
        }
        .commentUserInfo {
          margin-right: 2rem;
          align-self: top;
        }
        .topButtons {
          display: flex;
        }
        .topButtons li {
          list-style: none;
          margin: 0 0.5rem 0.5rem 0;
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
          margin-bottom: 2rem;
        }
        .comment {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4rem;
        }
        .comment h3,
        p {
          margin: 0;
        }
        .commentDate p {
          font-size: 0.8rem;
        }
        .commentMain h3 {
          font-size: 0.9rem;
          color: #707070;
        }
        .commentMain p {
          color: black;
          line-height: 1.2rem;
        }
        .commentLeftSide {
          display: flex;
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
  const url = process.env.DOMAIN_URL
  const response: AxiosResponse = await axios.get(`${url}/api/foodposts/${id}`)
  const currentPost = await response.data
  return {
    data: currentPost,
  }
}

export default FoodPost
