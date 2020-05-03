import { model } from 'mongoose'

const UserModel = model('user')

const getSpecificUser = async (req, res) => {
  const {
    query: { userid },
  } = req
  const user = await UserModel.findById(userid, {
    userName: 1,
    fullName: 1,
    posts: 1,
    saves: 1,
    followingCount: 1,
    followerCount: 1,
  })
    .populate('posts')
    .populate('saves')
    .populate('following')
  res.send(user)
}

export default getSpecificUser
