// Función para controlar que no haya campos vacíos
function loginContent(){
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    
    if (correo === "" || contrasena === ""){
        alert("Datos no válidos");
    } else {
        window.location.href = "index.html";
    }
}

// Función para ocultar el botón de inicio de sesión
function hideLoginBtn(){
    document.getElementById("loginBtn").style.display = "none";
}

// Ejecución
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("boton-enviar").addEventListener("click", ()=>{
        loginContent();
    })
});