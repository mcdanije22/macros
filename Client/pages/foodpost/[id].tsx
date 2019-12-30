import React from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

const FoodPost: React.FC = () => {
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
            <li>Overview</li>
            <li>Ingredients</li>
            <li>Directions</li>
            <li>Comments</li>
          </ul>
        </nav>
        <hr />
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
          <div className="Ingredients">
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
          <div className="Direction ">
            <h1>Summary</h1>
            <ul>
              <li>
                <h1>1</h1>
                <p>test</p>
              </li>
              <li>
                <h1>2</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </li>
              <li>
                <h1>3</h1>
                <p>done</p>
              </li>
            </ul>
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
          margin: 1rem 0;
          color: #707070;
        }
        .mainInfo p {
          color: #707070;
        }
        .Ingredients p {
          margin: 1rem 0;
        }
        .Direction ul {
          list-style: none;
        }
        .Direction li {
          display: flex;
        }
        .Direction h1 {
          margin-right: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default FoodPost
