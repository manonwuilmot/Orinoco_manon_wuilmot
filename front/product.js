// Création des éléments de la page produit // 

 


let params = (new URL(document.location)).searchParams;
let id = params.get("id");
// Récupération des données d'un produit//
function displayOneProduct(id){
    fetch("http://localhost:3000/api/teddies/"+ id)
    .then(function(response){
        return response.json();
                 
    })
            
    .then(function(data){
        templateOneProduct(data);

        function templateOneProduct(){
            const main = document.querySelector("main");
            const productSheet = document.createElement("article");
            main.appendChild(productSheet);
            productSheet.classList.add("product-sheet");
        
            const article = document.querySelector("article");
            const productSheetImage = document.createElement("figure");
            article.appendChild(productSheetImage);
            productSheetImage.classList.add("product-sheet-photo");
                        
            document.querySelector("figure");
            const productSheetDescription = document.createElement("figcaption");
            article.appendChild(productSheetDescription);
            productSheetDescription.classList.add("product-sheet-description");
        
            const figcaption = document.querySelector("figcaption");
            const productSheetDescriptionTitle = document.createElement("div");
            figcaption.appendChild(productSheetDescriptionTitle);
            productSheetDescriptionTitle.classList.add("product-sheet-description-title")
        
            const productSheetDescriptionText = document.createElement("p");
            figcaption.appendChild(productSheetDescriptionText);
            productSheetDescriptionText.classList.add("product-sheet-description-text");  
                            
            const divTitle = document.querySelector("div.product-sheet-description-title");
            const productSheetDescriptionTitleName = document.createElement("div");
            divTitle.appendChild(productSheetDescriptionTitleName);
            productSheetDescriptionTitleName.classList.add("product-sheet-description-title-name");
        
            const productSheetDescriptionTitlePrice = document.createElement("div");
            divTitle.appendChild(productSheetDescriptionTitlePrice);
            productSheetDescriptionTitlePrice.classList.add("product-sheet-description-title-price");

            const figure = document.querySelector("figure");
            const img = document.createElement("img");
            figure.appendChild(img);
            img.classList.add("product-sheet-photo-img");
            img.src = data.imageUrl;
        

            const inputAddToBag = document.createElement("button");
            article.appendChild(inputAddToBag);
            inputAddToBag.setAttribute("id", "btn-add");
            inputAddToBag.setAttribute("type", "button");
            inputAddToBag.textContent = "Ajouter au panier";
        
        
            //affichages des données//
            productSheetDescriptionText.innerHTML = data.description;
            productSheetDescriptionTitleName.innerHTML = data.name;
            productSheetDescriptionTitlePrice.innerHTML = data.price/100 + " euros";

    }
})
}

displayOneProduct(id);











// function displayOneProduct(){
//     fetch("http://localhost:3000/api/teddies")
//       .then(function(response){
//          return response.json();
         
//         })
    
//         .then(function(data){
           
//             for (let i = 0; i< data.length; i++){
//                 const urlOneProduct = "http://localhost:3000/api/teddies/" + data[i]._id;
//                 console.log(urlOneProduct);
//                 fetch(urlOneProduct)
//                 .then(function(response){
//                     return response.json();
                    
//                 })
//                    .then(function(data){
//                     console.log(data);
//                    })
                
//         }
//         })
        
        
//             }
            
// displayOneProduct();     
    

    