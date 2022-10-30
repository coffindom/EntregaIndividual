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
        <td><input type="number" value="${element.count}" style="width: 60px;" name="productQuant" onchange="costChange()"/></td>
        <td name="subtotal">${element.unitCost*element.count} ${element.currency}</td>
      </tr>`
    }
    document.getElementById("cartTable").innerHTML += htmlContentToAppend
}

function costChange(){
    let quant = document.getElementsByName('productQuant')
    let cost = document.getElementsByName('productCost')
    let subtotalCost = document.getElementsByName('subtotal')
    for (let i=0; i<quant.length; i++){
        let htmlContentToAppend = parseFloat(quant[i].value) * parseFloat(cost[i].innerHTML);
        subtotalCost[i].innerHTML=htmlContentToAppend;
    }
   }