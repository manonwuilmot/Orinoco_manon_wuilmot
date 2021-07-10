function templateOrder(){
    //Création des éléments de la page commande//
    const main = document.querySelector("main");
    main.classList.add("main-order");
    const orderTitle = document.createElement("h1");
    main.appendChild(orderTitle);
    orderTitle.classList.add("main-order-title");
    orderTitle.innerHTML = "Résumé de ma commande : "

    const orderUl = document.createElement("ul");
    main.appendChild(orderUl);
    orderUl.classList.add("order-list");
    const refProduct = document.createElement("li");
    orderUl.appendChild(refProduct);
    refProduct.classList.add("order-product-ref");
    refProduct.innerHTML = "Référence du produit : ";
    const quantityProduct = document.createElement("li");
    orderUl.appendChild(quantityProduct);
    quantityProduct.classList.add("order-product-quantity");
    quantityProduct.innerHTML = "Quantité : ";
    const priceProduct = document.createElement("li");
    orderUl.appendChild(priceProduct);
    priceProduct.classList.add("order-product-price");
    priceProduct.innerHTML = "Prix unitaire : ";
    
    const orderTotal = document.createElement("li");
    orderUl.appendChild(orderTotal);
    orderTotal.classList.add("order-product-total");
    orderTotal.innerHTML = "Prix total : ";

    const formTitle = document.createElement("h2");
    main.appendChild(formTitle);
    formTitle.classList.add("main-order-title-form");
    formTitle.innerHTML = "Mes informations à compléter : ";

    //création des éléments du formulaire de contact//
    const form = document.createElement("form");
    main.appendChild(form);
    form.classList.add("form");
    form.setAttribute("method", "get");

    const divFormName = document.createElement("div");
    divFormName.classList.add("form-name");
    form.appendChild(divFormName);
    const labelName = document.createElement("label");
    divFormName.appendChild(labelName);
    labelName.setAttribute("for","name");
    labelName.innerHTML ="Entrer votre nom : ";
    const inputName = document.createElement("input");
    divFormName.appendChild(inputName);
    inputName.setAttribute("placeholder","Entrer votre nom ici");
    inputName.setAttribute("required","");

    const divFormSurname = document.createElement("div");
    divFormSurname.classList.add("form-surname");
    form.appendChild(divFormSurname);
    const labelSurname = document.createElement("label");
    divFormSurname.appendChild(labelSurname);
    labelSurname.setAttribute("for","name");
    labelSurname.innerHTML ="Entrer votre prénom : ";
    const inputSurname = document.createElement("input");
    divFormSurname.appendChild(inputSurname);
    inputSurname.setAttribute("placeholder","Entrer votre prénom ici");
    inputSurname.setAttribute("required","");

    const divFormMail = document.createElement("div");
    divFormMail.classList.add("form-mail");
    form.appendChild(divFormMail);
    const labelMail = document.createElement("label");
    divFormMail.appendChild(labelMail);
    labelMail.setAttribute("for","mail");
    labelMail.innerHTML ="Entrer votre adresse mail : ";
    const inputMail = document.createElement("input");
    divFormMail.appendChild(inputMail);
    inputMail.setAttribute("placeholder","Entrer votre mail ici");
    inputName.setAttribute("required","");

    const divFormSubmit = document.createElement("div");
    divFormSubmit.classList.add("form-submit");
    form.appendChild(divFormSubmit);
    const inputSubmit = document.createElement("input");
    divFormSubmit.appendChild(inputSubmit);
    inputSubmit.classList.add("input-submit");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Envoyer");

}
templateOrder();

