//Création éléments mise en page//
const main = document.querySelector("main");
main.classList.add("main-order");

//Création formulaire de contact//
function templateForm() {
  const article = document.createElement("article");
  const body = document.querySelector("body");
  body.appendChild(article);
  article.innerHTML =
    '<h2 class="main-order-title-form">Mes informations à compléter :</h2><form class="form" method="get"><div class="form-lastname"><label for="name">Entrer votre nom :  </label><input id="lastname" placeholder="Entrer votre nom ici"required></div><div class="form-firstname"><label for="name">Entrer votre prénom :  </label><input id="firstname" placeholder="Entrer votre prénom ici" required></div><div class="form-address"><label for="address">Entrer votre adresse :  </label><input id="address" placeholder="Entrer votre adresse ici"required></div><div class="form-city"><label for="city">Entrer votre ville :  </label><input id="city" placeholder="Entrer votre nom ici"required></div><div class="form-mail"><label for="mail">Entrer votre adresse mail :  </label><input id="mail" placeholder="Entrer votre mail ici" required></div><div class="form-submit"><button id="btn-submit">Envoyer</button></div></form>';
}

//création mise en page title//
function displayTitle() {
  main.innerHTML =
    '<h1 class="main-order-title">Détails de ma commande</h1><ul class="title-order-list"><li class="title-order-product-ref">/Réf du produit/</li><li class="title-order-product-img">/Image/</li><li class="title-order-product-quantity">/Quantité/</li><li class="title-order-product-price">/Prix unitaire/</li><li class="title-order-product-total">/Prix total/</li></ul>';
}

//fonction pour créer un template d'un produit ajouté au panier//
function templateProduct() {
  const orderUl = document.createElement("ul");
  main.appendChild(orderUl);
  orderUl.classList.add("order-list");
  orderUl.innerHTML =
    '<li class="order-product-ref"></li><li class="order-product-photo"><img class="order-product-img"</li><li class="order-product-selectquantity"><button class="btn-quantity">+</button><div class="order-product-quantity"></div><button class="btn-quantity-less">-</button></li><li class="order-product-price"></li><li class="order-product-total"></li>';
}

//fonction calcul du prix total pour un article//
function totalPrice() {
  for (let i = 0; i < cart.length; i++) {
    let totalPrice = document.querySelectorAll(".order-product-total");
    totalPrice[i].textContent = cart[i].quantity * cart[i].price + " €";
  }
}
//fonction calcul du prix total du panier//
function displayTotalCart() {
  let totalCart = 0;
  cart.forEach((product) => {
    totalCart = totalCart + product.price * product.quantity;
  });
  return totalCart;
}

// supprimer le panier//
function clearCart() {
  localStorage.clear();
  location.reload();
}

let cart = JSON.parse(localStorage.getItem("cart"));

//condition pour afficher les produits//
//si le panier existe déjà dans le local storage alors on récupère les produits et on affiche le formulaire de contact//
if (cart) {
  displayTitle();
  templateForm();

  //pour chaque produit présent dans le localStorage, ajouter une nouvelle ligne//
  for (let i = 0; i < cart.length; i++) {
    templateProduct();

    //Affichage des données des produits venant du local storage dans le panier//
    const cart = JSON.parse(localStorage.getItem("cart"));
    const ref = document.querySelectorAll(".order-product-ref");
    const img = document.querySelectorAll(".order-product-img");
    const quantities = document.querySelectorAll(".order-product-quantity");
    const priceOfProduct = document.querySelectorAll(".order-product-price");
    const totalPrice = document.querySelectorAll(".order-product-total");

    ref[i].textContent = cart[i].name;
    img[i].src = cart[i].img;
    quantities[i].textContent = cart[i].quantity;
    priceOfProduct[i].textContent = cart[i].price + " €";
    totalPrice[i].textContent = cart[i].price * cart[i].quantity + " €";
  }
  //création ligne prix total//
  const lineTotalPrice = document.createElement("ul");
  main.appendChild(lineTotalPrice);
  lineTotalPrice.classList.add("title-order-total");
  lineTotalPrice.innerHTML =
    " <span>Prix total de ma commande : </span>" + displayTotalCart() + " €";

  //création d'un bouton pour supprimer l'intégralité du panier//
  const buttonDeleteCart = document.createElement("button");
  buttonDeleteCart.classList.add("btn-deleate-cart");
  main.appendChild(buttonDeleteCart);
  buttonDeleteCart.textContent = "Supprimer mon panier";
  document.querySelector(".btn-deleate-cart").addEventListener("click", () => {
    clearCart();
  });
} else {
  //sinon afficher panier vide//
  main.innerHTML = '<h1 class="main-order-title">Panier vide</h1>';
}

///Incrémenter et décrémenter la quantité d'un produit///
//incrémenter la quantité en cliquant sur le bouton quantité + et changement du prix total//

let quantity = 1;
let inputQuantity = document.querySelectorAll(".btn-quantity");

function addProduct() {
  localStorage.setItem("cart", JSON.stringify(cart));
  totalPrice();
  location.reload();
}

for (let i = 0; i < cart.length; i++) {
  inputQuantity[i].addEventListener("click", () => {
    cart[i].quantity++;
    addProduct();
  });
}

//Décrémenter la quantité en cliquant sur le bouton - et changement de prix//
let inputQuantityLess = document.querySelectorAll(".btn-quantity-less");

for (let i = 0; i < cart.length; i++) {
  inputQuantityLess[i].addEventListener("click", () => {
    //     //si la quantité est supérieure à 1, décrémenter la quantité et afficher la nouvelle quantité et le nouveau prix dans le panier et le localstorage//
    if (cart[i].quantity > 1) {
      cart[i].quantity--;
      addProduct();
    } else {
      let index;
      // //     //sinon, supprimer la ligne et supprimer l'article du localStorage//
      cart.splice(index, 1);
      addProduct();
      const deleateLine = document.querySelectorAll(".order-list");
      deleateLine[i].textContent = "";
    }
  });
}

//validation du formulaire et envoie en POST
const btnSubmit = document.getElementById("btn-submit");

const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity =
  /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  // on prépare les informations de contact pour l'envoie en POST
  let contact = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("mail").value,
  };

  // on vérifie que le formulaire est correctement rempli
  if (
    (regexMail.test(contact.email) == true) &
    (regexName.test(contact.firstName) == true) &
    (regexName.test(contact.lastName) == true) &
    (regexAddress.test(contact.address) == true) &
    (regexCity.test(contact.city) == true) &
    (regexMail.test(contact.email) == true)
  ) {
    //on crée un objet contenant le/les identifiant/s du/des produit(s) sélectionné(s) et les informations du client//
    let products = [];
    for (product of cart) {
      products.push(product.id);
    }
    let contactItems = JSON.stringify({
      contact,
      products,
    });
    const orderPrice = document.querySelector(".title-order-total").textContent;
    localStorage.setItem("orderPrice", JSON.stringify(orderPrice));
    // on envoie en POST
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: contactItems,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("order", JSON.stringify({ contact, products }));
        localStorage.setItem("orderId", data.orderId);
        window.location.href = "confirm.html";
      });
  } else {
    alert(
      "Veuillez renseigner la totalité du formulaire pour valider votre commande."
    );
  }
});
