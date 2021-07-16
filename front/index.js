//fonction pour afficher les données provenant de l'API//

function displayAllProducts() {
  //récupération des données de l'API//
  fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())

    .then(function (data) {
      //fonction pour créer le template de base d'une fiche produit//
      function templateProduct() {
        const article = document.createElement("article");
        document.querySelector("main").appendChild(article);
        article.classList.add("product-sheet");

        const figure = document.createElement("figure");
        article.appendChild(figure);
        figure.classList.add("product-sheet-photo");

        const productLink = document.createElement("a");
        figure.appendChild(productLink);

        const img = document.createElement("img");
        productLink.appendChild(img);
        img.classList.add("product-sheet-photo-img");

        const figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);
        figcaption.classList.add("product-sheet-description");

        const title = document.createElement("div");
        figcaption.appendChild(title);
        title.classList.add("product-sheet-description-title");

        const description = document.createElement("p");
        figcaption.appendChild(description);
        description.classList.add("product-sheet-description-text");

        const nameOfProduct = document.createElement("div");
        title.appendChild(nameOfProduct);
        nameOfProduct.classList.add("product-sheet-description-title-name");

        const priceOfProduct = document.createElement("div");
        title.appendChild(priceOfProduct);
        priceOfProduct.classList.add("product-sheet-description-title-price");
      }
      //boucle pour afficher tous les produits présents dans l'API//
      for (let i = 0; i < data.length; i++) {
        //afficher un template pour chaque produit présent dans l'API//
        templateProduct();

        // //affichage description//
        const descriptions = document.querySelectorAll(
          ".product-sheet-description-text"
        );
        descriptions[i].innerHTML = data[i].description;
        // //affichage nom//
        let names = document.querySelectorAll(
          ".product-sheet-description-title-name"
        );
        names[i].textContent = data[i].name;
        // //affichage prix//
        const prices = document.querySelectorAll(
          ".product-sheet-description-title-price"
        );
        prices[i].innerHTML = data[i].price / 100 + " euros";

        // //affichage image et lien pour rediriger sur la page produit//
        const productLinks = document.querySelectorAll("figure a");
        productLinks[i].href = "product.html" + "?id=" + data[i]._id;
        const images = document.querySelectorAll("img.product-sheet-photo-img");
        images[i].src = data[i].imageUrl;
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
