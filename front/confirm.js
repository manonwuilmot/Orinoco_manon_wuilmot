function templateConfirmOrder() {
  const main = document.querySelector("main");
  main.innerHTML =
    '<h1 class="confirm-title">Orinoco et ses ours en peluche vous remercient !</h1><h2 class="title-thanks"></h2><p></p><h3></h3><p>Vous allez recevoir très prochainement un email de confirmation pour suivre l\'avancée de votre commande. <br><br>A très bientôt ! <br><br>L\'équipe Orinoco</p><img src="images/img-confirm2.jpg"></img>';
}

templateConfirmOrder();

const orderId = localStorage.getItem("orderId");
const order = JSON.parse(localStorage.getItem("order", "contact"));
const orderPrice = JSON.parse(localStorage.getItem("orderPrice"));

document.querySelector("h2").textContent =
  "Merci " + order.contact.firstName + " " + order.contact.lastName;
document.querySelector("h3").textContent = orderPrice;

document.querySelector("p").textContent =
  " Votre commande numéro " + orderId + " a bien été enregistrée ! ";
