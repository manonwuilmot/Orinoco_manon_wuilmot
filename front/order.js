//Création éléments mise en page//
const main = document.querySelector("main");
main.classList.add("main-order");
let orderTitle = document.createElement("h1");
main.appendChild(orderTitle);
orderTitle.classList.add("main-order-title");
orderTitle.innerHTML = "Résumé de ma commande : ";

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

//fonction pour afficher tous les produits stockés dans le localStorage//
function displayAllProductsInBag() {
  //pour chaque produit présent dans le localStorage, ajouter une nouvelle ligne//
  for (let i = 0; i < alreadyAdded.length; i++) {
    console.log(alreadyAdded.length);
    templateOrder(alreadyAdded[i]);
    //si déjà présent dans le localStorage, remplir les informations relatives au produit//
    if (alreadyAdded) {
      //Affichage des produits venant du local storage dans le panier//
      const contentRef = document.querySelectorAll(".order-product-ref");
      const getItem = JSON.parse(localStorage.getItem("productsInBag"));
      contentRef[i].textContent = "Référence du produit : " + getItem[i].name;
      const contentQuantity = document.querySelectorAll(
        ".order-product-quantity"
      );
      contentQuantity[i].textContent = getItem[i].quantity;
      const contentPrice = document.querySelectorAll(".order-product-price");
      contentPrice[i].textContent = getItem[i].price;
      let contentTotalPrice = document.querySelectorAll(".order-product-total");
      let quantity = document.querySelector(
        ".order-product-quantity"
      ).textContent;
      contentTotalPrice[i].textContent =
        "Prix total : " + quantity * getItem[i].price + " euros";
      //sinon afficher "panier vide"//
    } else {
      document.querySelector(".order-list").innerHTML = "<li> Panier vide</li>";
    }
  }
}
displayAllProductsInBag();

//condition pour afficher le contenu du panier ou alors panier vide//
let j = 1;
//incrémenter la quantité en cliquant sur le bouton quantité et changement du prix total//
let inputQuantity = document.querySelectorAll(".btn-quantity");
for (let i = 0; i < alreadyAdded.length; i++) {
  inputQuantity[i].addEventListener("click", () => {
    j++;
    let contentQuantity = document.querySelectorAll(".order-product-quantity");
    contentQuantity[i].textContent = j;
  });
  let inputQuantityLess = document.querySelectorAll(".btn-quantity-less");
  //Décrémenter la quantité en cliquant sur le bouton - et changement de prix//
  inputQuantityLess[i].addEventListener("click", () => {
    if (j > 0) {
      j--;
      let contentQuantity = document.querySelectorAll(
        ".order-product-quantity"
      );
      contentQuantity[i].textContent = j;
    }
    //si la quantité est en dessous de 0, afficher panier vide.
    else {
      location.reload;
      localStorage.clear(Storage);
      let orderTitle = document.querySelector("h1");
      orderTitle.textContent = "Panier vide";
    }
  });
}

//création des éléments du formulaire de contact//
let formTitle = document.createElement("h2");
main.appendChild(formTitle);
formTitle.classList.add("main-order-title-form");
formTitle.innerHTML = "Mes informations à compléter : ";
const form = document.createElement("form");
main.appendChild(form);
form.classList.add("form");
form.setAttribute("method", "get");

const divFormName = document.createElement("div");
divFormName.classList.add("form-name");
form.appendChild(divFormName);
const labelName = document.createElement("label");
divFormName.appendChild(labelName);
labelName.setAttribute("for", "name");
labelName.innerHTML = "Entrer votre nom : ";
const inputName = document.createElement("input");
divFormName.appendChild(inputName);
inputName.setAttribute("placeholder", "Entrer votre nom ici");
inputName.setAttribute("required", "");

const divFormSurname = document.createElement("div");
divFormSurname.classList.add("form-surname");
form.appendChild(divFormSurname);
const labelSurname = document.createElement("label");
divFormSurname.appendChild(labelSurname);
labelSurname.setAttribute("for", "name");
labelSurname.innerHTML = "Entrer votre prénom : ";
const inputSurname = document.createElement("input");
divFormSurname.appendChild(inputSurname);
inputSurname.setAttribute("placeholder", "Entrer votre prénom ici");
inputSurname.setAttribute("required", "");

const divFormMail = document.createElement("div");
divFormMail.classList.add("form-mail");
form.appendChild(divFormMail);
const labelMail = document.createElement("label");
divFormMail.appendChild(labelMail);
labelMail.setAttribute("for", "mail");
labelMail.innerHTML = "Entrer votre adresse mail : ";
const inputMail = document.createElement("input");
divFormMail.appendChild(inputMail);
inputMail.setAttribute("placeholder", "Entrer votre mail ici");
inputName.setAttribute("required", "");

const divFormSubmit = document.createElement("div");
divFormSubmit.classList.add("form-submit");
form.appendChild(divFormSubmit);
const inputSubmit = document.createElement("input");
divFormSubmit.appendChild(inputSubmit);
inputSubmit.classList.add("input-submit");
inputSubmit.setAttribute("type", "submit");
inputSubmit.setAttribute("value", "Envoyer");
