import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'

const FoodPost: React.FC = () => {
  const [currentInfo, setCurrentInfo] = useState<String>('overview')
  const changeView = e => {
    setCurrentInfo(e.target.id)
  }
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout title={`${id} | Next App`}>
      <div className="postContainer">
        <div className="topInfo">
          <div className="postArthur">
            <img
              src="https://via.placeholder.com/60"
              alt="John Smith Profile"
            />
            <h3>John Smith</h3>
          </div>
          <h5>200 Saves</h5>
        </div>
        <h1>Keto Pizza</h1>
        <div className="topButtons">
          <button type="button">Save</button>
          <button type="button">share</button>
          <button type="button">share</button>
        </div>
        <div className="heroImage">
          <img src="https://via.placeholder.com/400" alt="Keto Pizza Hero" />
        </div>
        <h1 className="macroStats">30p 20c 5f</h1>
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
        {/* <hr /> */}
        <div className="mainInfo">
          <div className="overview">
            <h1>Summary</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="ingredients">
            <h1>Ingredients</h1>
            <p>1lb skim cheese</p>
            <p>1lb skim cheese</p>
            <p>1lb skim cheese</p>
            <p>1lb skim cheese</p>
            <p>1lb skim cheese</p>
            <p>1lb skim cheese</p>
            <p>1lb skim cheese</p>
            <p>1lb skim cheese</p>
          </div>
          <div className="directions">
            <h1>Directions</h1>
            <ul>
              <li>
                <h1>1.</h1>
                <p>test</p>
              </li>
              <li>
                <h1>2.</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </li>
              <li>
                <h1>3.</h1>
                <p>done</p>
              </li>
            </ul>
          </div>
          <div className="comments">
            <h1>Comments</h1>
            <div className="postArthur">
              <img
                src="https://via.placeholder.com/60"
                alt="John Smith Profile"
              />
              <h3>John Smith</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
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
        }
        .topButtons button {
          border: 1px solid #262626;
          background-color: transparent;
          color: #262626;
          width: 4rem;
          padding: 0.2rem;
          margin: 0 1rem 1rem 0;
        }
        .heroImage img {
          width: 100%;
          border-radius: 2rem;
        }
        .macroStats {
          color: #262626;
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

export default FoodPost
