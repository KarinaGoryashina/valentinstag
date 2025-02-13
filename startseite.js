function showGif(buttonId, gifSrc) {
    const button = document.getElementById(buttonId);
    const rect = button.getBoundingClientRect();

    // GIF-Element erstellen
    const gif = document.createElement("img");
    gif.src = gifSrc;
    gif.style.position = "fixed";
    gif.style.left = `${rect.left}px`; // Position entsprechend dem Button
    gif.style.top = `${rect.top}px`;
    gif.style.width = "200px";  // Größe auf 200px Breite einstellen (anpassen)
    gif.style.height = "auto";  // Höhe bleibt im Verhältnis zur Breite

    // Sicherstellen, dass das GIF innerhalb des Viewports bleibt
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Überprüfen, ob das GIF rechts oder unten außerhalb des Bildschirms ragt
    if (rect.left + gif.width > viewportWidth) {
        gif.style.left = `${viewportWidth - gif.width - 10}px`; // Rechts ausgleichen
    }

    if (rect.top + gif.height > viewportHeight) {
        gif.style.top = `${viewportHeight - gif.height - 10}px`; // Unten ausgleichen
    }

    document.body.appendChild(gif);

    // GIF nach 3 Sekunden entfernen
    setTimeout(() => {
        gif.remove();
    }, 3000);
}


// Emoji-Herzen regnen lassen
function launchHearts() {
    const canvas = document.getElementById("heart-canvas");
    const ctx = canvas.getContext("2d");

    // Setze die Größe des Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Anzahl der fallenden Herzen
    const heartCount = 100;
    const hearts = [];
    const heartEmoji = "🤍"; // Das Emoji, das als Herz verwendet wird

    // Erzeuge die Herzen-Objekte
    for (let i = 0; i < heartCount; i++) {
        hearts.push({
            x: Math.random() * canvas.width, // Zufällige Startposition
            y: Math.random() * canvas.height, // Zufällige Startposition
            speed: Math.random() * 2 + 1, // Geschwindigkeit des fallenden Herzens
            size: Math.random() * 30 + 20, // Größe des Emojis
            rotation: Math.random() * 360, // Drehwinkel
            rotationSpeed: Math.random() * 2 - 1, // Zufällige Drehgeschwindigkeit
            opacity: 1, // Anfangs-Opazität (voll sichtbar)
            lifetime: 5000, // Lebensdauer des Herzens in Millisekunden (5 Sekunden)
            creationTime: Date.now() // Zeitpunkt der Erstellung des Herzens
        });
    }

    // Animations-Schleife
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen

        hearts.forEach(heart => {
            // Berechne die verbleibende Zeit und die Opazität
            const elapsedTime = Date.now() - heart.creationTime;
            heart.opacity = Math.max(0, 1 - (elapsedTime / heart.lifetime)); // Berechne die Transparenz

            // Bewegung und Rotation der Herzen
            heart.y += heart.speed;
            heart.rotation += heart.rotationSpeed;

            // Wenn das Herz das Ende erreicht, setze es oben zurück
            if (heart.y > canvas.height) {
                heart.y = 0;
                heart.x = Math.random() * canvas.width;
                heart.creationTime = Date.now(); // Setze die Lebensdauer neu
            }

            // Zeichne das Herz-Emoji mit Transparenz
            ctx.save();
            ctx.translate(heart.x, heart.y);
            ctx.rotate(heart.rotation * Math.PI / 180); // Drehe das Emoji
            ctx.font = `${heart.size}px sans-serif`; // Setze die Schriftgröße
            ctx.fillStyle = `rgba(255, 105, 180, ${heart.opacity})`; // Setze die Farbe mit Opazität
            ctx.fillText(heartEmoji, -heart.size / 2, heart.size / 2); // Zeichne das Emoji in der Mitte
            ctx.restore();
        });

        // Entferne Herzen, deren Opazität 0 erreicht hat
        hearts.filter(heart => heart.opacity > 0);

        // Wiederhole die Animation
        requestAnimationFrame(animate);
    }

    animate();
}

// Füge Event Listener für den Button hinzu
document.getElementById("confetti-button").addEventListener("click", function() {
    launchHearts();
});

