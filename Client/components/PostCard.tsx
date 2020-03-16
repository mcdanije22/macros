import React from 'react'
import Link from 'next/link'
import { Icon, Card, Avatar, Button } from 'antd'

interface Post {
  id: String
  userName: String
  title: String
  tags: Array<String>
  saves: Number
  macros: Object
  foodPhoto: String
}

const PostCard: React.FC<Post> = ({
  userName,
  id,
  title,
  tags,
  saves,
  macros,
  foodPhoto,
}) => {
  const { protein, fat, carbohydrates, calories }: any = macros
  const { Meta } = Card
  return (
    <Link href="/foodpost/[id]" as={`/foodpost/${id}`}>
      <Card
        style={{ marginBottom: '1rem', borderRadius: '1rem' }}
        cover={
          <img
            style={{ borderRadius: '.9rem .9rem 0 0' }}
            alt="food image"
            src={`${foodPhoto}`}
          />
        }
      >
        <div className="titleHeader">
          <div className="leftSideTitle">
            <Avatar
              src={`https://avatars.dicebear.com/v2/initials/${userName}.svg`}
              style={{ alignSelf: 'center' }}
            />
            <h2>{title}</h2>
          </div>
          <p style={{ color: 'black', alignSelf: 'center' }}>{saves} Saves</p>
        </div>
        <div className="mainInfo">
          <h2>{`${protein}P ${carbohydrates}C ${fat}F`}</h2>
          <h2>{calories} Calories</h2>
        </div>
        <div className="bottomTags">
          {tags.slice(0, 3).map((tag, i) => {
            return (
              <Link href="test" key={i}>
                <Button
                  type="primary"
                  ghost
                  style={{ margin: '1rem .5rem 0 0' }}
                >
                  {tag}
                </Button>
              </Link>
            )
          })}
        </div>
        <style jsx>{`
          * {
            color: white;
            margin: 0;
          }
          .mainInfo h2 {
            color: #8c8c8c;
          }
          h2 {
            color: black;
          }
          .titleHeader {
            display: flex;
            justify-content: space-between;
          }
          .leftSideTitle {
            display: flex;
          }
          .titleHeader h2 {
            margin-left: 1rem;
          }
        `}</style>
      </Card>
    </Link>
  )
}
export default PostCard
