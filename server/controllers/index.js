var models = require('../models');
var bluebird = require('bluebird');

// {
//   "results": [
//     {
//       "username":"john",
//       "message":"how about this?",
//       "roomname":"lobby",
//       "createdAt":"2015-12-02T00:29:35.034Z"
//     },
//     {
//       "username":"me",
//       "message":"does this work?",
//       "roomname":"lobby",
//       "createdAt":"2015-12-01T23:32:29.175Z"
//     }
//   ]
// }

module.exports = {
  // http://127.0.0.1:3000/classes/messages
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {

    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      // req.body holds the data to store in the database.

      res.setHeader('Content-Type', 'application/JSON')
      res.write('you posted:\n')
      res.end(JSON.stringify(req.body, null, 2))
    }
  },

  // http://127.0.0.1:3000/classes/users
  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
