//Création éléments mise en page//
const main = document.querySelector("main");
main.classList.add("main-order");

//Création formulaire de contact//
function templateForm() {
  const article = document.createElement("article");
  const body = document.querySelector("body");
  body.appendChild(article);
  article.innerHTML =
    '<h1 class="main-order-title-form">Mes informations à compléter :</h2><form class="form" method="get"><div class="form-name"><label for="name">Entrer votre nom :  </label><input placeholder="Entrer votre nom ici"<required></div><div class="form-surname"><label for="name">Entrer votre prénom :  </label><input placeholder="Entrer votre prénom ici" required></div><div class="form-mail"><label for="mail">Entrer votre adresse mail :  </label><input placeholder="Entrer votre mail ici"></div><div class="form-submit"><input class="input-submit" type="submit" value="Envoyer"></input></div></form>';
}

//fonction pour créer un template d'un produit ajouté au panier//
function templateOrder() {
  const orderUl = document.createElement("ul");
  main.appendChild(orderUl);
  orderUl.classList.add("order-list");
  orderUl.innerHTML =
    '<li class="order-product-ref"></li><li class="order-product-selectquantity"><button class="btn-quantity-less">-</button><div class="order-product-quantity"></div><button class="btn-quantity">+</button></li><li class="order-product-price"></li><li class="order-product-total"></li>';

  //   const refProduct = document.createElement("li");
  //   orderUl.appendChild(refProduct);
  //   refProduct.classList.add("order-product-ref");
  //   refProduct.innerHTML = "Référence du produit : ";

  //   const quantityProduct = document.createElement("li");
  //   const btnQuantityLess = document.createElement("button");
  //   const btnQuantity = document.createElement("button");

  //   orderUl.appendChild(btnQuantityLess);
  //   btnQuantityLess.classList.add("btn-quantity-less");
  //   btnQuantityLess.textContent = "-";
  //   orderUl.appendChild(quantityProduct);
  //   quantityProduct.classList.add("order-product-quantity");
  //   orderUl.appendChild(btnQuantity);
  //   btnQuantity.classList.add("btn-quantity");
  //   btnQuantity.textContent = "+";

  //   const priceProduct = document.createElement("li");
  //   orderUl.appendChild(priceProduct);
  //   priceProduct.classList.add("order-product-price");

  //   const orderTotal = document.createElement("li");
  //   orderUl.appendChild(orderTotal);
  //   orderTotal.classList.add("order-product-total");
}

let cart = JSON.parse(localStorage.getItem("cart"));

//condition pour afficher les produits//
//si le panier existe déjà dans le local storage alors on récupère les produits et on affiche le formulaire de contact//
if (cart) {
  templateForm();
  //création d'un titre pour la commande//
  const titleOrder = document.createElement("h1");
  main.appendChild(titleOrder);
  titleOrder.classList.add("main-order-title");
  titleOrder.textContent = "Détails de ma commande";
  const titleOrderList = document.createElement("ul");
  titleOrderList.classList.add("title-order-list");
  main.appendChild(titleOrderList);
  titleOrderList.innerHTML =
    '<li class="title-order-product-ref">Réf du produit</li><li class="title-order-product-quantity">Quantité</li><li class="title-order-product-price">Prix unitaire</li><li class="title-order-product-total">Prix total</li>';

  //pour chaque produit présent dans le localStorage, ajouter une nouvelle ligne//
  for (let i = 0; i < cart.length; i++) {
    templateOrder();
    //Affichage des données des produits venant du local storage dans le panier//
    const cart = JSON.parse(localStorage.getItem("cart"));
    const ref = document.querySelectorAll(".order-product-ref");
    const quantities = document.querySelectorAll(".order-product-quantity");
    const priceOfProduct = document.querySelectorAll(".order-product-price");
    const totalPrice = document.querySelectorAll(".order-product-total");

    ref[i].textContent = cart[i].name;
    quantities[i].textContent = cart[i].quantity;
    priceOfProduct[i].textContent = cart[i].price;

    totalPrice[i].textContent = cart[i].price * cart[i].quantity + " €";
  }
} else {
  //sinon afficher panier vide//
  main.innerHTML = '<h1 class="main-order-title">Panier vide</h1>';
}

///Incrémenter et décrémenter la quantité d'un produit///
//incrémenter la quantité en cliquant sur le bouton quantité + et changement du prix total//
let quantity = 1;
let inputQuantity = document.querySelectorAll(".btn-quantity");
let numberOfProducts = document.querySelectorAll(".order-list");
let quantities = document.querySelectorAll(".order-product-quantity");

for (
  let indexOfProduct = 0;
  indexOfProduct < numberOfProducts.length;
  indexOfProduct++
) {
  inputQuantity[indexOfProduct].addEventListener("click", () => {
    quantity++;
    quantities[indexOfProduct].textContent = quantity;
    //changement du prix total//
    let totalPrice = document.querySelectorAll(".order-product-total");
    let price = document.querySelectorAll(".order-product-price");
    totalPrice[indexOfProduct].textContent =
      quantity * price[indexOfProduct].textContent + " €";
  });
}

//Décrémenter la quantité en cliquant sur le bouton - et changement de prix//
let inputQuantityLess = document.querySelectorAll(".btn-quantity-less");

for (
  let indexOfProduct = 0;
  indexOfProduct < numberOfProducts.length;
  indexOfProduct++
) {
  inputQuantityLess[indexOfProduct].addEventListener("click", () => {
    quantity--;
    //si la quantité est supérieure à 0, afficher la nouvelle quantité//
    if (quantity > 0) {
      quantities[indexOfProduct].textContent = quantity;
      let totalPrice = document.querySelectorAll(".order-product-total");
      let price = document.querySelectorAll(".order-product-price");
      totalPrice[indexOfProduct].textContent =
        quantity * price[indexOfProduct].textContent + " euros";
    }
    //sinon si la quantité est en dessous de 0, suppression de la ligne//
    else {
      location.reload;
      localStorage.clear(Storage);
      main.innerHTML = '<h1 class="main-order-title">Panier vide</h1>';
    }
  });
}
