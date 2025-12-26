let gify;
let textToWrite = "SYNTH #1";
let typedText = "";
let typingSpeed = 8; // Velocidad de escritura (cuadros por letra)

let cancion;
let volumen = 1; // Inicialmente, el volumen es 1
let cancionRate = 1; // Inicialmente, la velocidad de reproducción es 1
let playPauseButton; // Botón de reproducción/pausa
let volumeControl; // Control de volumen
let reproduciendo = true; // Declaración de la variable
let ancho = window.innerWidth;
function preload() {
    gify = loadImage('../img/3c.gif');
    cancion = loadSound("../sonidos/ab53.wav");
}
let sketch; 
function setup() {
    
    if (windowWidth > 1200) {  sketch = createCanvas (1200,340);}
else {sketch = createCanvas (windowWidth,340);}
   //adjuntar el canvas de la aplicación a un elemento HTML específico en la página web.
   // Esto establece que el lienzo estará contenido dentro de un elemento HTML con el atributo id igual a "sketch".
    sketch.parent('sketch');
    textSize(16);
    textFont('Pixelify Sans');
    //cancion.loop();

    
//playPauseButton es una variable que se utiliza para almacenar una referencia al botón en la página web con el atributo id igual a "playPauseButton"
//select('#playPauseButton') se utiliza para seleccionar ese botón utilizando su id.
// Configurar los botones y event listeners
    playPauseButton = select('#playPauseButton');
    playPauseButton.mousePressed(togglePlayPause);//CAMBIA DE ESTADO DE PLAY A PAUSA
    //Se agrega un event listener al botón playPauseButton. El event listener se configura para que cuando el botón se haga clic (mousePressed), se ejecute la función togglePlayPause().
    volumeControl = select('#volumeControl');//select('#volumeControl') se utiliza para seleccionar ese control deslizante utilizando su id.
 //Se agrega un event listener al control deslizante volumeControl. El event listener se configura para que cuando el valor del control deslizante cambie (input), se ejecute la función setVolume().
    volumeControl.input(setVolume);
}

function draw() {
    background(110);
    displayText();
    typeText();

    // Calcular el centro y el radio del círculo de enmascaramiento
    let centerX = width / 2;
    let centerY = height / 2;
    let circleRadius = 150; // Cambia este valor según tus necesidades

    // Dibuja un círculo de enmascaramiento
    fill(25, 68, 89); // azul
    ellipse(centerX, centerY, circleRadius * 2);

    // Establece el modo de mezcla para que la imagen solo se muestre dentro del círculo
    blendMode(DARKEST);

    // Muestra la imagen enmascarada
    image(gify, 0, centerY - circleRadius, circleRadius * 8, circleRadius * 2);

    // Restaura el modo de mezcla a su valor predeterminado
    blendMode(BLEND);
    document.oncontextmenu = function () {
      return false;
    };
  
    

// Actualiza la velocidad de reproducción y el volumen solo si se está reproduciendo y el mouse está dentro del canvas
  if (reproduciendo && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    cancionRate = map(mouseX, 0, width, 2, -1);//VELOCIDAD MAS RAPIDA EJE X + EJ:DE 2 DOBLE -1 MITAD DE VELOCIDAD  
    volumen = map(mouseY, 0, height, 4, 0);//VERTICAL CAMBIA VOLUMEN  EJE Y

    // Aplica los cambios en la velocidad de reproducción y el volumen
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
    //Esto define una función llamada togglePlayPause. Las funciones son bloques de código que se pueden ejecutar cuando se llaman desde otras partes del programa.
    if (cancion.isPlaying()) {
//verificar si la variable cancion está reproduciendo algún sonido. La función isPlaying() generalmente se usa para determinar si un sonido (almacenado en la variable cancion) se está reproduciendo en ese momento. Si el resultado de esta condición es verdadero, significa que la canción está reproduciéndose.
        cancion.pause();
        playPauseButton.html('Play/Pause');
    } else {
        cancion.play();
        playPauseButton.html('Play/Pause');
    }
//cambia el contenido del elemento HTML con el ID playPauseButton a la cadena de texto "Play/Pause". Esta relacionado con un botón en la interfaz de usuario que muestra el estado actual de reproducción (ya sea "Play" o "Pause").
}

function setVolume() {
    volumen = volumeControl.value();
    cancion.setVolume(volumen);
}

function keyPressed() {
    var tiempo;

    if (keyCode == LEFT_ARROW && cancion.currentTime() > 1) {
        tiempo = cancion.currentTime() - 2;
    }

    if (keyCode == RIGHT_ARROW && cancion.currentTime() < cancion.duration() -2) {
        tiempo = cancion.currentTime() + 1;
    }

    cancion.jump(tiempo);
}
function windowResized(){ 
if (windowWidth > 1200) {resizeCanvas (1200,340);}
else {resizeCanvas (windowWidth,340);}

}
