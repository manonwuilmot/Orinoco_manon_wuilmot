//Création de l'URL pour page produit//
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Récupération des données du produit//
fetch("http://localhost:3000/api/teddies/" + id)
  .then((res) => res.json())

  .then(function (data) {
    //création d'un template dynamique pour la page produit et récupération des données de l'API//

    const main = document.querySelector("main");
    main.innerHTML = `
      <div class="pop-up-confirmation">Merci beaucoup ! L'ours en peluche
        ${data.name} a bien été ajouté au panier !
        <a href="order.html" class="pop-up-links">
          <button id="gotobag">Passer ma commande
        </a>
          </button>
        <button id="continueshopping">Continuer mon shopping</button>
      </div>
      <article class="page-product-sheet">
        <figure class="page-product-sheet-photo">
          <img src="${data.imageUrl}" class="page-product-sheet-photo-img"/>
        </figure>
        <div class="page-product-sheet-description">
          <div class="page-product-sheet-description-title">
            <div class="page-product-sheet-description-title-name">${
              data.name
            }</div>
            <div class="page-product-sheet-description-title-price">${
              data.price / 100
            } €</div>
          </div>
          <p class="page-product-sheet-description-text">${data.description}</p>
        </div>
        <div class="product-colors">
          Disponible dans les coloris suivants :
          <select class="colors">
            <option placeholder="choisir un pelage">Choisir un pelage</option>
          </select>
        </div>
        <button id="btn-add" type="button">Ajouter au panier pour ${
          data.price / 100
        } euros</button>
      </article>`;

    //fonction pour les options couleurs//
    function templateOptionsColors() {
      const optionColor = document.createElement("option");
      document.querySelector(".colors").appendChild(optionColor);
      optionColor.classList.add("option-color");
    }

    //Boucle pour affichage des options couleurs//
    for (let i = 0; i < data.colors.length; i++) {
      templateOptionsColors();
      const options = document.querySelectorAll(".option-color");
      options[i].innerHTML = data.colors[i];
    }

    // récupération des données dans le local storage quand on clique sur le bouton "AddToBag"//
    const inputAddToBag = document.getElementById("btn-add");

    inputAddToBag.addEventListener("click", () => {
      //animation de la fenêtre pop-up de confirmation d'ajout au panier//
      const popupConfirmation = document.querySelector(".pop-up-confirmation");
      popupConfirmation.animate([{ opacity: "1" }], {
        duration: 1000,
        fill: "forwards",
      });
      const buttonContinueShopping =
        document.getElementById("continueshopping");
      buttonContinueShopping.addEventListener("click", () => {
        popupConfirmation.animate([{ opacity: "0" }], {
          duration: 1000,
          fill: "forwards",
        });
      });

      // // création nouvel objet, récupération contenu du produit et traduction de javascript en json//

      let product = {
        id: data._id,
        name: data.name,
        price: data.price / 100,
        quantity: 1,
        img: data.imageUrl,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      //fonction pour initialiser le panier et ajouter un nouveau produit//
      function addProduct() {
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
