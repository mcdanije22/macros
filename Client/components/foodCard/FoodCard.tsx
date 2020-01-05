import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  fab,
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const FoodCard = () => {
  return (
    <Link href="/foodpost/1">
      <div className="cardContainer">
        <div className="topBar">
          <p>200 Saves</p>
        </div>
        <div className="mainInfo">
          <h1>Keto Pizza</h1>
          <h2>30p 20c 5f</h2>
          <h5>John Smith</h5>
        </div>
        <div className="bottomBar">
          <div className="bottomTags">
            <Link href="test">
              <button type="button">Keto</button>
            </Link>
            <Link href="test">
              <button type="button">Protein</button>
            </Link>
          </div>
          <ul className="bottomSocial">
            <li>
              <FontAwesomeIcon icon={faFacebook} />
            </li>
            <li>
              {' '}
              <FontAwesomeIcon icon={faInstagram} />
            </li>
            <li>
              <FontAwesomeIcon icon={faTwitter} />
            </li>
          </ul>
        </div>
        <style jsx>{`
          .cardContainer {
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
              ),
              url('https://nobunplease.com/wp-content/uploads/bb-plugin/cache/keto-low-carb-pizza-dip-landscape.jpg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: 12rem;
            border: 1px #707070 solid;
            border-radius: 1rem;
            color: white;
            padding: 0.5rem;
            box-shadow: 0 6px 14px #aaaaaa;
            margin: 1rem 0;
          }
          .topBar {
            text-align: right;
          }
          .mainInfo {
            padding: 1.5rem 0 0.5rem 0.5rem;
          }
          ,
          mainInfo h1 {
            font-weight: lighter;
          }
          .bottomBar {
            display: flex;
            justify-content: space-between;
          }
          .bottomSocial {
            display: flex;
            list-style: none;
          }
          .bottomSocial li {
            padding: 0 0.2rem;
          }
          .bottomTags {
            display: flex;
            padding-left: 0.5rem;
          }
          .bottomTags button {
            border: 1px solid white;
            background-color: transparent;
            width: 4rem;
            text-align: center;
            margin-right: 0.5rem;
            color: white;
            padding: 0.1rem;
          }
        `}</style>
      </div>
    </Link>
  )
}
export default FoodCard
