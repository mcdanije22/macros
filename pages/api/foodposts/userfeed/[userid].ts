import { model } from 'mongoose'

const FoodPostModel = model('foodPost')
const UserModel = model('user')

const getUserFeed = async (req, res) => {
  const {
    query: { userid },
  } = req
  try {
    const user = await UserModel.findById(userid)
    const userFeed = await FoodPostModel.find({
      $or: [{ 'user._id': user.following }, { 'user._id': user._id }],
    })
    res.send(userFeed)
    console.log(userFeed)
  } catch (error) {
    console.log(error)
  }
}

export default getUserFeed
