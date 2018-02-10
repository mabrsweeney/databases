var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('MESSAGES GET:');
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, ()=> { res.end(); });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('USERS GET:', req);
    },
    post: function (req, res) {
      var name = JSON.stringify(req.body.username);
      models.users.post(name, ()=> { res.end(); }); //Sends name to models for injection
    }
  }
};

