/* =====================================
   A LETTER FOR MY PRINCESS
   SLOW TYPEWRITER EFFECT
===================================== */

const letterSource = document.getElementById("letterSource");
const letterOutput = document.getElementById("letterOutput");
const typingCursor = document.getElementById("typingCursor");
const finishButton = document.getElementById("finishLetter");

const fullLetter = letterSource.textContent.trim();

let currentIndex = 0;
let typingTimer = null;
let isTyping = false;
let isFinished = false;
let previousLineTop = null;

// AUTOMATICALLY CENTRE THE LATEST WRITING LINE

function followWriting() {

    const textNode = letterOutput.firstChild;

    if (!textNode || currentIndex === 0) {
        return;
    }

    const range = document.createRange();

    range.setStart(textNode, currentIndex - 1);
    range.setEnd(textNode, currentIndex);

    const position = range.getBoundingClientRect();

    if (!position.height) {
        return;
    }

    // Scroll only when a new visual line begins
    if (
        previousLineTop === null ||
        Math.abs(position.top - previousLineTop) > 3
    ) {

        previousLineTop = position.top;

        const targetPosition =
            window.scrollY +
            position.top -
            (window.innerHeight * 0.45);

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
        });
    }
}
// TYPING SPEED

const normalSpeed = 75;
const punctuationPause = 450;
const paragraphPause = 900;

// TYPEWRITER FUNCTION

function typeLetter() {

    if (isFinished || currentIndex >= fullLetter.length) {
        finishTyping();
        return;
    }

    isTyping = true;

    const character = fullLetter[currentIndex];

    letterOutput.textContent += character;

    currentIndex++;

// Keep the newest writing line near the screen centre
followWriting();
    let nextDelay = normalSpeed;

    if (character === "," || character === ";") {
        nextDelay = punctuationPause;
    }

    if (character === "." || character === "!" || character === "?") {
        nextDelay = punctuationPause + 200;
    }

    if (character === "\n") {
        nextDelay = paragraphPause;
    }

    typingTimer = setTimeout(typeLetter, nextDelay);
}

// FINISH TYPING

function finishTyping() {

    clearTimeout(typingTimer);

    letterOutput.textContent = fullLetter;

    currentIndex = fullLetter.length;

    isTyping = false;
    isFinished = true;

    typingCursor.style.display = "none";

    finishButton.textContent = "MY LETTER IS ALL YOURS ♡";
    finishButton.disabled = true;
}

// FINISH BUTTON

finishButton.addEventListener("click", function () {

    if (!isFinished) {
        finishTyping();
    }

});

// START AUTOMATIC TYPING

window.addEventListener("load", function () {

    setTimeout(function () {
        typeLetter();
    }, 1200);

});
