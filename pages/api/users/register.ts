import { model } from 'mongoose'

const UserModel = model('user')

const registerUser = async (req, res) => {
  UserModel.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    } else {
      try {
        const newUser = new UserModel(req.body)
        const result = newUser.save()
        res.send(result)
      } catch (error) {
        console.log(error)
      }
    }
  })
}

export default registerUser
