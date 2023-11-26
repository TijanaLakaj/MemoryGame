
let buttonColors = ["green", "red", "yellow", "blue"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$("html").one("keydown", function() {

    generateRandomNumber(); 
    $("h1").text("Level " + level);

});

function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber]; // odabir nasumicne boje
    gamePattern.push(randomChosenColor); // dodavanje nasumicne boje  u array
    for (let i = 0; i <= gamePattern.length-1; i++) { // animacija svake boje iz niza
        setTimeout(function timer() {
            buttonAnimation(gamePattern[i]);
        }, 1000 * i);
    }

    level++;
    $("h1").text("Level " + level);

    userClickedPattern = [];
    
    console.log("game pattern: " + gamePattern);
}

function buttonAnimation(button) {
    pressedButton(button); // dodavanje animacije odabranog nasumicnog dugmeta
    playSound(button);
    animatePress(button);
}

    let continueGame = true;
    let j = 0;

$(".btn").click(function () {
    let userChosenColor = this.id; // igrac odabere boju
    userClickedPattern.push(userChosenColor); // dodavanje boje u array
    buttonAnimation(userChosenColor); // animacija selekcije
    
    if (gamePattern[j] === userClickedPattern[j]) {
        continueGame = true;

        if (j === gamePattern.length-1) {
            
            setTimeout(() => {
                generateRandomNumber();
            }, 1000);

            userClickedPattern = [];
            j = 0;
            console.log("generating new colour");
        } else {
            j++;
        }

        
        console.log("j: " + j);
        
    } else {
        continueGame = false;
        $("h1").text("Game over! Press any key to restart");
        playSound("wrong");
        wrongColor();
        
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        j = 0;
        
        $("html").one("keydown", function() {
            generateRandomNumber(); 
            $("h1").text("Level " + level);
        }) ;
    };
      
})

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function pressedButton(button) {
    $("#" + button).fadeOut(100).fadeIn(100)
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function wrongColor() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}


