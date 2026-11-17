
/* =====================================
   A LETTER FOR MY PRINCESS
   TYPEWRITER + SMOOTH SCROLL
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


// =====================================
// TYPING SPEED
// =====================================

const normalSpeed = 50;
const punctuationPause = 320;
const paragraphPause = 650;


// =====================================
// SMOOTH SCROLL CONTROL
// =====================================

let scrollFrame = null;
let scrollTarget = 0;

// Once the reader manually scrolls,
// automatic following stays disabled.
let userHasTakenControl = false;


// =====================================
// RESPECT MANUAL READER SCROLLING
// =====================================

window.addEventListener("wheel", stopAutoScroll, {
    passive: true
});

window.addEventListener("touchmove", stopAutoScroll, {
    passive: true
});

window.addEventListener("keydown", function(event) {

    const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " "
    ];

    if (scrollKeys.includes(event.key)) {
        stopAutoScroll();
    }

});

function stopAutoScroll() {

    userHasTakenControl = true;

    if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = null;
    }

}


// =====================================
// FOLLOW THE WRITING NATURALLY
// =====================================

function followWriting() {

    if (userHasTakenControl || isFinished) {
        return;
    }

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

    const comfortableZone = window.innerHeight * 0.68;
    const targetZone = window.innerHeight * 0.43;

    if (position.bottom > comfortableZone) {

        scrollTarget =
            window.scrollY +
            position.top -
            targetZone;

        if (scrollFrame === null) {
            smoothScroll();
        }
    }
}


// =====================================
// CONTINUOUS CINEMATIC SCROLL
// =====================================

function smoothScroll() {

    // Stop immediately if the reader takes control
    if (userHasTakenControl || isFinished) {
        scrollFrame = null;
        return;
    }

    const currentPosition = window.scrollY;
    const difference = scrollTarget - currentPosition;

    if (Math.abs(difference) < 0.5) {

        window.scrollTo(0, scrollTarget);

        scrollFrame = null;
        return;
    }

    // Gentle continuous movement
    const nextPosition =
        currentPosition + difference * 0.075;

    window.scrollTo(0, nextPosition);

    scrollFrame = requestAnimationFrame(smoothScroll);
}


// =====================================
// TYPEWRITER FUNCTION
// =====================================

function typeLetter() {

    if (isFinished || currentIndex >= fullLetter.length) {
        finishTyping();
        return;
    }

    isTyping = true;

    const character = fullLetter[currentIndex];

    letterOutput.textContent += character;

    currentIndex++;

    // Follow the newest writing naturally
    followWriting();

    let nextDelay = normalSpeed;

    if (character === "," || character === ";") {
        nextDelay = punctuationPause;
    }

    if (
        character === "." ||
        character === "!" ||
        character === "?"
    ) {
        nextDelay = punctuationPause + 200;
    }

    if (character === "\n") {
        nextDelay = paragraphPause;
    }

    typingTimer = setTimeout(typeLetter, nextDelay);
}


// =====================================
// FINISH TYPING
// =====================================

function finishTyping() {

    clearTimeout(typingTimer);

    if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = null;
    }

    letterOutput.textContent = fullLetter;

    currentIndex = fullLetter.length;

    isTyping = false;
    isFinished = true;

    typingCursor.style.display = "none";

    finishButton.textContent = "MY LETTER IS ALL YOURS ♡";
    finishButton.disabled = true;
}


// =====================================
// FINISH BUTTON
// =====================================

finishButton.addEventListener("click", function() {

    if (!isFinished) {
        finishTyping();
    }

});


// =====================================
// START AUTOMATIC TYPING
// =====================================

window.addEventListener("load", function() {

    setTimeout(function() {
        typeLetter();
    }, 1200);

});
