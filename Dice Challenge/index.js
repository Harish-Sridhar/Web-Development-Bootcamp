function generateRandomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1
}


function rollDices() {

    var dice1 = generateRandomDiceNumber()
    var dice2 = generateRandomDiceNumber()

    document.getElementById("img1").setAttribute("src", "images/dice"+dice1+".png")
    document.getElementById("img2").setAttribute("src", "images/dice"+dice2+".png")

    return [dice1, dice2]

}


function getHeaderElement(player) {
    return 'Player' + player +' Wins! <i class="fas fa-trophy"></i>'
}

function announceWinner(dice1, dice2) {

    var headerElement = document.querySelector("body .container h1")

    if (dice1> dice2) {
        headerElement.innerHTML=getHeaderElement(1)
    } else if (dice2 > dice1) {
        headerElement.innerHTML=getHeaderElement(2)
    } else {
        headerElement.innerHTML="Match Draw!"
    }  

}


result = rollDices()
announceWinner(result[0], result[1])