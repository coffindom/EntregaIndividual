function loginContent(){
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    
    if (correo === "" || contrasena === ""){
        showAlertError("Datos no válidos")
    } else {
        document.location("index.html")
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("boton-enviar").addEventListener("click", ()=>{
        loginContent();
    })
});