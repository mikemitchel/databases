var controllers = require('./controllers');
var router = require('express').Router();
var _ = require('underscore');

for (var route in controllers) {
  // router.use(function(req, res, next) {
  //   _.extend(res.header, defaultCorsHeaders);
  //   console.log("res.header['Access-Control-Allow-Headers']", res.header)
  //   next();
  // })
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}


var defaultCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Max-Age": 10 // Seconds.
};

module.exports = router;

