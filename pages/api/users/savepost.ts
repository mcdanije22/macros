import { model } from 'mongoose'

const UserModel = model('user')
const FoodPostModel = model('foodPost')
const NotificationModel = model('notification')

const savePost = async (req, res) => {
  const { postId, userId, postUserId } = req.body
  const user = await UserModel.findOne({ _id: userId })
  const post = await FoodPostModel.findOne({ _id: postId })
  const postUser = await UserModel.findOne({ _id: postUserId })
  if (user.saves.includes(post._id)) {
    return res.status(400).json('Already saved')
  } else {
    await user.saves.push(post._id)
    await user.save()
    post.saves++
    await post.save()

    if (userId != postUserId) {
      const newNotification = new NotificationModel({
        actionDate: new Date(),
        actionUserName: user.userName,
        message: `${user.userName} liked your ${post.title} post`,
        href: `/foodpost/[id]`,
        as: `/foodpost/${post._id}`,
      })
      postUser.notifications.push(newNotification)
    }
    await postUser.save()
    res.send('Post saved')
  }
}

export default savePost
