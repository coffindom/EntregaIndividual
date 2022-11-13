document.addEventListener("DOMContentLoaded", ()=>{
    showProfileElements()

    document.getElementById("enviarBtnProfile").addEventListener("click", ()=>{
        saveElements()
    });
});

// Función que guarda todos los datos
function saveElements(){
    validacionPerfil();
    let nombre = document.getElementById("primerNombre").value
    let segNombre = document.getElementById("segundoNombre").value
    let apellido = document.getElementById("primerApellido").value
    let segApellido = document.getElementById("segundoApellido").value
    let correo = document.getElementById("correoPerfil").value
    let telefono = document.getElementById("numeroTelefono").value

    if (nombre != ""){
        localStorage.setItem("userData", nombre)
    }
    if (segNombre != ""){
        localStorage.setItem("userData2", segNombre)
    }
    if (apellido != ""){
        localStorage.setItem("userData3", apellido)
    }
    if (segApellido != ""){
        localStorage.setItem("userData4", segApellido)
    }
    if (correo != ""){
        localStorage.setItem("correoname", correo)
    }
    if (telefono != ""){
        localStorage.setItem("userData5", telefono)
    }
}

// Función que coloca todos los datos almacenados
function showProfileElements(){
    let nombre = document.getElementById("primerNombre").value
    let segNombre = document.getElementById("segundoNombre").value
    let apellido = document.getElementById("primerApellido").value
    let segApellido = document.getElementById("segundoApellido").value
    let correo = document.getElementById("correoPerfil").value
    let telefono = document.getElementById("numeroTelefono").value

    if (localStorage.getItem("userData") != null && nombre === ""){
        nombre = localStorage.getItem("userData")
    }
    if (localStorage.getItem("userData2") != null && segNombre === ""){
        segNombre = localStorage.getItem("userData2")
    }
    if (localStorage.getItem("userData3") != null && apellido === ""){
        apellido = localStorage.getItem("userData3")
    }
    if (localStorage.getItem("userData4") != null && segApellido === ""){
        segApellido = localStorage.getItem("userData4")
    }
    if (localStorage.getItem("correoname") != null && correo === ""){
        correo = localStorage.getItem("correoname")
    }
    if (localStorage.getItem("userData5") != null && telefono === ""){
        telefono = localStorage.getItem("userData5")
    }
}

// Validaciones
function validacionPerfil(){
    let nombre = document.getElementById("primerNombre").value
    let apellido = document.getElementById("primerApellido").value
    let correo = document.getElementById("correoPerfil").value

    if (nombre === "" || apellido === "" || correo === ""){
        document.getElementById("profileValidationSpan").style.display = "block"
    } else {
        document.getElementById("profileValidationSpan").style.display = "none"
        document.getElementById("profileValidationSpan2").style.display = "block"
    }
}