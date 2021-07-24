// Création des éléments de la page produit //

//Création de l'URL pour page produit//
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Récupération des données d'un produit//
function displayOneProduct(id) {
  fetch("http://localhost:3000/api/teddies/" + id)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      //récupération du template de la page produit//
      templateOneProduct();

      //affichages des données provenant de l'API//
      document.querySelector(".page-product-sheet-photo-img").src =
        data.imageUrl;
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
        // indication "produit ajouté" pour l'utilisateur //
        inputAddToBag.textContent = "Produit ajouté";
        // // // création nouvel objet, récupération contenu du produit et traduction de javascript en json//
        const nameOfProduct = document.querySelector(
          ".page-product-sheet-description-title-name"
        ).textContent;
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

        let cart = JSON.parse(localStorage.getItem("cart") || "[]");

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

      //effacer le localStorage en cliquant sur bouton annuler//
      const inputCancel = document.getElementById("btn-cancel");
      inputCancel.addEventListener("click", () => {
        localStorage.clear(localStorage);
        document.getElementById("btn-add").textContent = "Ajouter au panier !";
      });
    });
}

//fenêtre pop up pour confirmation d'ajout au panier//
function popupConfirmation() {
  const contentName = document.querySelector(
    ".page-product-sheet-description-title-name"
  ).textContent;

  if (
    window.confirm(
      ` ${contentName} a bien été ajouté au panier. 
      Consulter le panier OK ou 
      Revenir à l'accueil ANNULER`
    )
  ) {
    window.location.href = "order.html";
  } else {
    window.location.href = "index.html";
  }
}

displayOneProduct(id);

//fonction pour créer un template dynamique pour la page produit//
function templateOneProduct() {
  const main = document.querySelector("main");
  main.classList.add("main");
  const article = document.createElement("article");
  main.appendChild(article);
  article.classList.add("page-product-sheet");

  const figure = document.createElement("figure");
  article.appendChild(figure);
  figure.classList.add("page-product-sheet-photo");

  const img = document.createElement("img");
  figure.appendChild(img);
  img.classList.add("page-product-sheet-photo-img");

  const figcaption = document.createElement("div");
  article.appendChild(figcaption);
  figcaption.classList.add("page-product-sheet-description");

  const divTitle = document.createElement("div");
  figcaption.appendChild(divTitle);
  divTitle.classList.add("page-product-sheet-description-title");

  const description = document.createElement("p");
  figcaption.appendChild(description);
  description.classList.add("page-product-sheet-description-text");

  const nameOfProduct = document.createElement("div");
  divTitle.appendChild(nameOfProduct);
  nameOfProduct.classList.add("page-product-sheet-description-title-name");

  const priceOfProduct = document.createElement("div");
  divTitle.appendChild(priceOfProduct);
  priceOfProduct.classList.add("page-product-sheet-description-title-price");

  //ajout des options couleurs//
  const productColors = document.createElement("div");
  article.appendChild(productColors);
  productColors.classList.add("product-colors");
  productColors.textContent = "Disponible dans les coloris suivants: ";
  const options = document.createElement("select");
  productColors.appendChild(options);
  options.classList.add("colors");
  const option = document.createElement("option");
  options.appendChild(option);
  option.setAttribute("placeholder", "choisir un pelage");
  option.innerText = "Choisir un pelage";

  //ajout d'un bouton pour ajouter le produit au panier//
  const inputAddToBag = document.createElement("button");
  article.appendChild(inputAddToBag);
  inputAddToBag.setAttribute("id", "btn-add");
  inputAddToBag.setAttribute("type", "button");

  //ajout d'un bouton pour annuler l'ajout au panier//
  const inputCancel = document.createElement("button");
  article.appendChild(inputCancel);
  inputCancel.setAttribute("id", "btn-cancel");
  inputCancel.setAttribute("type", "button");
  inputCancel.textContent = "x Annuler x";
}

function templateOptionsColors() {
  //ajout des options couleurs//
  const optionColor = document.createElement("option");
  document.querySelector(".colors").appendChild(optionColor);
  optionColor.classList.add("option-color");
}
