cartLink = "https://japceibal.github.io/emercado-api/user_cart/" + "25801" + ".json"
cartProductsArray = [];

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(cartLink).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartProductsArray = resultObj.data;
            document.getElementById("cartUsername").innerHTML = resultObj.data.user;
            showCartTable(cartProductsArray.articles);
        } else {
            alert("Error");
        }
    });
    document.getElementById("pago1").addEventListener("click", ()=>{
        showMethod();
    });
    document.getElementById("pago2").addEventListener("click", ()=>{
        showMethod();
    });
    document.getElementById("finalizarBoton").addEventListener("click", ()=>{
        validation();
    });
    
});

// Función que muestra los productos en la tabla
function showCartTable(array){
    let htmlContentToAppend = ``
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        htmlContentToAppend += `<tr>
        <td><img src="${element.image}" style="width: 80px; height: 50px;"></td>
        <td name="productName">${element.name}</td>
        <td name="productCost">${element.unitCost} ${element.currency}</td>
        <td><input type="number" value="${element.count}" id="numeroDeProductos" style="width: 60px;" name="productQuant" onchange="costChange()"/></td>
        <td name="subtotal">${element.unitCost*element.count} ${element.currency}</td>
      </tr>`
    }
    document.getElementById("cartTable").innerHTML += htmlContentToAppend
}

// Función que cambia el subtotal según la cantidad de productos
function costChange(){
    let quant = document.getElementsByName('productQuant')
    let cost = document.getElementsByName('productCost')
    let subtotalCost = document.getElementsByName('subtotal')
    for (let i=0; i<quant.length; i++){
        let htmlContentToAppend = parseFloat(quant[i].value) * parseFloat(cost[i].innerHTML);
        subtotalCost[i].innerHTML=htmlContentToAppend;
    }

    /* let envios = document.getElementsByName("envio");
    let envioCosto = 0;
    for (let index = 0; index < envios.length; index++) {
        let element = envios[index];
        if (element.value == 0.03){
            envioCosto = subtotalCost*element.value
        } else if (element.value == 0.07){
            envioCosto = subtotalCost*element.value
        } else if (element.value == 0.15){
            envioCosto = subtotalCost*element.value
        }
    }
    let total = subtotalCost + envioCosto;
    document.getElementById("subtotalSpan").innerHTML = total; */

    /* let envios = document.getElementsByName("envio");
    let envioCosto = 0;
    for (let envio of envios) {
        if (envio.checked){
            envioCosto = subtotalCost*element.value
        }
    }
    let total = (subtotalCost + envioCosto);
    document.getElementById("subtotalSpan").innerHTML = total; */
   }

   // Función que despliega los campos para el método de pago
   function showMethod(){
    if (document.getElementById("pago1").checked){
        document.getElementById("pago1div").style.display = "block"
        document.getElementById("pago2div").style.display = "none"
    } else if (document.getElementById("pago2").checked){
        document.getElementById("pago2div").style.display = "block"
        document.getElementById("pago1div").style.display = "none"
    }
   }

   // Función de validación
   function validation(){
    if (document.getElementById("calle").value === "" || document.getElementById("direccionNumero").value === "" || document.getElementById("esquina").value === ""){
        document.getElementById("validacion1").style.display = "block";
    } else if (document.getElementById("radio1").checked === false && document.getElementById("radio2").checked === false && document.getElementById("radio3").checked === false){
        document.getElementById("validacion2").style.display = "block";
    } else if (document.getElementById("numeroDeProductos").value <= 0){
        document.getElementById("validacion3").style.display = "block";
    } else if (document.getElementById("pago1").checked === false && document.getElementById("pago2").checked === false){
        document.getElementById("validacion4").style.display = "block";
    } else if (document.getElementById("pago1").checked){
        if (document.getElementById("numeroTarjeta").value === "" || document.getElementById("numerotarjeta2").value === "" || document.getElementById("fechaTarjeta").value === ""){
            document.getElementById("validacion4").style.display = "block";            
        } else {
            document.getElementsByName("validaciones").style.display = "none";
            document.getElementById("validacion5").style.display = "block";
        }
    } else if (document.getElementById("pago2").checked){
        if (document.getElementById("numeroBanco").value === ""){
            document.getElementById("validacion4").style.display = "block";
        } else {
            document.getElementsByName("validaciones").style.display = "none";
            document.getElementById("validacion5").style.display = "block";
        }
    } else {
        document.getElementById("validacion5").style.display = "block"
    }
   }