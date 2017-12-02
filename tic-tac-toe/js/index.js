var beep = new Audio("http://freesound.org/data/previews/363/363210_5450487-lq.mp3");
var p, c, timeout;

$(document).ready(function(){
  $(".contentContainer").click(check);
  $(".playButton").click(play);
  $("#restartButton").click(function(){
    $("#intro").css("display","flex");
    $("#endScreen").css("display","none");
  });
});

function play(){
  p = $('input[name=playerPiece]:checked').val();
  c = $('input[name=playerPiece]:not(:checked)').val();
  $(".content").html("");
  $("#intro").css("display","none");
  $("#endScreen").css("display","none");
  $("#gameBoard").css("display","flex");
}

function check(){
  if(!timeout && $("#"+this.id+"Content").html()===""){  
    beep.play();
    $("#"+this.id+"Content").html(p);
    if(checkWin())
      timeout = setTimeout(function(){endScreen("Player Wins!")},1000);
    else if(checkFull())
      timeout = setTimeout(function(){endScreen("Draw!")},1000);
    else 
      timeout = setTimeout(computerTurn,1000);
  }
}

function computerTurn(){
  if(compWinOrPlayerBlock(c)){ //Computer checks to see if it can win.
    beep.play();
    $(compWinOrPlayerBlock(c)).html(c);
    timeout = setTimeout(function(){endScreen("Computer Wins!")},1000);
  } else if(compWinOrPlayerBlock(p)){ //Computer checks to see if it can block player from winning next turn.
    beep.play();
    $(compWinOrPlayerBlock(p)).html(c);
    timeout=clearTimeout(timeout);
  } else{
    beep.play();
    $(randomOpenSpot()).html(c); //Computer picks a random spot.
    timeout=clearTimeout(timeout);
  }
}

/* Checks to see if player won. */
function checkWin(){  
  if($("#topLeftContent").html()===p && $("#topContent").html()===p && $("#topRightContent").html()===p ||
     $("#centerLeftContent").html()===p && $("#centerContent").html()===p && $("#centerRightContent").html()===p ||
     $("#bottomLeftContent").html()===p && $("#bottomContent").html()===p && $("#bottomRightContent").html()===p ||
     $("#topLeftContent").html()===p && $("#centerLeftContent").html()===p && $("#bottomLeftContent").html()===p ||
     $("#topContent").html()===p && $("#centerContent").html()===p && $("#bottomContent").html()===p ||
     $("#topRightContent").html()===p && $("#centerRightContent").html()===p && $("#bottomRightContent").html()===p ||
     $("#topLeftContent").html()===p && $("#centerContent").html()===p && $("#bottomRightContent").html()===p ||
     $("#topRightContent").html()===p && $("#centerContent").html()===p && $("#bottomLeftContent").html()===p)
    return true;
  else
    return false;
}

/* If c is passed through, checks to see if computer can win.
   If p is passed through, checks to see if computer can block player from winning. */
function compWinOrPlayerBlock(k){
  var options = [];
  if($("#topLeftContent").html()==="")
    if($("#topContent").html()===k && $("#topRightContent").html()===k || 
       $("#centerContent").html()===k && $("#bottomRightContent").html()===k || 
       $("#centerLeftContent").html()===k && $("#bottomLeftContent").html()===k)
      options.push("#topLeftContent");
  if($("#topContent").html()==="")
    if($("#topLeftContent").html()===k && $("#topRightContent").html()===k || 
       $("#centerContent").html()===k && $("#bottomContent").html()===k)
      options.push("#topContent");
  if($("#topRightContent").html()==="")
    if($("#topLeftContent").html()===k && $("#topContent").html()===k || 
       $("#centerContent").html()===k && $("#bottomLeftContent").html()===k || 
       $("#centerRightContent").html()===k && $("#bottomRightContent").html()===k)
      options.push("#topRightContent");
  if($("#centerLeftContent").html()==="")
    if($("#topLeftContent").html()===k && $("#bottomLeftContent").html()===k || 
       $("#centerContent").html()===k && $("#centerRightContent").html()===k)
      options.push("#centerLeftContent");
  if($("#centerContent").html()==="")
    if($("#topLeftContent").html()===k && $("#bottomRightContent").html()===k ||
       $("#topRightContent").html()===k && $("#bottomLeftContent").html()===k ||
       $("#topContent").html()===k && $("#bottomContent").html()===k || 
       $("#centerLeftContent").html()===k && $("#centerRightContent").html()===k)
      options.push("#centerContent");
  if($("#centerRightContent").html()==="")
    if($("#topRightContent").html()===k && $("#bottomRightContent").html()===k || 
       $("#centerLeftContent").html()===k && $("#centerContent").html()===k)
      options.push("#centerRightContent");
  if($("#bottomLeftContent").html()==="")
    if($("#topLeftContent").html()===k && $("#centerLeftContent").html()===k || 
       $("#centerContent").html()===k && $("#topRightContent").html()===k || 
       $("#bottomContent").html()===k && $("#bottomRightContent").html()===k)
      options.push("#bottomLeftContent");
  if($("#bottomContent").html()==="")
    if($("#bottomLeftContent").html()===k && $("#bottomRightContent").html()===k || 
       $("#centerContent").html()===k && $("#topContent").html()===k)
      options.push("#bottomContent");
  if($("#bottomRightContent").html()==="")
    if($("#topLeftContent").html()===k && $("#centerContent").html()===k || 
       $("#bottomLeftContent").html()===k && $("#bottomContent").html()===k || 
       $("#topRightContent").html()===k && $("#centerRightContent").html()===k)
      options.push("#bottomRightContent");
  return options[[Math.floor(Math.random()*options.length)]];
}

/* Computer places a piece on a random empty spot. */
function randomOpenSpot(){
  var options = [];
  if($("#topLeftContent").html()==="")
      options.push("#topLeftContent");
  if($("#topContent").html()==="")
      options.push("#topContent");
  if($("#topRightContent").html()==="")
      options.push("#topRightContent");
  if($("#centerLeftContent").html()==="")
      options.push("#centerLeftContent");
  if($("#centerContent").html()==="")
      options.push("#centerContent");
  if($("#centerRightContent").html()==="")
      options.push("#centerRightContent");
  if($("#bottomLeftContent").html()==="")
      options.push("#bottomLeftContent");
  if($("#bottomContent").html()==="")
      options.push("#bottomContent");
  if($("#bottomRightContent").html()==="")
      options.push("#bottomRightContent");
  return options[[Math.floor(Math.random()*options.length)]];
}

/* Checks to see if board is full. */
function checkFull(){
  if($("#topLeftContent").html()==="" ||
     $("#topContent").html()==="" ||
     $("#topRightContent").html()==="" ||
     $("#centerLeftContent").html()==="" ||
     $("#centerContent").html()==="" ||
     $("#centerRightContent").html()==="" ||
     $("#bottomLeftContent").html()==="" ||
     $("#bottomContent").html()==="" ||
     $("#bottomRightContent").html()==="")
    return false;
  else
    return true;
}

function endScreen(winnerString){
  $("#winner").html(winnerString);
  if(winnerString==="Player Wins!")
    $("#winner").css("background-color","#d1ffd8");
  else if(winnerString==="Computer Wins!")
    $("#winner").css("background-color","#ffb2b2");
  else if(winnerString==="Draw!")
    $("#winner").css("background-color","#bcd6ff");
  $("#endScreen").css("display","flex");
  $("#gameBoard").css("display","none");
  timeout = clearTimeout(timeout);
}