document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(AUTOS).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
})

function mostrarProductos(){
    
}