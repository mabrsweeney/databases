var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};


module.exports = {
  messages: {
    get: function (req, res) {
      //console.log('MESSAGES GET:', req);
      models.messages.get((data) => { 
        res.writeHead(200, 'Success!', headers);
        var resObj = {};
        resObj.results = data;
        res.end(JSON.stringify(resObj)); 
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
 
      models.messages.post(req.body, ()=> { 
        res.writeHead(201, 'Success!', headers);
        res.end(); 
      });
   
      
    }, // a function which handles posting a message to the database
    
    options: function(req, res) {
      res.writeHead(200, headers);
      res.end();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      
      res.writeHead(201, 'Success!', headers);
      res.end();
    },
    post: function (req, res) {
      console.log(req.body);
      var name = JSON.stringify(req.body.username);
      models.users.post(name, ()=> { 
        res.writeHead(201, 'Success!', headers);
        res.end(); 
      }); //Sends name to models for injection
    },
    options: function(req, res) {
      res.writeHead(200, headers);
      res.end();
    }
  },
  
  rooms: {
    // Ditto as above
    get: function (req, res) {
      res.writeHead(200, 'Success!', headers);
      res.end();
    },
    post: function (req, res) {
      console.log(req.body);
      var name = JSON.stringify(req.body.roomname);
      models.rooms.post(name, ()=> { 
        res.writeHead(201, 'Success!', headers);
        res.end(); 
      }); //Sends name to models for injection
    },
    options: function(req, res) {
      res.writeHead(200, headers);
      res.end();
    }
  }
};

