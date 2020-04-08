import React from 'react'
import Link from 'next/link'
import { Icon } from 'antd'

interface Post {
  id: String
  userName: String
  title: String
  tags: Array<String>
  saves: Number
  macros: Object
  foodPhoto: String
}

const FoodCard: React.FC<Post> = ({
  userName,
  id,
  title,
  tags,
  saves,
  macros,
  foodPhoto,
}) => {
  const { protein, fat, carbohydrates, calories }: any = macros
  return (
    <Link href="/foodpost/[id]" as={`/foodpost/${id}`}>
      <div className="cardContainer">
        <div className="topBar">
          <p>{calories} Calories</p>
          <p> {saves} Saves</p>
        </div>
        <div className="mainInfo">
          <h1>{title}</h1>
          <h2>{`${protein}P ${carbohydrates}C ${fat}F`}</h2>
          <h5>{`by ${userName}`}</h5>
        </div>
        <div className="bottomBar">
          <div className="bottomTags">
            {tags.slice(0, 2).map((tag, i) => {
              return (
                <Link href="test" key={i}>
                  <button type="button">{tag}</button>
                </Link>
              )
            })}
          </div>
        </div>
        <style jsx>{`
          * {
            color: white;
            margin: 0;
          }
          .cardContainer {
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
              ),
              url(${foodPhoto});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: 12rem;
            max-width: 350px;
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
            padding: 0 0 0.5rem 0.5rem;
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
            padding: 0.2rem;
          }
        `}</style>
      </div>
    </Link>
  )
}
export default FoodCard
