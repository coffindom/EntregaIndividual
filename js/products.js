// Función que obtiene los datos del JSON y los coloca en un array
document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(AUTOS).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products
            showProductsList(productsArray)
            //sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    })
})

// Función que muestra los datos del array en el HTML
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name +`</h4> 
                        <p> `+ products.description +`</p>
                        <small class="text-muted">` + products.currency + " " + products.cost + `</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("productsList").innerHTML = htmlContentToAppend; 
    }
}