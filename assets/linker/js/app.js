/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    console.log("This is from the connect:", this.socket.sessionid);

    // Listen for Comet messages from Sails
    socket.on('message', cometMessageReceivedFromServer);

    // Subscribe to the user model classroom and instance room
    socket.get('/user/subscribe');

    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);


// Routes the message based on the model which issued it
function cometMessageReceivedFromServer(message) {
  // log('New comet message received :: ', message);
  console.log("Here's the message: ", message);

  if (message.model === 'user') {
    var userId = message.id;
    updateUserInDom(userId, message);

    if (message.verb !== 'destroy') {
      displayFlashActivity(message);
    }
  }
}

function displayFlashActivity(message) {
  $('#chatAudio')[0].play();
  var msg = message.data.name + message.data.action;
  var alertdiv = "<div class='alert alert-success'>" + msg + "</div>";
  $('.navbar').after(alertdiv);
  $('.alert').fadeOut(5000);
}

function updateUserInDom(userId, message) {
  var page = document.location.pathname;

  page = page.replace(/(\/)$/, '');

  switch (page) {
    case '/user':
      if (message.verb === 'update')  {
        UserIndexPage.updateUser(userId, message);
      }
      if (message.verb === 'create')  {
        UserIndexPage.addUser(message);
      }
      if (message.verb === 'destroy')  {
        UserIndexPage.destroyUser(userId);
      }
      break;
  }
}

var UserIndexPage = {

  updateUser: function (id, message) {
    if (message.data.loggedIn) {
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-online.jpg");
    } else {
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-offline.jpg");
    }
  },

  // Add a user to the list of users in the User Admin Page
  addUser: function (user) {

    // obj is going to encompass both the new user data as well as the _csrf info
    // from the layout.ejs file
    var obj = {
      user: user.data,
      _csrf: window.overlord.csrf || ''
    };

    // Add the template to the bottom of the User Administration Page
    $('tr:last').after(
      JST['assets/linker/templates/addUser.ejs'](obj)
    )
  },

  destroyUser: function(id) {
    $('tr[data-id="' + id + '"]').remove();
  }
};
