// Funktion für den "Yes"-Button mit Konfetti & Weiterleitung
function handleYesClick() {
    spawnConfetti(); // Starte Konfetti
    setTimeout(() => {
        window.location.href = "startseite.html"; // Weiterleitung nach 2 Sekunden
    }, 2000);
}

// Funktion für den "No"-Button (ohne Konfetti)
function handleNoClick() {
    window.location.href = "angrycat.html"; // Direkte Weiterleitung
}

// Funktion für das Konfetti
function spawnConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    document.body.appendChild(confettiContainer);

    const confettiEmojis = ['🩷', '💜', '🩵', '🤍'];

    for (let i = 0; i < 1000; i++) {
        const confetti = document.createElement("div");
        confetti.innerText = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        confetti.style.position = "absolute";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = "-10px";
        confetti.style.fontSize = `${Math.random() * 20 + 15}px`;
        confetti.style.opacity = Math.random() + 0.5;

        let animationTime = Math.random() * 3000 + 2000;
        setTimeout(() => {
            confetti.style.transition = `top ${animationTime}ms linear, opacity ${animationTime}ms`;
            confetti.style.top = "100%";
            confetti.style.opacity = "0";
        }, 100);

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), animationTime + 1000);
    }

    setTimeout(() => confettiContainer.remove(), 4000);
}
