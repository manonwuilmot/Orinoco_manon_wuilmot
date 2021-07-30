//Création éléments mise en page//
const main = document.querySelector("main");
main.classList.add("main-order");

//Création formulaire de contact//
function templateForm() {
  const article = document.createElement("article");
  const body = document.querySelector("body");
  body.appendChild(article);
  article.innerHTML =
    '<h1 class="main-order-title-form">Mes informations à compléter :</h2><form class="form" method="get"><div class="form-lastname"><label for="name">Entrer votre nom :  </label><input id="lastname" placeholder="Entrer votre nom ici"required></div><div class="form-firstname"><label for="name">Entrer votre prénom :  </label><input id="firstname" placeholder="Entrer votre prénom ici" required></div><div class="form-adress"><label for="adress">Entrer votre adresse :  </label><input id="adress" placeholder="Entrer votre adresse ici"required></div><div class="form-city"><label for="city">Entrer votre ville :  </label><input id="city" placeholder="Entrer votre nom ici"required></div><div class="form-mail"><label for="mail">Entrer votre adresse mail :  </label><input id="mail" placeholder="Entrer votre mail ici" required></div><div class="form-submit"><a href="confirm.html" class="confirm"><button id="btn-submit">Envoyer</button></a></div></form>';
}

//fonction pour créer un template d'un produit ajouté au panier//
function templateOrder() {
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
  templateForm();
  //création mise en page title//
  const titleOrder = document.createElement("h1");
  main.appendChild(titleOrder);
  titleOrder.classList.add("main-order-title");
  titleOrder.textContent = "Détails de ma commande";
  const titleOrderList = document.createElement("ul");
  titleOrderList.classList.add("title-order-list");
  main.appendChild(titleOrderList);
  titleOrderList.innerHTML =
    '<li class="title-order-product-ref">/Réf du produit/</li><li class="title-order-product-img">/Image/</li><li class="title-order-product-quantity">/Quantité/</li><li class="title-order-product-price">/Prix unitaire/</li><li class="title-order-product-total">/Prix total/</li>';

  //pour chaque produit présent dans le localStorage, ajouter une nouvelle ligne//
  for (let i = 0; i < cart.length; i++) {
    templateOrder();

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
  const buttonDeleateCart = document.createElement("button");
  buttonDeleateCart.classList.add("btn-deleate-cart");
  main.appendChild(buttonDeleateCart);
  buttonDeleateCart.textContent = "Supprimer mon panier";
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

for (let i = 0; i < cart.length; i++) {
  inputQuantity[i].addEventListener("click", () => {
    cart[i].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    totalPrice();
    location.reload();
  });
}

//Décrémenter la quantité en cliquant sur le bouton - et changement de prix//
let inputQuantityLess = document.querySelectorAll(".btn-quantity-less");

for (let i = 0; i < cart.length; i++) {
  inputQuantityLess[i].addEventListener("click", () => {
    //     //si la quantité est supérieure à 0, décrémenter la quantité et afficher la nouvelle quantité et le nouveau prix dans le panier et le localstorage//
    if (cart[i].quantity > 0) {
      cart[i].quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      totalPrice();
      location.reload();
    }
    //     //sinon, supprimer la ligne et supprimer l'article du localStorage//
    else {
      const deleateLine = document.querySelectorAll(".order-list");
      deleateLine[i].textContent = "";
      cart.splice(cart[i], 1);
      location.reload();
    }
  });
}

const btnSubmit = document.getElementById("btn-submit");

//validation du formulaire et envoie en POST

const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

btnSubmit.addEventListener("click", () => {
  // on prépare les infos pour l'envoie en POST
  let contact = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    adress: document.getElementById("adress").value,
    city: document.getElementById("city").value,
    email: document.getElementById("mail").value,
  };
  // on verifie que le formulaire est correctement rempli
  if (
    (regexMail.test(contact.email) == true) &
    (regexName.test(contact.firstName) == true) &
    (regexName.test(contact.lastName) == true)
  ) {
    // on envoie en POST
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "confirm.html";
        localStorage.setItem("order", JSON.stringify(contact));
      })
      .catch((erreur) => console.log("erreur : " + erreur));
  } else {
    alert(
      "Veuillez renseigner la totalité du formulaire pour valider votre commande."
    );
  }
});
