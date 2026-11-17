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

/// NATURAL, GENTLE LETTER FOLLOWING

let scrollFrame = null;

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

    const comfortableZone = window.innerHeight * 0.65;
    const targetZone = window.innerHeight * 0.48;

    // Only move when the writing approaches the lower reading area
    if (position.bottom > comfortableZone) {

        if (scrollFrame) {
            cancelAnimationFrame(scrollFrame);
        }

        scrollFrame = requestAnimationFrame(function () {

            const destination =
                window.scrollY +
                position.top -
                targetZone;

            window.scrollTo({
                top: Math.max(0, destination),
                behavior: "smooth"
            });

            scrollFrame = null;

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
