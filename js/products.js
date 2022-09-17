// Ejecuciones y función que obtiene los datos del JSON y los coloca en un array
document.addEventListener("DOMContentLoaded", ()=>{
    let productosLink = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";

    productsArray = [];

    getJSONData(productosLink).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        } else {
            alert("Error");
        }
    });

    document.getElementById("sortAscProducts").addEventListener("click", ()=>{
        precioAscendente(productsArray);
    });
    document.getElementById("sortDescProducts").addEventListener("click", ()=>{
        precioDescendente(productsArray);
    });
    document.getElementById("sortBySoldProducts").addEventListener("click", ()=>{
        ordenRelevancia(productsArray);
    });
    document.getElementById("rangeFilterCountProducts").addEventListener("click", ()=>{
        minAndMax(productsArray);
    });
    document.getElementById("clearRangeFilterProducts").addEventListener("click", ()=>{
        removeFilters();
    });
});

// Función de precio descendente
function precioDescendente(array){
    let result = [];
    result = array.sort(function (a, b){
        if (a.cost < b.cost){
            return 1;
        }
        if (a.cost > b.cost){
            return -1;
        }
        return 0;
    });
    showProductsList(result);
}

// Función de precio ascendente
function precioAscendente(array){
    let result = [];
    result = array.sort(function (a, b){
        if (a.cost > b.cost){
            return 1;
        }
        if (a.cost < b.cost){
            return -1;
        }
        return 0;
    });
    showProductsList(result);
}

// Función de orden por relevancia
function ordenRelevancia(array){
    let result = [];
    result = array.sort(function (a, b){
        if (a.soldCount < b.soldCount){
            return 1;
        }
        if (a.soldCount > b.soldCount){
            return -1;
        }
        return 0;
    });
    showProductsList(result);
}

// Función que busca productos entre el mínimo y máximo establecido
function minAndMax(array){
    let min = document.getElementById("rangeFilterCountMinProducts").value;
    let max = document.getElementById("rangeFilterCountMaxProducts").value;
    let filtredProductsArray = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const elementPrice = element.cost;
        if (elementPrice >= min && elementPrice <= max){
            filtredProductsArray.push(element);
        }
    }
    showProductsList(filtredProductsArray);
}

// Función que elimina los filtros aplicados
function removeFilters(){
    showProductsList(productsArray);
}

// Funcion que guarda el ID del producto en LocalStorage
function setProdID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

// Función que muestra los datos del array en el HTML
function showProductsList(array){
    document.getElementById("productsList").innerHTML = ``
    let htmlContentToAppend = ``;

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `
        <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
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
        </div>`
        document.getElementById("productsList").innerHTML = htmlContentToAppend; 
    }
}