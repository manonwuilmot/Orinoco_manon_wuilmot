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
          const options = document.querySelectorAll(".option-color");
          options[i].innerHTML = data.colors[i];
          }
        //affichage de la description du produit//
        document.querySelector(".product-sheet-description-text").innerHTML = data.description;
        document.querySelector(".product-sheet-description-title-name").innerHTML = data.name;
        //affichage du prix//
        document.querySelector(".product-sheet-description-title-price").innerHTML = data.price / 100 + " euros";

        //récupération des données dans le local storage quand on clique sur le bouton "AddToBag"//
        const inputAddToBag = document.getElementById("btn-add");
        inputAddToBag.addEventListener("click", () => {
        // // // création nouvel object, récupération contenu du produit et traduction de javascript en json//
        const contentName = document.querySelector(".product-sheet-description-title-name").textContent;
        const contentImg = document.querySelector(".product-sheet-photo-img").src;
        const contentPrice = document.querySelector(".product-sheet-description-title-price").textContent;
        
        let objProduct ={
          name : contentName,
          img : contentImg,
          price : contentPrice,
          quantity : 1,
        }
        let newItemAdded = JSON.stringify(objProduct);
        //ajout d'un produit dans le localStorage//
        localStorage.setItem("newItemAdded", newItemAdded);
        
        //Si déjà dans le localStorage alors afficher "produit ajouté"//
        const alreadyAdded = localStorage.getItem("newItemAdded");
        if(alreadyAdded){
          document.getElementById("btn-add").textContent = "produit ajouté ! En ajouter un autre ?";
          console.log(localStorage);
        }
        else{
        }
          })
        //effacer le localStorage en cliquant sur annuler//
        const inputCancel = document.getElementById("btn-cancel");
        inputCancel.addEventListener("click", () => {
          localStorage.clear(localStorage);
          document.getElementById("btn-add").textContent = "Ajouter au panier !";
          console.log(localStorage);
        })
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

  //ajout d'un bouton pour annuler l'ajout au panier//
  const inputCancel = document.createElement('button');
  article.appendChild(inputCancel);
  inputCancel.setAttribute("id", "btn-cancel");
  inputCancel.setAttribute("type", "button");
  inputCancel.textContent = "x Annuler x";

  //ajout des options couleurs//
  const productColors = document.createElement("div");
  figcaption.appendChild(productColors);
  productColors.classList.add("product-colors");
  productColors.textContent = "Disponible dans les coloris suivants: ";
  const options = document.createElement("select");
  productColors.appendChild(options);
  options.classList.add("colors");
  const option = document.createElement("option");
  options.appendChild(option);
  option.setAttribute("placeholder", "choisir un pelage");
  option.innerText = "Choisir un pelage";

}


function templateOptionsColors(){
  //ajout des options couleurs//
  const optionColor = document.createElement("option");
  document.querySelector(".colors").appendChild(optionColor);
  optionColor.classList.add("option-color");
}