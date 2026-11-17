// =====================================
// A LITTLE WORLD FOR MY PRINCESS
// MAIN JAVASCRIPT
// =====================================

const enterButton = document.getElementById("enterPrincessWorld");

enterButton.addEventListener("click", function () {

    enterButton.disabled = true;

    enterButton.innerHTML = "OPENING YOUR KINGDOM ♡";

    document.body.classList.add("page-transition");

    setTimeout(function () {
        window.location.href = "royal-world.html";
    }, 800);

});
