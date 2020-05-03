import { model } from 'mongoose'

const UserModel = model('user')

const deleteNotification = async (req, res) => {
  const { newNotificationsList, userId } = req.body
  const user = await UserModel.findOne({ _id: userId })
  try {
    await UserModel.updateOne(
      { _id: user._id },

      { $set: { notifications: newNotificationsList } }
    )
    await user.save()
    return res.status(200).json('Notification deleted')
  } catch (error) {
    console.log(error)
  }
}
export default deleteNotification
