var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      
    }, // a function which produces all the messages
    post: function ({message, username, roomname}, cb) {
      var userIdSql = 'SELECT id FROM users WHERE name = ' + JSON.stringify(username);
      var roomIdSql = 'SELECT id FROM rooms WHERE name = ' + JSON.stringify(roomname);
      var messageSql = JSON.stringify(message);
      
      db.query(userIdSql, (err, userResult) => {
        if (err) { throw err; }
        db.query(roomIdSql, (err, roomResult) => {
          if (err) { throw err; }
          var sql = 'INSERT INTO messages (message, user_id, room_id) VALUES ('
                    + messageSql + ',' + userResult[0].id + ',' + roomResult[0].id + ');';
          console.log(messageSql);
          db.query(sql, (err, result) => {
            if (err) { throw err; }
            
            console.log('Messages: ', result);
            cb();
          });
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      
    },
    post: function (name, cb) {
      var sql = 'INSERT INTO users (name) VALUES (' + name + ');';
  
      db.query(sql, (err, result) => {
        if (err) { throw err; }
        console.log('Users: 1 record inserted!');
        cb(); // Invokes res.end()
      });
    }
  }
};

