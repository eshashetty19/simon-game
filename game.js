buttonColours=["red", "blue", "green", "yellow"]; // Array of button colors
gamePattern=[]; // Array to store the game pattern
userClickedPattern=[]; // Array to store the user's clicked pattern
var started=false; // Flag to check if the game has started
var level=0; // Variable to track the current level
$(document).keypress(function(event){
    if(!started){
      $("#level-title").text("Level " + level); // Update the title with the current level
      nextSequence(); // Call the nextSequence function to start the game
      started=true; // Set the started flag to true
    }
  });
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); // Get the id of the clicked button
    userClickedPattern.push(userChosenColour); // Add the user's chosen color to their pattern
    playSound(userChosenColour); // Play the sound for the chosen color
    animatePress(userChosenColour); // Animate the button press
    checkAnswer(userClickedPattern.length-1); // Check the user's answer
});
// Function to check the user's answer
function checkAnswer(currentLevel){
    // Check if the user's answer matches the game pattern
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success"); // Log success if the answer is correct
        // Check if the user has completed their sequence
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence(); // Call nextSequence after a delay
            },1000); // Delay of 1000 milliseconds (1 second)
        }
    }else{
        console.log("wrong"); // Log wrong if the answer is incorrect
        $("#level-title").text("Game Over, Press Any Key to Restart"); // Update the title for game over
        playSound("wrong"); // Play the wrong sound
        $("body").addClass("game-over"); // Add game-over class to the body for animation
        setTimeout(function(){
            $("body").removeClass("game-over"); // Add game-over class to the body for animation
        },200); // Delay for the animation
       startover(); // Call startover function to reset the game
    }
}
function startover(){
    level=0; // Reset the level to 0
    gamePattern=[]; // Reset the game pattern
    started=false; // Set the started flag to false
}
function nextSequence(){
    level++; // Increment the level
    $("#level-title").text("Level " + level); // Update the title with the current level
    randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 1 and 4
    randomChosenColour = buttonColours[randomNumber]; // Select a color based on the random number
    gamePattern.push(randomChosenColour); // Add the chosen color to the game pattern
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Animate the button
    playSound(randomChosenColour); // Play the sound for the chosen color

    

}
 function playSound(name){
    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play(); // Play the sound associated with the color
 }

 function animatePress(currentColor){
    $("#" +currentColor).addClass("pressed"); // Add the pressed class to the button
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); // Remove the pressed class after a delay
    
    },100); // Delay for the animation
 }