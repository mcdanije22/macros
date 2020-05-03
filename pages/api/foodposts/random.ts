import { model } from 'mongoose'

const FoodPostModel = model('foodPost')

const getAllPost = async (req, res) => {
  try {
    const randomPost = await FoodPostModel.aggregate([{ $sample: { size: 1 } }])
    console.log(randomPost)
    res.json(randomPost)
  } catch (error) {
    console.log(error)
  }
}

export default getAllPost
