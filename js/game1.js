const guy = document.getElementById("guy");
const box = document.getElementById("box");
const box2 = document.getElementById("box2");

let audio1 = new Audio('sounds/coffee_pot-77732.mp3');
let audio2 = new Audio('sounds/cyber-punk-21548.mp3');


guy.addEventListener("click", function () {
    //alert("Hello :)");
    var utterance = new SpeechSynthesisUtterance("I like chicken wings!");
    speechSynthesis.speak(utterance);
});
box.addEventListener("click", function () {
    guy.style.transform = 'translateX(100vw) translateX(-220px)';
});


/**
 * 
 * Follow Mouse and flip background image 
 * - based on coordinates 
 * 
 */
const stage = document.getElementById("stage");
const guyTexture = document.querySelector("#guy p");
stage.addEventListener('click', function (e) {
    console.log(e.clientX + "|" + e.clientY);
    // var coords = 'translateX(' + (e.clientX) + 'px) translateY(' + (e.clientY) + 'px)'
    var coords = 'translateX(' + (e.clientX-140) + 'px)';
    guy.style.transform = coords;

    //https://stackoverflow.com/questions/5968227/get-the-value-of-webkit-transform-of-an-element-with-jquery/5968313
    var style = window.getComputedStyle(guy);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xVal = matrix.m41;
    var yVal = matrix.m42;

    console.log("X: " + xVal + " Y: " + yVal);
    if (e.clientX < xVal)
        guyTexture.style.transform = "scaleX(-1)";
    else
        guyTexture.style.transform = "scaleX(1)";


});
/**
 * End of Follow Mouse stuff... 
 */



// reacting to 2nd the box
let box2Clicked = false;
box2.addEventListener("click", function () {
    box2Clicked = true;
    console.log("box2 clicked");
    transitionEnd = false;
})

function box2Event() {
    console.log("Play Juke Box :)");
    box2Clicked = false;

    //play audio 
    audio2.currentTime = 11;
    audio2.pause();
    audio2.play();
    setTimeout(function () {
        audio2.pause();
    }, 15000)

    var utterance = new SpeechSynthesisUtterance("Yay music!");
    speechSynthesis.speak(utterance);

}



// reacting to the box
let boxClicked = false;
box.addEventListener("click", function () {
    boxClicked = true;
    //guy.style.transform = 'translateX(100vw) translateX(-220px)';
    console.log("box clicked");
    transitionEnd = false;
})

function boxEvent() {
    console.log("Play Box Event");
    boxClicked = false;

    //play audio 
    audio1.currentTime = 0;
    audio1.pause();
    audio1.play();
    setTimeout(function () {
        audio1.pause();
        box.style.backgroundImage = "url(img/appliance-g97d1e77d6_640.png)";
    }, 5000)

    box.style.backgroundImage = "url(img/appliance-g97d1e77d6_640-2.png)"

    var utterance = new SpeechSynthesisUtterance("Yummy coffee!");
    speechSynthesis.speak(utterance);

}

guy.addEventListener("transitionend", function () {
    console.log("transition finished");
    if (boxClicked == true)
        boxEvent();
    //NEW 2nd BOX!!
    if (box2Clicked == true)
        box2Event();

});


/**
 * Reacting to Keyboard input 
 * - arrow keys... | optional!!
 */
document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;
    var style = window.getComputedStyle(guy);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xVal = matrix.m41;
    var yVal = matrix.m42;
    var coords;
    //guy.style.transition = 'none';

    if (e.keyCode == '37') {
        // left arrow
        coords = 'translateX(' + (xVal - 500) + 'px) translateY(' + (yVal) + 'px)';
        guyTexture.style.transform = "scaleX(-1)";
    }
    else if (e.keyCode == '39') {
        // right arrow
        coords = 'translateX(' + (xVal + 500) + 'px) translateY(' + (yVal) + 'px)';
        guyTexture.style.transform = "scaleX(1)";
    }
    else if (e.keyCode == '38') {
        // up arrow
        coords = 'translateX(' + (xVal) + 'px) translateY(' + (yVal - 500) + 'px)';

    }
    else if (e.keyCode == '40') {
        // down arrow
        coords = 'translateX(' + (xVal) + 'px) translateY(' + (yVal + 500) + 'px)';
    }
    guy.style.transform = coords;
}
/**
 * End of Keyboard input stuff... 
 */


/**
 * Music button & Action
 */
let audioBG = new Audio('sounds/mixkit-relax-658.mp3');
audioBG.loop = true;
audioBG.volume = 0.6;

const musicBtn = document.getElementById("sound");
let musicOn = false;
musicBtn.addEventListener("click", function(){

    if(!musicOn) {
        audioBG.play();
        musicOn = true;
        musicBtn.innerHTML = "Music off";
    } else {
        audioBG.pause();
        musicOn = false;
        musicBtn.innerHTML = "Music on";
    }
    
    
})