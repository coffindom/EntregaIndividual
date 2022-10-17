document.addEventListener("DOMContentLoaded", ()=>{
    let productID = localStorage.getItem("prodID");

    if (productID != null || productID != undefined){
        let productoLink = "https://japceibal.github.io/emercado-api/products/" + productID + ".json";
        let commentsLink = "https://japceibal.github.io/emercado-api/products_comments/" + productID + ".json";
        commentsArray = [];
        infoArray = [];

        getJSONData(productoLink).then(function(resultObj){
            if (resultObj.status === "ok"){
                infoArray = resultObj.data;
                showProductInfo(infoArray);
                showRelatedProducts(infoArray.relatedProducts);
            } else {
                alert("Error");
            }
        });

        getJSONData(commentsLink).then(function(resultObj){
            if (resultObj.status === "ok"){
                commentsArray = resultObj.data;
                showProductComments(commentsArray);
            } else {
                alert("Error al cargar comentarios");
            }
        });

        document.getElementById("submitCommentBtn").addEventListener("click", ()=>{
            submitComment(commentsArray);
        });
    } else {
        window.location.href = "categories.html"
    }
});

// Funcion que muestra la información del producto
function showProductInfo(infoArray){
    htmlInfoContent =  `<br><h2><b>${infoArray.name}</b></h2><hr>
    <h5><b>Precio</b></h5> ${infoArray.currency} ${infoArray.cost}<br>
    <h5><b>Descripción</b></h5> ${infoArray.description}<br>
    <h5><b>Categoría</b></h5> ${infoArray.category}
    <h5><b>Cantidad vendidos</b></h5> ${infoArray.soldCount}<hr>
    <div class="container text-center">
    <div class="row">
    ${showImages(infoArray.images)}
    </div>
    </div>`;

    document.getElementById("productInfoContainer").innerHTML = htmlInfoContent
}

// Función que muestra las imagenes de un array
function showImages(array){
    imageToShow = ``
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        imageToShow += `<img src="${element}" style="width: 180px">`
    }
    return imageToShow;
}

// función que muestra los comentarios
function showProductComments(array){
    document.getElementById("commentsContainer").innerHTML = `<hr><h2><b>Comentarios</b></h2>`;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        htmlComments = `<div class="list-group"><b>${element.user}</b>${showStars(element.score)} | ${element.dateTime}<br>
        ${element.description}</div><hr>`

        document.getElementById("commentsContainer").innerHTML += htmlComments;
    }
}

// Función que muestra estrellas según el puntaje
function showStars(score){
    addScore = ``;
    for (let i = 1; i < 6; i++) {
        if (score>=i){
           addScore +=  `★`; 
        } else {
           addScore += `☆`;
        }
    }
    return addScore;
}

// Función que agrega el comentario
function submitComment(array){
    if (localStorage.getItem("correoname") === null || localStorage.getItem("correoname") === undefined || document.getElementById("commentArea").value === ""){
        alert("Es posible que no hayas iniciado sesión o tu comentario esté incompleto.")
    } else {
        let date = new Date();
        let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let objectToPush = {"product": localStorage.getItem("prodID"),
        "score": document.getElementById("pointSelector").value,
        "description": document.getElementById("commentArea").value,
        "user": localStorage.getItem("correoname"),
        "dateTime": current_date}

        array.push(objectToPush);
        showProductComments(array);
        document.getElementById("commentArea").value = ``;
    }
}

// Función que muestra productos relacionados
function showRelatedProducts(array){
    htmlContentToAppend = "";
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        htmlContentToAppend += `<div class="card cursor-active" style="width: 12rem; margin-right: 10px;" onclick="changeProdID(${element.id})"><img src="${element.image}" class="card-img-top">
        <div class="card-body"><p class="card-text">${element.name}</p></div>
        </div>`
    }
    document.getElementById("relatedProductsContainer").innerHTML += htmlContentToAppend;
}

// Función que redirige al usuario al producto seleccionado
function changeProdID(id) {
    if (localStorage.getItem("prodID") != null || localStorage.getItem("prodID") != undefined){
        localStorage.removeItem("prodID");
    }
    localStorage.setItem("prodID", id);
    location.reload();
}