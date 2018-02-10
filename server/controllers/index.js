var models = require('../models');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('MESSAGES GET');
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('MESSAGES POST');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('USERS GET:', req);
    },
    post: function (req, res) {
      var name = JSON.stringify(req.body.username);
      db.connect((err) => {
        if (err) { throw err; }
        console.log('an actual emoji connected!');
        var sql = 'INSERT INTO users (name) VALUES (' + name + ');';
        db.query(sql, function(err, result) {
          if (err) { throw err; }
          console.log('1 record inserted!');
        });
      });      
    }
  }
};

