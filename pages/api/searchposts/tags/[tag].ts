import { model } from 'mongoose'

const FoodPostModel = model('foodPost')

const searchFoodPostsByTag = async (req, res) => {
  const {
    query: { tag },
  } = req
  const result = await FoodPostModel.find({
    tags: { $regex: `${tag}`, $options: '-i' },
  })
  res.send(result)
}

export default searchFoodPostsByTag
