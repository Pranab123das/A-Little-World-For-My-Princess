
/* =====================================
   LITTLE SURPRISES FOR MY PRINCESS
===================================== */

// =====================================
// LITTLE REMINDER
// =====================================

const reminderButton = document.getElementById("openReminder");
const reminderMessage = document.getElementById("reminderMessage");

reminderButton.addEventListener("click", function() {

    reminderMessage.textContent =
        "Kuchuuu, never forget this...\n\n" +
        "You don't have to be happy every day to be loved.\n" +
        "You don't have to be perfect to be precious.\n" +
        "And you never have to earn your place in my heart.\n\n" +
        "On your brightest days and your messiest ones, " +
        "you'll always have a little home in your Puchu. ♡";

    reminderMessage.classList.add("show");

    reminderButton.textContent = "A REMINDER JUST FOR YOU ♡";
});


// =====================================
// A WARM HUG
// =====================================

const hugButton = document.getElementById("sendHug");
const hugMessage = document.getElementById("hugMessage");

hugButton.addEventListener("click", function() {

    hugMessage.textContent =
        "Come hereeeee, my Kuchuuu! 🧸\n\n" +
        "Wrapping my arms around you...\n" +
        "Pulling you a little closer...\n" +
        "A soft forehead kiss...\n" +
        "And one very, very tight hug!\n\n" +
        "Mmmmmmmmmmmwah! You are not allowed to escape yet. ♡";

    hugMessage.classList.add("show");

    hugButton.textContent = "HUG DELIVERED! ♡";
});


// =====================================
// A THOUSAND KISSES
// =====================================

const kissButton = document.getElementById("sendKisses");
const kissMessage = document.getElementById("kissMessage");

kissButton.addEventListener("click", function() {

    kissMessage.textContent =
        "WARNING: EXTREME PUCCHU AFFECTION! 💋\n\n" +
        "Muwahhhhh! Muwahhh! Muwahhhhhhh!\n" +
        "One on your forehead...\n" +
        "Two on your cheeks...\n" +
        "And approximately 997 more everywhere else!\n\n" +
        "Hehehe! All reserved for my Kuchuuu. ♡";

    kissMessage.classList.add("show");

    kissButton.textContent = "A THOUSAND KISSES SENT! 💋";
});
