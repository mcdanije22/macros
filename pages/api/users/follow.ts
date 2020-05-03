import { model } from 'mongoose'

const UserModel = model('user')
const NotificationModel = model('notification')

const followUser = async (req, res) => {
  const { loggedUser, userId } = req.body
  const LoggedInUser = await UserModel.findOne({ _id: loggedUser })
  const followedUser = await UserModel.findOne({ _id: userId })
  if (LoggedInUser.following.includes(userId)) {
    return res.status(400).json('Already following')
  } else {
    await LoggedInUser.following.push(followedUser._id)
    LoggedInUser.followingCount++
    await LoggedInUser.save()
    await followedUser.followers.push(LoggedInUser._id)
    followedUser.followerCount++
    const newNotification = new NotificationModel({
      actionDate: new Date(),
      actionUserName: LoggedInUser.userName,
      message: `${LoggedInUser.userName} followed you`,
      href: `/user/[id]`,
      as: `/user/${LoggedInUser._id}`,
    })
    followedUser.notifications.push(newNotification)
    await followedUser.save()
    return res.status(200).json('Followed user')
  }
}

export default followUser
