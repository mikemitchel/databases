var models = require('../models');
var bluebird = require('bluebird');
var db = bluebird.promisifyAll(require('../db/index.js'));

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
      db.fetchAsync(function(results) {
        // format here
        res.end('{"results":' + JSON.stringify(results) + '}');
      })
      .then(db.disconnect);
      //

    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      req.body.createdAt = new Date();
      db.insertAsync(req.body);

      console.log('POST req.body', req.body)
      // req.body holds the data to store in the database.

      var statusCode = 201;
      res.setHeader('Content-Type', 'application/JSON');
      res.writeHead(statusCode);
      res.write('you posted:\n');

      // Send all data here.
      res.end(JSON.stringify(req.body, null, 2));

    }
  },

  // http://127.0.0.1:3000/classes/users
  users: {
    // Ditto as above
    get: function (req, res) {exports.messages.get()},
    post: function (req, res) {exports.messages.post()}
  }
};


