const guy = document.getElementById("guy");
const box = document.getElementById("box");

let audio1 = new Audio('sounds/coffee_pot-77732.mp3');
let audio2 = new Audio('sounds/forest-lullaby-110624.mp3');

guy.addEventListener("click", function () {
    //alert("Hello!");
    var utterance = new SpeechSynthesisUtterance("I like Pizza!");
    speechSynthesis.speak(utterance);
});

//box.addEventListener("click", function () {
//guy.style.transform = "translateX(100vw) translateX(-200px)";

//guy.style.transform += "scaleX(-1)";

//var audio = new Audio('sounds/two-dogs-barking-71633.mp3');
//audio.play();
//});

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
    //var coords = 'translateX(' + ((e.clientX-59)) + 'px) translateY(' + (e.clientY) + 'px)'
    var coords = 'translateX(' + ((e.clientX - 59)) + 'px)'
    guy.style.transform = coords;
    //guy.style.transition = 'all 1.5s ease-in'


    //https://stackoverflow.com/questions/5968227/get-the-value-of-webkit-transform-of-an-element-with-jquery/5968313
    var style = window.getComputedStyle(guy);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xVal = matrix.m41;
    var yVal = matrix.m42;

    console.log("X: " + xVal + " Y: " + yVal);
    if (e.clientX < xVal)
        guyTexture.style.transform = "scaleX(1)";
    else
        guyTexture.style.transform = "scaleX(-1)";

});
/**
 * End of Follow Mouse stuff...
 */



// reacting to the 2ND box!
const box2 = document.getElementById("box2");
let box2Clicked = false;
box2.addEventListener("click", function () {
    box2Clicked = true;
    console.log("box2 clicked");
})

function box2Event() {
    box2Clicked = false;

    audio2.currentTime = 0;
    audio2.pause();
    audio2.play();
    setTimeout(function () {
        audio2.pause();
    }, 5000)

    var utterance = new SpeechSynthesisUtterance("yAY mUSIC!");
    utterance.lang = 'en-GB';
    utterance.rate = 0.75;
    utterance.pitch = 0.5;
    speechSynthesis.speak(utterance);
}

// reacting to the box
let boxClicked = false;
box.addEventListener("click", function () {
    boxClicked = true;
    console.log("box clicked");
})

function boxEvent() {
    console.log("Play Box Event");
    boxClicked = false;

    audio1.currentTime = 0;
    audio1.pause();
    audio1.play();
    setTimeout(function () {
        audio1.pause();
    }, 5000)

    var utterance = new SpeechSynthesisUtterance("Yummy Coffeee");
    utterance.lang = 'en-GB';
    utterance.rate = 0.75;
    utterance.pitch = 0.5;
    speechSynthesis.speak(utterance);
}

//FIRING THE BOX FUNCTIONS 
guy.addEventListener("transitionend", function () {
    console.log("transition finished");
    if (boxClicked == true)
        boxEvent();
    //NEW:
    if (box2Clicked == true)
        box2Event();

});


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
        coords = 'translateX(' + (xVal - 500) + 'px) translateY('+(yVal)+'px)';
        guyTexture.style.transform = "scaleX(1)";
    }
    else if (e.keyCode == '39') {
        // right arrow
        coords = 'translateX(' + (xVal + 500) + 'px) translateY('+(yVal)+'px)';
        guyTexture.style.transform = "scaleX(-1)";
    }
    else if (e.keyCode == '38') {
        // up arrow
        coords = 'translateX(' + (xVal) + 'px) translateY('+(yVal-500)+'px)';

    }
    else if (e.keyCode == '40') {
        // down arrow
        coords = 'translateX(' + (xVal) + 'px) translateY('+(yVal+500)+'px)';
    }
    guy.style.transform = coords;
}