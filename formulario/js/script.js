function validarContacto() {

    var nombre_ = document.contact_form.nombre.value;
    var apellido_ = document.contact_form.apellido.value;
    var email_ = document.contact_form.email.value;
    var telefono_ = parseInt(document.contact_form.telefono.value);
    var synth_ = parseInt(document.contact_form.synth.value);
    var mensaje_ = document.contact_form.mensaje.value;

    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
//se utilizan para almacenar los valores de los campos del formulario. Estos valores se obtienen del formulario HTML utilizando la propiedad value de los elementos de formulario.


    console.log(telefono_.toString().length);


    if (nombre_.length == 0 || !isNaN(nombre_)) {
        document.contact_form.nombre.style.backgroundColor = 'rgb(255,166,162)';
        document.getElementById('alerta_nombre').style.display = 'block';
        //se está accediendo a un elemento en el documento HTML utilizando su identificador (ID) "alerta_nombre
       //style.display se utiliza para controlar la propiedad de visualización del elemento. se establece en 'block', lo que significa que se muestra el elemento en la página.
       // El valor 'block' hace que el elemento ocupe un espacio en el diseño y sea visible para el usuario.
        document.contact_form.nombre.focus();
        //se utiliza para acceder a un elemento del formulario llamado "nombre" dentro del formulario con el nombre "contact_form".
        return false;
    }
    //Esta línea indica que la función validarContacto debe devolver false.
    // En un formulario HTML, si una función que maneja la validación de campos devuelve false,
    // significa que se detendrá la presentación del formulario y no se enviará. Esto se utiliza para prevenir el envío del formulario si se encuentra un error en la validación.


    else if (apellido_.lenght == 0 || !isNaN(apellido_)) {
        document.contact_form.apellido.style.backgroundColor = 'rgb(255,166,162)';
        document.getElementById('alerta_apellido').style.display = 'block';
        document.contact_form.apellido.focus();
        return false;
    }

//verifica si el campo "email" coincide con el patrón de la expresión regular ck_email
    else if (!(ck_email.test(email_))) {
        document.contact_form.email.style.backgroundColor = 'rgb(255,166,162)';
        document.getElementById('alerta_email').style.display = 'block';
        document.contact_form.email.focus();
        return false;
    }
//verifica si la longitud del número de teléfono es diferente de 10 
    else if (!(telefono_.toString().length == 10) || isNaN(telefono_)) {
        document.contact_form.telefono.style.backgroundColor = 'rgb(255,166,162)';
        document.getElementById('alerta_telefono').style.display = 'block';
        document.contact_form.telefono.focus();
        return false;
    }

    else if (isNaN(synth_)) {
        document.contact_form.synth.style.backgroundColor = 'rgb(255,166,162)';
        document.getElementById('alerta_synth').style.display = 'block';
        document.contact_form.synth.focus();
        return false;
    }



    else {

        document.getElementById('success-message').style.display = 'block';
        document.getElementById('contact-form').style.display = 'none';
    }
}