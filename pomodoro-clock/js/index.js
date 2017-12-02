var beep = new Audio("http://freesound.org/data/previews/331/331419_3832191-lq.mp3");
var breakTime = 300;
var workTime = 1500;
var displayMin, displaySec, totalSeconds, workInterval, breakInterval;
var startStop = "start";

$(document).ready(function(){
  /* Clicking the "Start" button initiates timer and displays "WORK/BREAK" text on the screen.
     Clicking the "Stop" button clears all timers, hides the "WORK/BREAK" text, and resets the clock. */
  $("#startStop").click(function() {
    if(startStop === "start"){
      totalSeconds = workTime-1;
      workInterval = setInterval(timer, 1000);
      $("#workBreakText").css("visibility","visible");
      $("#startStop").toggleClass("btn-outline-primary btn-outline-danger");
      $("#startStop").html("Stop");
      startStop = "stop";
    } else {
      totalSeconds = workTime-1;
      workInterval = clearInterval(workInterval);
      breakInterval = clearInterval(breakInterval);
      $("#workBreakText").css("visibility","hidden");
      $("#workBreakText").css("background-color","#ffb2b2")
      $("#workBreakText").html("<b>W O R K</b>");
      $("#startStop").toggleClass("btn-outline-primary btn-outline-danger");
      $("#startStop").html("Start");
      $("#clock").html(workTime/60+":00");
      startStop = "start";
    }
  });
  
  /* Up and down arrows for break and work time increment/decrement respective times.
     They don't do anything if timer is running. */
  $("#breakUp").click(function() {
    if(startStop==="start"){
      breakTime+=60;
      $("#breakDisplay").html(breakTime/60);
    }
  });
  $("#breakDown").click(function() {
    if(startStop==="start" && breakTime>=120){
      breakTime-=60;
      $("#breakDisplay").html(breakTime/60);
    }
  });
  $("#workUp").click(function() {
    if(startStop==="start"){
      workTime+=60;
      $("#workDisplay").html(workTime/60);
      $("#clock").html(workTime/60+":00");
    }
  });
  $("#workDown").click(function() {
    if(startStop==="start" && workTime>=120){
      workTime-=60;
      $("#workDisplay").html(workTime/60);
      $("#clock").html(workTime/60+":00");
    }
  });
});

/* Timer function decrements display time every second. 
When time hits zero: play a beep sound, switch between "work" and "break" display, and start next timer. */
function timer(){ 
  if(totalSeconds<0){
    beep.play();
    if(workInterval){
      $("#workBreakText").css("background-color","#d1ffd8");
      $("#workBreakText").html("<b>B R E A K</b>");
      workInterval = clearInterval(workInterval);
      totalSeconds = breakTime;
      breakInterval = setInterval(timer, 1000);
    } else {
      $("#workBreakText").css("background-color","#ffb2b2")
      $("#workBreakText").html("<b>W O R K</b>");
      breakInterval = clearInterval(breakInterval);
      totalSeconds = workTime;
      workInterval = setInterval(timer, 1000);
    }
  }
  
  displayMin=Math.floor(totalSeconds/60);
  displaySec=totalSeconds%60;
  if(displaySec<10)
    displaySec="0"+displaySec;
  $("#clock").html(displayMin+":"+displaySec);
  totalSeconds-=1;
}