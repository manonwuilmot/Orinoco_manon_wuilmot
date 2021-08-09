const orderId = localStorage.getItem("orderId");
const order = JSON.parse(localStorage.getItem("order", "contact"));
const orderPrice = JSON.parse(localStorage.getItem("orderPrice"));

document.querySelector("main").innerHTML = `
  <h1 class="confirm-title">
    Orinoco et ses ours en peluche vous remercient !
  </h1>
  <h2 class="title-thanks">Merci ${order.contact.firstName} ${order.contact.lastName} 
  </h2>
  <p>Votre commande numéro ${orderId} a bien été enregistrée !
  </p>
  <h3>${orderPrice}
  </h3>
  <p>Vous allez recevoir très prochainement un email de confirmation pour suivre l'avancée de votre commande. <br><br>A très bientôt ! <br><br>L'équipe Orinoco
  </p>
  <img src="images/img-confirm2.jpg"></img>`;
