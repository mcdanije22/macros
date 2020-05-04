import { model } from 'mongoose'

const FoodPostModel = model('foodPost')
const UserModel = model('user')
const CommentModel = model('comment')
const NotificationModel = model('notification')

const addComment = async (req, res) => {
  const {
    query: { userid },
  } = req
  const { postid, postUserId } = req.body
  const user = await UserModel.findById(userid, {
    userName: 1,
    photo: 1,
  })
  const postUser = await UserModel.findById(postUserId)
  try {
    const newComment = new CommentModel(req.body)
    const currentPost = await FoodPostModel.findById(postid)
    newComment.user = user
    currentPost.comments.push(newComment)
    await currentPost.save()
    if (userid != postUserId) {
      const newNotification = new NotificationModel({
        actionDate: new Date(),
        actionUserName: user.userName,
        message: `${user.userName} commented on your ${currentPost.title} post`,
        href: `/foodpost/[id]`,
        as: `/foodpost/${currentPost._id}`,
      })
      postUser.notifications.push(newNotification)
      await postUser.save()
    }
    res.send(currentPost)
  } catch (error) {
    console.log(error)
  }
}

export default addComment
