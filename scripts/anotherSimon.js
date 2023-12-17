
const simHint = document.getElementById("simHint");
const butStart = document.getElementById("divStart");
const butRed = document.getElementById("divRed");
const butYel = document.getElementById("divYel");
const butGre = document.getElementById("divGre");
const butBlu = document.getElementById("divBlu");
const showScore = document.getElementById("scoreSim");
butStart.textContent ="Press to Start";
var simonPicks = 3;
var simonPings = [];
var playerPings = [];

butStart.onclick = startSimon;

function startSimon () {
    playerPings = [];
    console.log("this", playerPings),

    butStart.disabled = true;
    butStart.style.opacity = "0.5";
    butStart.textContent = "Follow the pattern";
    simonPings = [];
    console.log("hi");
    for (let i = 0; i < simonPicks; i++) {
        let pingPicked = Math.floor(Math.random () * 4 + 1);
        simonPings.push(pingPicked);
    }
    console.log (simonPings);
    pingPicker();
}

async function pingPicker () {
    simHint.textContent = simonPings;
    console.log(simonPings);
    for (let i = 0; i < simonPings.length; i++) {
        if (simonPings[i] === 1) {
            await pingColours(butRed, "red");
            await resetColours();
            
        }else if (simonPings[i] === 2) {
            await pingColours(butYel, "yellow");
            await resetColours();
            
        }else if (simonPings[i] === 3) {
            await pingColours(butGre, "green");
            await resetColours();
            
        }else if (simonPings[i] === 4) {
            await pingColours(butBlu, "blue");
            await resetColours();
            
        }
        else {
            simHint.textContent = "something went wrong : func pingPick";
        }
    }
    playerTurn();
}

//pingPicker();


async function pingColours(element, colour) {
    return new Promise((resolve) => {
        setTimeout(() => {
            element.style.backgroundColor = colour;
            console.log("changing colour to " + colour);
            resolve();
        }, 500);
    });
}

async function resetColours() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log ("changing colours back")
            butRed.style.backgroundColor = "";
            butYel.style.backgroundColor = "";
            butGre.style.backgroundColor = "";
            butBlu.style.backgroundColor = "";
            resolve();
        }, 500);
    });
}

function playerTurn () {
    playerPings = [];
    butStart.textContent = "Your turn";
    butStart.disabled = false;
        butRed.addEventListener("mousedown", function() {
        butRed.style.backgroundColor = "red";
        playerPings.push(1);
        console.log(playerPings);
            simHint.textContent = playerPings;
            butStart.textContent = "Click Me When Done";
            butRed.addEventListener("mouseup", function() {
                butRed.style.backgroundColor = "";
            });
        });
        butYel.addEventListener("mousedown", function() {
            butYel.style.backgroundColor = "yellow";
            playerPings.push(2);
            console.log(playerPings);
            simHint.textContent = playerPings;
            butStart.textContent = "Click Me When Done";
            butYel.addEventListener("mouseup", function() {
                butYel.style.backgroundColor = "";
            });
        });
        butGre.addEventListener("mousedown", function() {
            butGre.style.backgroundColor = "green";
            playerPings.push(3);
            console.log(playerPings);
            simHint.textContent = playerPings;
            butStart.textContent = "Click Me When Done";
            butGre.addEventListener("mouseup", function() {
                butGre.style.backgroundColor = "";
            });
        });
        butBlu.addEventListener("mousedown", function() {
            butBlu.style.backgroundColor = "blue";
            playerPings.push(4);
            console.log(playerPings);
            simHint.textContent = playerPings;
            butStart.textContent = "Click Me When Done";
            butBlu.addEventListener("mouseup", function() {
                butBlu.style.backgroundColor = "";
            });
        });
        butStart.onclick = comparePings;
}

function comparePings () {
    butStart.textContent = "Let's check";
    simHint.textContent = "Me : " + simonPings + " . You : " + playerPings + "."; 
    butRed.style.backgroundColor = "";
    butYel.style.backgroundColor = "";
    butGre.style.backgroundColor = "";
    butBlu.style.backgroundColor = "";
    butRed.removeEventListener("click", function(){});
    butYel.removeEventListener("click", function(){});
    butGre.removeEventListener("click", function(){});
    butBlu.removeEventListener("click", function(){});
    if (simonPings.length === playerPings.length) {
        for (let i = 0; i < simonPings.length; i++) {
            if (simonPings[i] === playerPings[i]) {
                butStart.textContent = "You Win";
                simonPicks++;
                playerPings = [];
                simonPings =  [];
                console.log (simonPings, playerPings);
                butStart.style.opacity = "1";
                butStart.onclick = startSimon;
            }else if (simonPings[i] !== playerPings[i]){
                butStart.textContent = "You Lose";
                butStart.style.opacity = "1";
                butStart.onclick = startSimon;
            }else {
                butStart.textContent = "Oops compPings";
            }
        }

}
}