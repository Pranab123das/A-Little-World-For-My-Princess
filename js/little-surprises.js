
/* =====================================
   LITTLE SURPRISES FOR MY PRINCESS
===================================== */

// =====================================
// FLOATING HEART PARTICLES
// =====================================

function createLoveParticles(container, symbols, amount) {

    const rect = container.getBoundingClientRect();

    for (let i = 0; i < amount; i++) {

        const particle = document.createElement("span");

        particle.className = "love-particle";
        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.setProperty(
            "--start-x",
            (rect.left + Math.random() * rect.width) + "px"
        );

        particle.style.setProperty(
            "--start-y",
            (rect.top + rect.height / 2) + "px"
        );

        particle.style.setProperty(
            "--move-x",
            (Math.random() * 240 - 120) + "px"
        );

        particle.style.setProperty(
            "--move-y",
            (-100 - Math.random() * 180) + "px"
        );

        particle.style.setProperty(
            "--particle-size",
            (14 + Math.random() * 16) + "px"
        );

        particle.style.setProperty(
            "--duration",
            (1.5 + Math.random()) + "s"
        );

        particle.style.setProperty(
            "--rotation",
            (Math.random() * 100 - 50) + "deg"
        );

        document.body.appendChild(particle);

        particle.addEventListener("animationend", function() {
            particle.remove();
        });
    }
}


// =====================================
// LITTLE REMINDER
// =====================================

const reminderButton = document.getElementById("openReminder");
const reminderMessage = document.getElementById("reminderMessage");
const reminderGift = document.getElementById("reminderGift");

reminderButton.addEventListener("click", function() {

    reminderMessage.textContent =
        "Kuchuuu, never forget this...\n\n" +
        "You don't have to be happy every day to be loved.\n" +
        "You don't have to be perfect to be precious.\n" +
        "And you never have to earn your place in my heart.\n\n" +
        "On your brightest days and your messiest ones, " +
        "you'll always have a little home in your Puchu. ♡";

    reminderMessage.classList.add("show");
    reminderGift.classList.remove("reminding");
    void reminderGift.offsetWidth;
    reminderGift.classList.add("reminding");

    createLoveParticles(reminderGift, ["💗", "💕", "♡", "💖"], 18);

    reminderButton.textContent = "A REMINDER JUST FOR YOU ♡";
});


// =====================================
// A WARM HUG
// =====================================

const hugButton = document.getElementById("sendHug");
const hugMessage = document.getElementById("hugMessage");
const hugGift = document.getElementById("hugGift");

hugButton.addEventListener("click", function() {

    hugMessage.textContent =
        "Come hereeeee, my Kuchuuu! 🧸\n\n" +
        "Wrapping my arms around you...\n" +
        "Pulling you a little closer...\n" +
        "A soft forehead kiss...\n" +
        "And one very, very tight hug!\n\n" +
        "Mmmmmmmmmmmwah! You are not allowed to escape yet. ♡";

    hugMessage.classList.add("show");

    hugGift.classList.remove("hugging");
    void hugGift.offsetWidth;
    hugGift.classList.add("hugging");

    createLoveParticles(hugGift, ["🩷", "💗", "💕", "🧸"], 24);

    hugButton.textContent = "HUG DELIVERED! ♡";
});


// =====================================
// A THOUSAND KISSES
// =====================================

const kissButton = document.getElementById("sendKisses");
const kissMessage = document.getElementById("kissMessage");
const kissGift = document.getElementById("kissGift");

kissButton.addEventListener("click", function() {

    kissMessage.textContent =
        "WARNING: EXTREME PUCCHU AFFECTION! 💋\n\n" +
        "Muwahhhhh! Muwahhh! Muwahhhhhhh!\n" +
        "One on your forehead...\n" +
        "Two on your cheeks...\n" +
       "Lotssiee on ur lippsiess...\n" +
        "And approximately 696969 on every inch of ur body!\n\n" +
       "And ofc all ur wetness deserves to be kissedd ...\n" +
        "Hehehe! All reserved for my Kuchuuu. ♡";

    kissMessage.classList.add("show");

    kissGift.classList.remove("kissing");
    void kissGift.offsetWidth;
    kissGift.classList.add("kissing");

    createLoveParticles(kissGift, ["💋", "😘", "💗", "💕"], 30);

    kissButton.textContent = "A THOUSAND KISSES SENT! 💋";
});
