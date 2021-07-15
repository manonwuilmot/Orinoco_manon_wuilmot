//fonction pour afficher les données provenant de l'API//

function displayAllProducts() {
  //récupération des données de l'API//
  fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())

    .then(function (data) {
      //fonction pour créer le template de base d'une fiche produit//
      function templateProduct() {
        const main = document.querySelector("main");
        const productSheet = document.createElement("article");
        main.appendChild(productSheet);
        productSheet.classList.add("product-sheet");
      }
      //boucle pour afficher tous les produits présents dans l'API//
      for (let i = 0; i < data.length; i++) {
        templateProduct(data[i]);

        //création des éléments du DOM //
        const articles = document.querySelectorAll("article");
        const productSheetImage = document.createElement("figure");
        articles[i].appendChild(productSheetImage);
        productSheetImage.classList.add("product-sheet-photo");

        document.querySelector("figure");
        const productSheetDescription = document.createElement("figcaption");
        articles[i].appendChild(productSheetDescription);
        productSheetDescription.classList.add("product-sheet-description");
        const figcaption = document.querySelectorAll("figcaption");

        //création élément title contenant le nom et le prix//
        const productSheetDescriptionTitle = document.createElement("div");
        figcaption[i].appendChild(productSheetDescriptionTitle);
        productSheetDescriptionTitle.classList.add(
          "product-sheet-description-title"
        );
        //création élément description de l'ours en peluche//
        const productSheetDescriptionText = document.createElement("p");
        figcaption[i].appendChild(productSheetDescriptionText);
        productSheetDescriptionText.classList.add(
          "product-sheet-description-text"
        );
        //affichage données descriptions//
        const descriptions = document.querySelectorAll(
          ".product-sheet-description-text"
        );
        descriptions[i].innerHTML = data[i].description;

        const divTitle = document.querySelectorAll(
          "div.product-sheet-description-title"
        );

        //création élément nom de l'ours en peluche//
        const productSheetDescriptionTitleName = document.createElement("div");
        divTitle[i].appendChild(productSheetDescriptionTitleName);
        productSheetDescriptionTitleName.classList.add(
          "product-sheet-description-title-name"
        );
        //affichage nom//
        const names = document.querySelectorAll(
          ".product-sheet-description-title-name"
        );
        names[i].innerHTML = data[i].name;

        //création élément prix de l'ours en peluche//
        const productSheetDescriptionTitlePrice = document.createElement("div");
        divTitle[i].appendChild(productSheetDescriptionTitlePrice);
        productSheetDescriptionTitlePrice.classList.add(
          "product-sheet-description-title-price"
        );
        //affichage prix//
        const prices = document.querySelectorAll(
          ".product-sheet-description-title-price"
        );
        prices[i].innerHTML = data[i].price / 100 + " euros";

        //création élément image et lien de l'ours en peluche//
        const figures = document.querySelectorAll("figure");

        const productLink = document.createElement("a");
        figures[i].appendChild(productLink);
        productLink.classList.add("product-sheet-photo-img");
        productLink.href = "product.html" + "?id=" + data[i]._id;

        const links = document.querySelectorAll("figure a");
        const img = document.createElement("img");
        links[i].appendChild(img);
        img.classList.add("product-sheet-photo-img");
        img.src = data[i].imageUrl;
      }
    });
}

displayAllProducts();

//Récupérer les données de l'API et afficher un message si le chargement ne fonctionne pas //

// .catch(function(error){
//     console.error("Oups, les ours en peluches ne sont plus ici. Merci de mettre à jour votre page.")
//     document.querySelector("main")
//     .innerText = "Oups, les ours en peluches ne sont plus ici. Merci de mettre à jour votre page.";
// })
