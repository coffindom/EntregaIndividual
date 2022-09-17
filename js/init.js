const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
  loginBtnText(localStorage.getItem("correoname"));
  logoutBtnText(localStorage.getItem("correoname"));

  document.getElementById("logoutBtn").addEventListener("click", ()=>{
    logoutBtnClick();
});
document.getElementById("loginBtn").addEventListener("click", ()=>{
    loginBtnClick(localStorage.getItem("correoname"));
});
});

// Función que cambia el texto del botón Login
function loginBtnText(elemento){
  if (elemento == undefined || elemento == null){
      document.getElementById("loginBtn").innerHTML = `Iniciar sesión`;
  } else {
      document.getElementById("loginBtn").innerHTML = elemento
  }
}

// Función que hace desaparecer el botón de cerrar sesión
function logoutBtnText(elemento){
  if (elemento == undefined || elemento == null){
      document.getElementById("logoutBtn").style.display = "none"
  }
}

// Función de click del botón Login
function loginBtnClick(elemento){
  if (elemento == undefined || elemento == null){
      window.location.href = "login.html";
  } else {
      window.location.href = "my-profile.html";
  }
}

// Función de click del botón de cierre de sesión
function logoutBtnClick(){
  localStorage.removeItem("correoname");
  location.reload();
}