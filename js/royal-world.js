// =====================================
// HER LITTLE KINGDOM
// ROYAL WORLD JAVASCRIPT
// =====================================

const letterButton = document.getElementById("openPrincessLetter");

letterButton.addEventListener("click", function () {

    letterButton.disabled = true;

    letterButton.innerHTML = "PREPARING YOUR LETTER ♡";

    document.body.classList.add("page-transition");

    setTimeout(function () {
        window.location.href = "princess-letter.html";
    }, 800);

});
