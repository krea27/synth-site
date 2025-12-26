console.log("leyendo kreatxt");
let index = 0;
// Inicializar un índice que rastreará la posición actual en la descripción
// Función que se llama en cada iteración para agregar un carácter a la descripción
function escribirtxt(texto,elemento) {
    if (index < texto.length) { // Comprobar si todavía hay caracteres por escribir
    document.getElementById(elemento).innerHTML += texto.charAt(index);// Agregar el carácter actual al contenido del elemento HTML
        index++;
        setTimeout(escribirtxt, 60); // Velocidad de escritura (en milisegundos)setTimeout es una función en JavaScript que permite ejecutar una función o código después de un retraso especificado en milisegundos. typeDescription  una función que se ejecutará después del retraso.
    }console.log(index)
}

// Iniciar la escritura cuando la página se cargue completamente