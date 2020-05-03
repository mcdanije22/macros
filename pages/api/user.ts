import { model } from 'mongoose'

const User = model('user')

const getUsers = async (req, res) => {
  const users = await User.find()

  res.send(users)
}

export default getUsers
