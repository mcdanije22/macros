import { model } from 'mongoose'

const FoodPostModel = model('foodPost')

const getSpecificFoodPost = async (req, res) => {
  const {
    query: { foodpostid },
  } = req
  try {
    const currentFoodPost = await FoodPostModel.findById(foodpostid)
    res.send(currentFoodPost)
  } catch (error) {
    console.log(error)
  }
}

export default getSpecificFoodPost
