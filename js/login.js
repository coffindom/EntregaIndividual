// Función para controlar que no haya campos vacíos
function loginContent(){
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    
    if (correo === "" || contrasena === ""){
        alert("Datos no válidos");
    } else {
        localStorage.setItem("correoname", correo);
        window.location.href = "index.html";
    }
}

// Ejecución
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("boton-enviar").addEventListener("click", ()=>{
        loginContent();
    });
});