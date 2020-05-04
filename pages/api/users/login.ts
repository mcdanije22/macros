import { model } from 'mongoose'

const UserModel = model('user')

const logUserIn = async (req, res) => {
  const { email, password } = req.body
  UserModel.findOne({ email }).then(user => {
    if (!user || user.password !== password) {
      return res.status(400).json('Incorrect email or password')
    } else {
      res.send(user)
      console.log(user)
    }
  })
}

export default logUserIn
