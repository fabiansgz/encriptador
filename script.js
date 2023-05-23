var gblMensaje = '';
// Variable Global para mostrar Mensajes.
// var gblAreaMensaje = document.querySelector('.text-area');

/* **************************************************************** */
/*
* Funcion que devuelve VERDADERO o FALSO
* si la letra es Minuscula.
*/
function esMinuscula(paramLetra) {
    var resultado = false;

    var letraEnMinuscula = paramLetra.toLowerCase();

    // Comparar si el parametro letra es
    // minuscula
    if (paramLetra == letraEnMinuscula) {
        resultado = true;
    } else {
        resultado = false;
    }

    return resultado;
}

/* **************************************************************** */
function esAcentuada(paramLetra) {
    var resultado = false;
    var acentos = [
        'á',
        'é',
        'í',
        'ó',
        'ú'
    ];

    if (acentos.includes(paramLetra) == true) {
        resultado = true;
    } else {
        resultado = false;
    }

    return resultado;
}

/* **************************************************************** */
function existenLetrasAcentuadas(paramTexto) {
    var resultado = false;
    var cantidadLetras = paramTexto.length;
    for (var posicion = 0; posicion <= cantidadLetras - 1; posicion++) {
        if (esAcentuada(paramTexto[posicion]) == true) {
            resultado = true;
        }
    }

    return resultado;
}

/* **************************************************************** */

/*
         * Verifica si existe por lo menos 1 o más letras en Mayusculas.
         * true: si existe 1 o más letras en Mayusculas
         * false: no existe , por lo tanto TODO el texto esta en Minusculas.
         */
function existenLetrasMayusculas(paramTexto) {
    var resultado = false;
    var cantidadLetras = paramTexto.length;
    for (var posicion = 0; posicion <= cantidadLetras - 1; posicion++) {
        if (esMinuscula(paramTexto[posicion]) == true) {
            resultado = false;
        } else {
            resultado = true;
            break;
        }
    }

    // Retornar variable resultado
    return resultado;
}

function encriptar(paramTexto) {
    var textoTemporal = '';
    textoTemporal = paramTexto.replaceAll('e', 'enter');
    textoTemporal = textoTemporal.replaceAll('i', 'imes');
    textoTemporal = textoTemporal.replaceAll('a', 'ai');
    textoTemporal = textoTemporal.replaceAll('o', 'ober');
    textoTemporal = textoTemporal.replaceAll('u', 'ufat');

    return textoTemporal;
}

function desencriptar(paramTexto) {
    var textoTemporal = '';
    textoTemporal = paramTexto.replaceAll('enter', 'e');
    textoTemporal = textoTemporal.replaceAll('imes', 'i');
    textoTemporal = textoTemporal.replaceAll('ai', 'a');
    textoTemporal = textoTemporal.replaceAll('ober', 'o');
    textoTemporal = textoTemporal.replaceAll('ufat', 'u');

    return textoTemporal;
}

function mostrarTextoInformacion(textoEntrada) {
    var textoInformacion = document.querySelector('.info-banner');
    textoInformacion.innerHTML = textoEntrada;
    textoInformacion.value = textoEntrada;
}

function ocultarBanner() {
    let temp = document.querySelector('#textoAreaSalida');
    if (temp.classList.contains("mensaje") == true) {
        temp.classList.remove('mensaje');
        temp.classList.add('mensaje-oculto');
    }
}

function mostrarBanner() {
    let temp = document.querySelector('#textoAreaSalida');
    if (temp.classList.contains("mensaje-oculto") == true) {
        temp.classList.remove('mensaje-oculto');
        temp.classList.add('mensaje');
    }
}

function mostrarTextoSalida(strTexto) {

    ocultarBanner();

    var textoAreaSalida = document.querySelector('#textoAreaSalida');
    textoAreaSalida.innerHTML = strTexto;
    textoAreaSalida.value = strTexto;

    var textoAreaEntrada = document.querySelector('#textoAreaEntrada');
    textoAreaEntrada.innerHTML = '';
    textoAreaEntrada.value = '';
    
}

/* **************************************************************** */
/*                          ENCRIPTAR                               */
/* **************************************************************** */
var botonEncriptarDatos = document.getElementById('botonEncriptar');
botonEncriptarDatos.addEventListener('click', function () { 
    // Obtener texto de entrada
    var htmlTextoAreaEntrada = document.getElementById('textoAreaEntrada');
    var textoEntrada = htmlTextoAreaEntrada.value;

    if (textoEntrada.length == 0) {
        gblMensaje = "No hay texto. Revisar";
        mostrarTextoInformacion(gblMensaje);

    } else if (existenLetrasMayusculas(textoEntrada) == true) {
        // Verificar si texto Entrada cumple condiciones

        gblMensaje = "Texto no puede encriptarse. Existe una letra en Mayuscula. Verificar.";
        mostrarTextoInformacion(gblMensaje);
        // alert('Texto no puede encriptarse. Existe una letra en Mayuscula. Verificar.');

    } else if (existenLetrasAcentuadas(textoEntrada) == true) {

        gblMensaje = "Acentos detectados. No se puede encriptar";
        mostrarTextoInformacion(gblMensaje);

        // alert('Acentos detectados. No se puede encriptar');
    } else {
        var textoEncriptado = encriptar(textoEntrada);

        gblMensaje = "Texto encriptado exitosamente.";
        mostrarTextoInformacion(gblMensaje);

        // Mostrar texto Encriptado en la SALIDA
        mostrarTextoSalida(textoEncriptado);
    }

    
});

/* ******************************************************************** */
/*                            DESENCRIPTAR                              */
/* ******************************************************************** */
var botonDesencriptarDatos = document.getElementById('botonDesencriptar');
botonDesencriptarDatos.addEventListener('click', function () { 

    /* Obtener texto de entrada */
    var htmlTextoAreaEntrada = document.querySelector('#textoAreaEntrada');
    var textoEntrada = htmlTextoAreaEntrada.value;
    
    if (textoEntrada.length == 0) {
        gblMensaje = "No hay texto. Revisar";
        mostrarTextoInformacion(gblMensaje);
    } else {
        var textoDesencriptado = desencriptar(textoEntrada);

        gblMensaje = "Texto Desencriptado exitosamente.";
        mostrarTextoInformacion(gblMensaje);    
        mostrarTextoSalida(textoDesencriptado);
    }
});


/* ******************************************************************** */
/*                           COPIAR TEXTO                               */
/* ******************************************************************** */
var botonCopiarTexto = document.getElementById('btn-copiar');
botonCopiarTexto.addEventListener('click', function () { 
    // Get the text field
    var copyText = document.querySelector('#textoAreaSalida');

    if (copyText.value.length > 0) {
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        
        copyText.value = '';

        mostrarBanner();
        
        // Alert the copied text
        alert("Texto copiado al portapapeles: " + copyText.value);
    } else {
        gblMensaje = "No hay texto para copiar.";
        mostrarTextoInformacion(gblMensaje);
    }
});
