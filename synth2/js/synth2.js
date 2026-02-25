let gify;
let textToWrite = "SINTH #3 ";
let typedText = "";
let typingSpeed = 8; 

let cancion;
let volumen = 1; 
let cancionRate = 1; 
let playPauseButton; 
let volumeControl; 
let reproduciendo = false; // Empezamos en false por seguridad
let ancho = window.innerWidth;
let sketch; 

function preload() {
    gify = loadImage('img/3c.gif');
    cancion = loadSound("sonidos/ab83.wav");
}

function setup() {
    if (windowWidth > 1200) { 
        sketch = createCanvas(1200, 340);
    } else {
        sketch = createCanvas(windowWidth, 340);
    }
    
    sketch.parent('sketch');
    textSize(16);
    textFont('Pixelify Sans');

    // IMPORTANTE: Eliminamos cancion.loop() de aquí para que Firefox no lo bloquee al cargar
    
    playPauseButton = select('#playPauseButton');
    playPauseButton.mousePressed(togglePlayPause);

    volumeControl = select('#volumeControl');
    volumeControl.input(setVolume);
}

function draw() {
    background(110);
    displayText();
    typeText();

    let centerX = width / 2;
    let centerY = height / 2;
    let circleRadius = 150; 

    // Círculo Amarillo para el Synth #3
    fill(255, 250, 0); 
    ellipse(centerX, centerY, circleRadius * 2);

    blendMode(DARKEST);
    image(gify, 0, centerY - circleRadius, circleRadius * 8, circleRadius * 2);
    blendMode(BLEND);

    document.oncontextmenu = function () {
      return false;
    };

    // Control de audio mediante posición del mouse
    if (reproduciendo && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        cancionRate = map(mouseX, 0, width, 2, -1);
        volumen = map(mouseY, 0, height, 4, 0);

        cancion.rate(cancionRate);
        cancion.setVolume(volumen);
    }
}

function displayText() {
    fill(0);
    textSize(16);
    text(typedText, 14, 14);
}

function typeText() {
    if (frameCount % typingSpeed === 0 && typedText.length < textToWrite.length) {
        typedText += textToWrite[typedText.length];
    }
}

function togglePlayPause() {
    // La clave para que tu amiga lo escuche en su Mac:
    userStartAudio().then(() => {
        if (cancion.isPlaying()) {
            cancion.pause();
            reproduciendo = false;
        } else {
            // Iniciamos el loop aquí, tras la interacción del usuario
            cancion.loop();
            reproduciendo = true;
        }
    });
}

function setVolume() {
    volumen = volumeControl.value();
    cancion.setVolume(volumen);
}

function keyPressed() {
    let tiempo;
    if (keyCode == LEFT_ARROW && cancion.currentTime() > 1) {
        tiempo = cancion.currentTime() - 1;
    }
    if (keyCode == RIGHT_ARROW && cancion.currentTime() < cancion.duration() - 1) {
        tiempo = cancion.currentTime() + 1;
    }
    if (tiempo !== undefined) {
        cancion.jump(tiempo);
    }
}

function windowResized() { 
    if (windowWidth > 1200) {
        resizeCanvas(1200, 340);
    } else {
        resizeCanvas(windowWidth, 340);
    }
}
