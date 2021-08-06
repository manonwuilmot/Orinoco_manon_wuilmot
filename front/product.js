//Création de l'URL pour page produit//
let params = new URL(document.location).searchParams;
let id = params.get("id");

//fonction pour créer un template dynamique pour la page produit //
function templateOneProduct() {
  const main = document.querySelector("main");
  main.classList.add("main");
  main.innerHTML =
    '<div class="pop-up-confirmation"></div><article class="page-product-sheet"><figure class="page-product-sheet-photo"><img class="page-product-sheet-photo-img"></figure><div class="page-product-sheet-description"><div class="page-product-sheet-description-title"><div class="page-product-sheet-description-title-name"></div><div class="page-product-sheet-description-title-price"></div></div><p class="page-product-sheet-description-text"></p></div><div class="product-colors">Disponible dans les coloris suivants : <select class="colors"><option placeholder="choisir un pelage">Choisir un pelage</option></select></div></article';

  //ajout d'un bouton pour ajouter le produit au panier//
  const inputAddToBag = document.createElement("button");
  const article = document.querySelector("article");
  article.appendChild(inputAddToBag);
  inputAddToBag.setAttribute("id", "btn-add");
  inputAddToBag.setAttribute("type", "button");
}
//fonction pour les options couleurs//
function templateOptionsColors() {
  //ajout des options couleurs//
  const optionColor = document.createElement("option");
  document.querySelector(".colors").appendChild(optionColor);
  optionColor.classList.add("option-color");
}

// Récupération des données du produit//
fetch("http://localhost:3000/api/teddies/" + id)
  .then((response) => response.json())

  .then(function (data) {
    //récupération du template de la page produit//
    templateOneProduct();

    //affichages des données provenant de l'API//
    document.querySelector(".page-product-sheet-photo-img").src = data.imageUrl;
    //affichage bouton avec prix dynamique//
    document.getElementById("btn-add").textContent =
      "Ajouter au panier pour " + data.price / 100 + " euros";
    //affichage de la description du produit//
    document.querySelector(".page-product-sheet-description-text").innerHTML =
      data.description;
    document.querySelector(
      ".page-product-sheet-description-title-name"
    ).innerHTML = data.name;
    //affichage du prix//
    document.querySelector(
      ".page-product-sheet-description-title-price"
    ).innerHTML = data.price / 100 + " euros";

    //Boucle pour affichage des options couleurs//
    for (let i = 0; i < data.colors.length; i++) {
      templateOptionsColors(data[i]);
      const options = document.querySelectorAll(".option-color");
      options[i].innerHTML = data.colors[i];
    }

    // récupération des données dans le local storage quand on clique sur le bouton "AddToBag"//
    const inputAddToBag = document.getElementById("btn-add");

    inputAddToBag.addEventListener("click", () => {
      //fenêtre qui s'affiche pour indiquer que le produit a bien été ajouté//
      const popupConfirmation = document.querySelector(".pop-up-confirmation");
      const nameOfProduct = document.querySelector(
        ".page-product-sheet-description-title-name"
      ).textContent;
      popupConfirmation.textContent =
        "Merci beaucoup ! L'ours en peluche " +
        nameOfProduct +
        " a bien été ajouté au panier !";

      //animation de la fenêtre//
      popupConfirmation.animate([{ opacity: "1" }], {
        duration: 1000,
        fill: "forwards",
      });
      //création de deux boutons, l'un pour aller au panier, l'autre pour retourner au shopping//
      const buttonGoToBag = document.createElement("button");
      popupConfirmation.appendChild(buttonGoToBag);
      buttonGoToBag.setAttribute("id", "gotobag");
      buttonGoToBag.innerHTML =
        '<a href="order.html" class="pop-up-links">Passer ma commande</a>';
      const buttonContinueShopping = document.createElement("button");
      popupConfirmation.appendChild(buttonContinueShopping);
      buttonContinueShopping.textContent = "Continuer mon shopping";
      buttonContinueShopping.setAttribute("id", "continueshopping");
      buttonContinueShopping.addEventListener("click", () => {
        popupConfirmation.animate([{ opacity: "0" }], {
          duration: 1000,
          fill: "forwards",
        });
      });

      // // // création nouvel objet, récupération contenu du produit et traduction de javascript en json//

      const imgOfProduct = document.querySelector(
        ".page-product-sheet-photo-img"
      ).src;
      const priceOfProduct = data.price / 100;
      const id = data._id;

      let quantity = 1;

      // créer un nouveau produit
      let product = {
        id: id,
        name: nameOfProduct,
        price: priceOfProduct,
        quantity: quantity,
        img: imgOfProduct,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      //fonction pour initialiser le panier et ajouter un nouveau produit//
      function addProduct() {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      // vérifie si le produit est déja présent dans le panier//
      // si oui, déjà présent en true, sauvegarder sa place dans le localStorage//
      let isAlreadyPresent = false;
      let i;

      for (products of cart) {
        if (products.name == product.name) {
          isAlreadyPresent = true;
          i = cart.indexOf(products);
        }
      }

      // si le produit est déjà présent dans le panier, incrémenter seulement la quantité//
      if (isAlreadyPresent) {
        cart[i].quantity = cart[i].quantity + product.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        // si non, ajoute le produit au localStorage
      } else {
        console.log("Le panier va être initialisé.");
        addProduct();
      }
    });
  });
