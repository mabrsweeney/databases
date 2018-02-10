var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT messages.id, messages.message, users.username, rooms.roomname FROM messages, users, rooms WHERE rooms.ID = messages.room_id AND users.ID = messages.user_id;', 
        (err, messageLog) => {
          if (err) { throw err; }
          cb(messageLog);
        });
    
    }, // a function which produces all the messages
    post: function ({message, username, roomname}, cb) {
      var userIdSql = 'SELECT id FROM users WHERE username = ' + JSON.stringify(username);
      var roomIdSql = 'SELECT id FROM rooms WHERE roomname = ' + JSON.stringify(roomname);
      var messageSql = JSON.stringify(message);
      debugger;
      db.query(userIdSql, (err, userResult) => {
        if (err) { throw err; }
        db.query(roomIdSql, (err, roomResult) => {
          if (err) { throw err; }
          var sql = 'INSERT INTO messages (message, user_id, room_id) VALUES ('
                    + messageSql + ',' + userResult[0].id + ',' + roomResult[0].id + ');';
          
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
      var sql = 'insert into users (username) values (' + name + ') on duplicate key update username = ' + name + ';'//'INSERT IGNORE INTO users (username) VALUES (' + name + ');';
      console.log(sql);
      db.query(sql, (err, result) => {
        if (err) { throw err; }
        console.log('Users: 1 record inserted!');
        cb(); // Invokes res.end()
      });
    }
  }
};

