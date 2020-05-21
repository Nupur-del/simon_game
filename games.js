var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChoosenColour = buttonColors[randomNumber];
    
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    gamePattern.push(randomChoosenColour);
    
    playSound(randomChoosenColour);

}

$(document).keydown(function() {
    if(!started) {

        $("#level-title").text("Level " + level);

        nextSequence();
    
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    
    animationPress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});   

function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
}
function animationPress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {$("." + currentColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
       if(userClickedPattern.length === gamePattern.length){

        setTimeout( function() {
            nextSequence();
        }, 1000);
       }
   }
   else {
         name = "wrong";
         playSound(name);
         $("body").addClass("game-over");

         $("#level-title").text("Game Over, Press Any Key to Restart");

         setTimeout(function(){
            $("body").removeClass("game-over");
         },200);
         
         startOver();
   }
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}