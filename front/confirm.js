function templateConfirmOrder() {
  const main = document.querySelector("main");
  main.innerHTML =
    '<h1 class="confirm-title">Orinoco et ses ours en peluche vous remercient</h1><p></p><p> Votre commande a bien été enregistrée. <br><br>Vous allez recevoir très prochainement un email de confirmation pour suivre l\'avancée de votre commande. <br><br>A très bientôt ! <br><br>L\'équipe Orinoco</p><img src="images/img-confirm2.jpg"></img>';
}

templateConfirmOrder();

fetch("http://localhost:3000/api/teddies/order")
  .then((response) => response.json())

  .then(function (data) {
    const order = JSON.parse(localStorage.getItem("order"));
    console.log(order);
    document.querySelector("p").textContent =
      "Merci " + order.firstName + " " + order.lastName;
  });
