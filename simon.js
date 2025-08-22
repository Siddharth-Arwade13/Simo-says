let Started = false;
let gameSeq = [];
let userSeq = [];
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "green", "purple"];

document.addEventListener("keypress", function () {
    if (Started == false) {
        console.log("game is started");
        Started = true;
        levelup();
    }
});

function Gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 1000);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 1000);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `levelup ${level}`;

    let randIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);  // ✅ fixed: was 'random'
    console.log(gameSeq);
    Gameflash(randBtn); 
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.color = "red";
        setTimeout(function(){
            document.querySelector("body").style.color = "white";
        }, 150);
        reset();  // ✅ fixed: was 'resizeTo()'
    }
}

function btnPress(){
    let btn = this;
    Gameflash(btn); 

    let userColor = btn.getAttribute("id");  // ✅ fixed: was 'btngetAttribute'
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    Started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "To reset, press any key";
}

