//Création éléments mise en page//
const main = document.querySelector("main");
main.classList.add("main-order");

//Création formulaire de contact//
function templateForm() {
  const main = document.querySelector("main");
  main.innerHTML =
    '<h1 class="main-order-title"></h1><h2 class="main-order-title-form">Mes informations à compléter :</h2><form class="form" method="get"><div class="form-name"><label for="name">Entrer votre nom :  </label><input placeholder="Entrer votre nom ici"<required></div><div class="form-surname"><label for="name">Entrer votre prénom :  </label><input placeholder="Entrer votre prénom ici" required></div><div class="form-mail"><label for="mail">Entrer votre adresse mail :  </label><input placeholder="Entrer votre mail ici"></div><div class="form-submit"><input class="input-submit" type="submit" value="Envoyer"></input></div></form>';
}
templateForm();

//fonction pour créer un template d'un produit ajouté au panier//
function templateOrder() {
  const orderUl = document.createElement("ul");
  main.appendChild(orderUl);
  orderUl.classList.add("order-list");
  const refProduct = document.createElement("li");
  orderUl.appendChild(refProduct);
  refProduct.classList.add("order-product-ref");
  refProduct.innerHTML = "Référence du produit : ";

  const btnQuantityLess = document.createElement("button");
  orderUl.appendChild(btnQuantityLess);
  btnQuantityLess.classList.add("btn-quantity-less");
  btnQuantityLess.textContent = "-";
  const quantityProduct = document.createElement("li");
  orderUl.appendChild(quantityProduct);
  quantityProduct.classList.add("order-product-quantity");
  const btnQuantity = document.createElement("button");
  orderUl.appendChild(btnQuantity);
  btnQuantity.classList.add("btn-quantity");
  btnQuantity.textContent = "+";

  const priceProduct = document.createElement("li");
  orderUl.appendChild(priceProduct);
  priceProduct.classList.add("order-product-price");
  priceProduct.innerHTML = "Prix unitaire: ";

  const orderTotal = document.createElement("li");
  orderUl.appendChild(orderTotal);
  orderTotal.classList.add("order-product-total");
  orderTotal.innerHTML = "Prix total : ";
}

let alreadyAdded = JSON.parse(localStorage.getItem("productsInBag"));

//condition pour afficher les produits//
//si le panier existe déjà dans le local storage alors on récupère les produits et on affiche le formulaire de contact//
if (alreadyAdded) {
  //pour chaque produit présent dans le localStorage, ajouter une nouvelle ligne//
  for (let i = 0; i < alreadyAdded.length; i++) {
    templateOrder();
    //Affichage des données des produits venant du local storage dans le panier//
    const ref = document.querySelectorAll(".order-product-ref");
    const productInBag = JSON.parse(localStorage.getItem("productsInBag"));
    ref[i].textContent = "Référence du produit : " + productInBag[i].name;
    const quantities = document.querySelectorAll(".order-product-quantity");
    quantities[i].textContent = productInBag[i].quantity;
    const priceOfProduct = document.querySelectorAll(".order-product-price");
    priceOfProduct[i].textContent = productInBag[i].price;
    const totalPrice = document.querySelectorAll(".order-product-total");
    totalPrice[i].textContent =
      "Prix total : " +
      productInBag[i].price * productInBag[i].quantity +
      " euros";
  }
} else {
  //sinon afficher panier vide//
  console.log("Panier vide");
  document.querySelector(".main-order-title").textContent = "Panier vide";
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
      "Prix total : " + quantity * price[indexOfProduct].textContent + " euros";
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
        "Prix total : " +
        quantity * price[indexOfProduct].textContent +
        " euros";
    }
    //sinon si la quantité est en dessous de 0, suppression de la ligne//
    else {
      location.reload;
      localStorage.clear(Storage);
      let deleateProduct = document.querySelector(".order-list");
      deleateProduct.innerHTML = "";
    }
  });
}
