const bluebird = require('bluebird')
const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true, // avoids DeprecationWarning: current URL string parser is deprecated
  useCreateIndex: true, // avoids DeprecationWarning: collection.ensureIndex is deprecated.
  useFindAndModify: false, // avoids DeprecationWarning: collection.findAndModify is deprecated.
  useUnifiedTopology: true, // avoids DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
}

module.exports.connectDatabase = () =>
  mongoose.createConnection(
    'mongodb+srv://josh:josh123@macrosocial-yeplw.mongodb.net/test?retryWrites=true&w=majority',
    options
  )

//= ===========================================================//
//* MONGO DB CONFIG */
//= ===========================================================//
mongoose.connect(
  'mongodb+srv://josh:josh123@macrosocial-yeplw.mongodb.net/test?retryWrites=true&w=majority',
  options
) // connect to our mongodb database

mongoose.Promise = bluebird // bluebird for mongoose promises
