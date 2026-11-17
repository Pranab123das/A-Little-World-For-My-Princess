
/* =====================================
   A LETTER FOR MY PRINCESS
   TYPEWRITER + SMOOTH SCROLL
===================================== */

const letterSource = document.getElementById("letterSource");
const letterOutput = document.getElementById("letterOutput");
const typingCursor = document.getElementById("typingCursor");
const finishButton = document.getElementById("finishLetter");
const nextSurprisesButton = document.getElementById("nextSurprises");


// Check that all required HTML elements exist
if (
    !letterSource ||
    !letterOutput ||
    !typingCursor ||
    !finishButton ||
    !nextSurprisesButton
) {
    console.error("Princess Letter: One or more required HTML elements are missing.");
} else {

    const fullLetter = letterSource.textContent.trim();

    // Keep one permanent text node for reliable typing
    const typedTextNode = document.createTextNode("");
    letterOutput.replaceChildren(typedTextNode);

    let currentIndex = 0;
    let typingTimer = null;
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
    let userHasTakenControl = false;

    // =====================================
    // RESPECT MANUAL SCROLLING
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

        if (currentIndex === 0) {
            return;
        }

        const range = document.createRange();

        range.setStart(typedTextNode, currentIndex - 1);
        range.setEnd(typedTextNode, currentIndex);

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

        const character = fullLetter[currentIndex];

        typedTextNode.appendData(character);

        currentIndex++;

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

        typedTextNode.textContent = fullLetter;

        currentIndex = fullLetter.length;
        isFinished = true;

        typingCursor.style.display = "none";

        finishButton.textContent = "MY LETTER IS ALL YOURS ♡";
        finishButton.disabled = true;
       nextSurprisesButton.hidden = false;
nextSurprisesButton.style.removeProperty("display");
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
// GO TO THE SURPRISE ROOM
// =====================================

nextSurprisesButton.addEventListener("click", function() {

    window.location.href = "little-surprises.html";

});

    // =====================================
    // START AUTOMATIC TYPING
    // =====================================

    function startTyping() {

        if (!fullLetter) {
            console.error("Princess Letter: The letter source is empty.");
            return;
        }

        setTimeout(typeLetter, 1200);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startTyping, {
            once: true
        });
    } else {
        startTyping();
    }

}
