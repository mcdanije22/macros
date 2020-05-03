import { model } from 'mongoose'

const FoodPostModel = model('foodPost')
const UserModel = model('user')

const addNewFoodPost = async (req, res) => {
  res.send(req.body)
  const {
    query: { userid },
  } = req
  try {
    const newFoodPost = new FoodPostModel(req.body)
    const user = await UserModel.findById(userid)
    newFoodPost.user = {
      _id: user._id,
      userName: user.userName,
      following: user.following,
    }
    console.log(newFoodPost)
    await newFoodPost.save()
    user.posts.push(newFoodPost)
    await user.save()
    res.send(newFoodPost)
  } catch (error) {
    console.log(error)
  }
}

export default addNewFoodPost
