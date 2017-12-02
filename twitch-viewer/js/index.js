$(document).ready(function() {
  loadStreamer("freecodecamp");
  loadStreamer("dreamleague");
  loadStreamer("forsenlol");
  
  $("#addForm").submit(function(){
    event.preventDefault();
    loadStreamer($("#inputStreamer").val());
  });
  
  $(document).on("click",".twitchStreamers",function(){
    var streamer = $(this).attr("id").slice(0,-5);
    window.open("https://www.twitch.tv/" + streamer);
  });
  
  $(document).on("click",".fa-times",function(){
    var streamer = $(this).attr("id").slice(0,-1);
    $("#" + streamer + "Entry").remove();
    $(this).stopPropogation();  //Prevents streamer page from opening when the 'x' is clicked.
  });
  
});

function loadStreamer(streamer) {
  $("#inputStreamer").val(""); //Clears text input field.

  if($("#" + streamer + "Entry").length===0){  //Checks if streamer is already in list.
    $.getJSON(
      "https://wind-bow.glitch.me/twitch-api/streams/" + streamer + "?callback=?",
      function(json) {
        if (!json.stream) {
          $("#offlineContent").append("<div class='row offlineStreamers twitchStreamers' id='" + streamer + "Entry'></div>");
          $("#" + streamer + "Entry").append("<h5 class='streamerText col-md-10' style='text-align:left'><b>" + streamer + " </b> is offline.</h5>");
          $("#" + streamer + "Entry").append("<h5 class='streamerText col-md-2'style='text-align:right'> <i class='fa fa-times' id='"+streamer+"X'></i></h5>");
        } else {
          $("#onlineContent").append("<div class='row onlineStreamers twitchStreamers' id='" + streamer + "Entry'></div>");
          $("#" + streamer + "Entry").append("<h5 class='streamerText col-md-10' style='text-align:left'><b>" + streamer + " </b> is playing " + json.stream.game + ".</h5>");
          $("#" + streamer + "Entry").append("<h5 class='streamerText col-md-2'style='text-align:right'><i class='fa fa-user'></i> " + json.stream.viewers + " viewers &nbsp &nbsp<i class='fa fa-times' id='"+streamer+"X'></i></h5>");
        }
      }
    );
  }
}