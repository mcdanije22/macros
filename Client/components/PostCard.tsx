import React from 'react'
import Link from 'next/link'
import { Icon, Card } from 'antd'

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
  return (
    <Link href="/foodpost/[id]" as={`/foodpost/${id}`}>
      <Card cover={<img alt="food image" src={`foodPhoto`} />}>
        <style jsx>{`
          * {
            color: white;
            margin: 0;
          }
        `}</style>
      </Card>
    </Link>
  )
}
export default PostCard
