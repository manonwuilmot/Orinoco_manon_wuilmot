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
        const contentName = document.querySelector(
          ".page-product-sheet-description-title-name"
        ).textContent;
        const contentImg = document.querySelector(
          ".page-product-sheet-photo-img"
        ).src;
        const contentPrice = data.price / 100;
        const contentId = data._id;

        let product = {
          name: contentName,
          img: contentImg,
          price: contentPrice,
          quantity: 1,
          id: contentId,
        };

        function addItemToCart() {
          let products = JSON.parse(
            localStorage.getItem("productsInBag") || "[]"
          );

          products.push(product);
          localStorage.setItem("productsInBag", JSON.stringify(products));
          console.log(product.name);
        }

        // Si déjà dans le localStorage alors afficher "Nouveau produit ajouté"//
        let alreadyAdded = JSON.parse(localStorage.getItem("productsInBag"));
        i = 0;
        if (alreadyAdded && alreadyAdded[i].name === contentName) {
          console.log("Le panier contient déjà un ourson");
        }
        //Sinon initialiser un nouvel objet dans lequel stocker les données//
        else {
          console.log("Le panier va être initialisé");
          addItemToCart();
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
