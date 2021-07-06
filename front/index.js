
// Création des éléments//

function templateProduct(){

    const main = document.querySelector("main");
    const productSheet = document.createElement("article");
    main.appendChild(productSheet);
    productSheet.classList.add("product-sheet");
    
    
    const article = document.querySelector("article");
    const productSheetImage = document.createElement("figure");
    article.appendChild(productSheetImage);
    productSheetImage.classList.add("product-sheet-photo");
    
    
    const figure = document.querySelector("figure");
    const productSheetDescription = document.createElement("figcaption");
    article.appendChild(productSheetDescription);
    productSheetDescription.classList.add("product-sheet-description");
    
    const figcaption = document.querySelector("figcaption");
    const productSheetDescriptionTitle = document.createElement("div");
    figcaption.appendChild(productSheetDescriptionTitle);
    productSheetDescriptionTitle.classList.add("product-sheet-description-title");
    
    const divTitle = document.querySelector("div.product-sheet-description-title");
    const productSheetDescriptionTitleName = document.createElement("div");
    divTitle.appendChild(productSheetDescriptionTitleName);
    productSheetDescriptionTitleName.classList.add("product-sheet-description-title-name");
    
    const productSheetDescriptionTitlePrice = document.createElement("div");
    divTitle.appendChild(productSheetDescriptionTitlePrice);
    productSheetDescriptionTitlePrice.classList.add("product-sheet-description-title-price");
    
    const productSheetDescriptionText = document.createElement("p");
    figcaption.appendChild(productSheetDescriptionText);
    productSheetDescriptionText.classList.add("product-sheet-description-text");
    
    const productLink = document.createElement("a");
    figure.appendChild(productLink);
    productLink.classList.add("product-sheet-photo");
}

function displayAllProducts(){

    fetch("http://localhost:3000/api/teddies") 
      .then(function(response){
         return response.json();
        })
    
        .then(function(data){
                 for(let i = 0; i < data.length; i++){
                    templateProduct(data[i]);


                    document.querySelector(".product-sheet-description-title-name").innerHTML = data[i].name;
                    document.querySelector(".product-sheet-description-text").innerHTML = data[i].description;
                    document.querySelector(".product-sheet-description-title-price").innerHTML = data[i].price/100 + " euros";
                        
                    const img = document.createElement("img");
                    document.querySelector("figure").appendChild(img);
                    img.classList.add("product-sheet-photo-img");
                    img.src = data[i].imageUrl;
                 }
                 return templateProduct();
        })
       
        
                     
                }
                           
           
        
        

            



displayAllProducts();


//Récupérer les données de l'API et afficher un message si le chargement ne fonctionne pas //


    
    
    // .catch(function(error){
//     console.error("Oups, les ours en peluches ne sont plus ici. Merci de mettre à jour votre page.")
//     document.querySelector("main")
//     .innerText = "Oups, les ours en peluches ne sont plus ici. Merci de mettre à jour votre page.";
// })
  
        
     

