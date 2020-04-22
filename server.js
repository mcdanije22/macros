// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const mongoose = require('mongoose')

// const app = express()
// const PORT = process.env.PORT || 5000

// app.use(bodyParser.json())
// app.use(cors())

// app.listen(PORT, () => console.log(`server started successfully on ${PORT}`))

const dburi =
  process.env.MONGODB_URI ||
  'mongodb+srv://josh:josh123@macrosocial-yeplw.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dburi, { useNewUrlParser: true }, () => {
  console.log('db connected')
})

const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const postsRoutes = require('./routes/postRoutes')
// const userRoutes = require('./routes/userRoutes')
// const searchPostsRoutes = require('./routes/searchPostsRoutes')

// app.use('/foodposts', postsRoutes)
// app.use('/users', userRoutes)
// app.use('/searchposts', searchPostsRoutes)

app.prepare().then(() => {
  const server = express()

  server.get('/foodposts', (req, res) => {
    return app.render(req, res, '/foodposts', req.query)
  })

  server.get('/users', (req, res) => {
    return app.render(req, res, '/users', req.query)
  })

  server.get('/searchposts', (req, res) => {
    return app.render(req, res, '/searchposts', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
