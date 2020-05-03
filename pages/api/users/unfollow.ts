import { model } from 'mongoose'

const UserModel = model('user')

const unfollowUser = async (req, res) => {
  const { loggedUser, userId } = req.body
  const LoggedInUser = await UserModel.findOne({ _id: loggedUser })
  const followedUser = await UserModel.findOne({ _id: userId })
  if (!LoggedInUser.following.includes(userId)) {
    return res.status(400).json('Not following user!')
  } else {
    await UserModel.updateOne(
      { _id: LoggedInUser._id },
      { $pull: { following: followedUser._id } }
    )
    LoggedInUser.followingCount--
    LoggedInUser.save()
    await UserModel.updateOne(
      { _id: followedUser._id },
      { $pull: { followers: LoggedInUser._id } }
    )
    followedUser.followerCount--
    followedUser.save()
    return res.status(200).json('Stopped following user!')
  }
}

export default unfollowUser
