var bluebird = require('bluebird');
// var mysql = bluebird.promisifyAll(require('mysql'));
var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'chat'
});

// exports.connect = function () {
//   connection.connect();
// }

exports.disconnect = function () {
  connection.end();
}

exports.insert = function (values, table) { // values (username, message, roomname, createdAt)
  table = table || 'messages';

  connection.connect(function(err) {
    connection.query('INSERT INTO messages SET ?', values, function (err, result){
      console.log('insert err', err, 'insert result', result);
      connection.end();
    }) ;
  });
}

exports.fetch = function (callback, table) {
  table = table || 'messages';

  connection.connect(function(err) {
    connection.query('SELECT * FROM messages', function (err, rows, fields){
      console.log('fetch err', err, 'fetch rows n fields', rows);
      callback(rows);
    });
  })

}

// var post  = {id: 1, title: 'Hello MySQL'};
// var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
//   // Neat!
// });

//       connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });





