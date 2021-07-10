// Création des éléments de la page produit //

//Création de l'URL pour page produit//
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Récupération des données d'un produit//
function displayOneProduct(id) {
  fetch("http://localhost:3000/api/teddies/" + id)
    .then(function(response){
      return response.json();
    })

    .then(function(data){
      templateOneProduct();

        //affichages des données//
        //affichage image//
        document.querySelector(".product-sheet-photo-img").src = data.imageUrl;
        //affichage bouton avec prix dynamique//
        document.getElementById("btn-add").textContent = "Ajouter au panier pour " + data.price / 100 + " euros";
        //Boucle pour affichage des options couleurs//
        for (let i = 0; i < data.colors.length; i++) {
        templateOptionsColors(data[i]);
        const productColorsBloc = document.querySelectorAll(".product-colors-box");
        productColorsBloc[i].innerHTML = data.colors[i];
        }
        //affichage de la description du produit//
        document.querySelector(".product-sheet-description-text").innerHTML = data.description;
        document.querySelector(".product-sheet-description-title-name").innerHTML = data.name;
        //affichage du prix//
        document.querySelector(".product-sheet-description-title-price").innerHTML = data.price / 100 + " euros";

        //récupération des données dans le local storage quand on clique sur le bouton "Addtobag"//
        const inputAddToBag = document.getElementById("btn-add");
        inputAddToBag.addEventListener("click", () => {
        // création nouvel object, récupération contenu du produit et traduction de javascript en json//
        let newItemAdded = new Object();
        const contentName = document.querySelector(".product-sheet-description-title-name").textContent;
        const contentImg = document.querySelector(".product-sheet-photo-img").src;
        const contentPrice = document.querySelector(".product-sheet-description-title-price").textContent;
        newItemAdded.name = contentName;
        newItemAdded.img = contentImg;
        newItemAdded.price = contentPrice;
        
        
        localStorage.setItem('Produit ajouté', JSON.stringify(newItemAdded));
          console.log(localStorage);
        
        
          
         
        });
      
    });
}

displayOneProduct(id);


//fonction pour créer un template dynamique pour la page produit//
function templateOneProduct(){
  const main = document.querySelector("main");
  main.classList.add("main");
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
  productSheetDescriptionTitle.classList.add("product-sheet-description-title");

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

  //ajout d'un bouton pour ajouter le produit au panier//
  const inputAddToBag = document.createElement("button");
  article.appendChild(inputAddToBag);
  inputAddToBag.setAttribute("id", "btn-add");
  inputAddToBag.setAttribute("type", "button");
  //ajout des options couleurs//
  const productColors = document.createElement("div");
  figcaption.appendChild(productColors);
  productColors.classList.add("product-colors");
  productColors.textContent = "Disponible dans les coloris suivants: ";
}

function templateOptionsColors(){
  //ajout des options couleurs//
  const productColorsBloc = document.createElement("div");
  document.querySelector(".product-colors").appendChild(productColorsBloc);
  productColorsBloc.classList.add("product-colors-box");
}