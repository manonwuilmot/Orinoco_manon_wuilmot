//récupération des données de l'API//
function displayAllProducts() {
  fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())

    .then(function (data) {
      //boucle pour afficher tous les produits présents dans l'API//

      for (let i = 0; i < data.length; i++) {
        // création éléments de mise en page du template d'un produit et récupération des données de l'API//
        const main = document.querySelector("main");
        const article = document.createElement("article");
        article.classList.add("product-sheet");
        main.appendChild(article);
        article.innerHTML = `
  <figure class="product-sheet-photo">
    <a href="product.html?id=${data[i]._id}">
      <img class="product-sheet-photo-img" src="${data[i].imageUrl}"/>
    </a>
    <figcaption class="product-sheet-description">
      <div class="product-sheet-description-title">
        <div class="product-sheet-description-title-name">
          ${data[i].name}
        </div>
        <div class="product-sheet-description-title-price">
          ${data[i].price / 100} euros
        </div>
      </div>
      <p>
        ${data[i].description}
      </p>
    </figcaption>
  </figure>
`;
      }
    })

    // Afficher un message d'erreur si le chargement des données de l'API ne fonctionne pas //

    .catch(function (error) {
      console.error(
        "Oups, les ours en peluches ne sont plus ici. Merci de mettre à jour votre page."
      );
      document.querySelector("main").innerText =
        "Oups, les ours en peluches ne sont plus ici. Merci de mettre à jour votre page.";
    });
}
displayAllProducts();
