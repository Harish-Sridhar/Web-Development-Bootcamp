$(document).keypress(function(){
    if (playSequence.length===0){
        playAButton()
    } 
})

$("div.btn").click(function(){
    if (playSequence.length===0){
        gameOver()
    } else {
        var btnId = $(this).attr("id")
        var btnNumber = btnToNumber[btnId]
        if (playSequence[tempSequence.length]===btnNumber){
            tempSequence.push(btnNumber)
            animateButton(btnId)
            //if player has completed all the sequence correctly, play a new button.
            if (playSequence.length===tempSequence.length){
                tempSequence=[]
                setTimeout(() => {
                    playAButton()
                }, 2000);
            }
        } else {
            gameOver()
        }
    }
})

var playSequence=[]
var tempSequence=[]

var btnToNumber = {"green": 1, "red": 2, "yellow": 3, "blue": 4 }
var btns = ["green", "red", "yellow", "blue"]
var btnToAudio = {"green": new Audio("sounds/green.mp3"), 
                    "red": new Audio("sounds/red.mp3"),
                    "yellow": new Audio("sounds/yellow.mp3"),
                    "blue": new Audio("sounds/blue.mp3"),
                    "wrong": new Audio("sounds/wrong.mp3") }


function animateButton(btnId) {
    $("#"+btnId).addClass("pressed")
    btnToAudio[btnId].play()
    setTimeout(function(){
        $("#"+btnId).removeClass("pressed")
    }, 100)

}

function gameOver(){
    //Empty the play sequence
    playSequence=[]
    tempSequence=[]
    $("h1#level-title").text("Gameover press any key to start over")
    $("body").addClass("game-over")
    btnToAudio["wrong"].play()
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 100)


}

function playAButton() {
    //get a random button
    var btnNumber = Math.floor(Math.random() * 4) + 1
    var btnId = btns[btnNumber - 1]

    // add the button number to play sequence
    playSequence.push(btnNumber)

    // Animate the button click
    animateButton(btnId)

    $("h1#level-title").text("Level "+ getCurrentLevel())


}

function getCurrentLevel(){
    return playSequence.length

}