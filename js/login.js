function loginContent(){
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    
    if (correo === "" || contrasena === ""){
        alert("Datos no válidos");
    } else {
        window.location = "categories.html"
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("boton-enviar").addEventListener("click", ()=>{
        loginContent();
    })
});