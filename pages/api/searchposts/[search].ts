import { model } from 'mongoose'

const FoodPostModel = model('foodPost')

const searchAllFoodPosts = async (req, res) => {
  const {
    query: { search },
  } = req
  const result = await FoodPostModel.find({
    title: { $regex: `${search}`, $options: '-i' },
  })
  res.send(result)
  console.log(result)
}

export default searchAllFoodPosts
