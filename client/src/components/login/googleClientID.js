require('dotenv').config()

let clientID = function() => {
  return process.env.GOOGLE_CLIENTID
}

module.exports = { clientID }