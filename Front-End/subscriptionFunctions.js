// addSubscription
var addSubscription = function (id, subscriptionStatus, date, customerName, items, card, address, frequency) {
  var itemList = document.createElement('ul');
  var listItem = document.createElement('li');
  listItem.innerHTML = ``;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    listItem.innerHTML += `<div class = "details-box">
                           <h3 title = "Name" style = "font-size:14px!important;color:#333!important" ><i class="ri-price-tag-3-fill"></i> <p style = "font-size:14px!important;color:#333!important" >${item.name}</p></h3> 
                           <hr>
                           <h3 title = "ID" ><i class="ri-hashtag"></i> <p>${item.id}</p></h3> 
                           <hr>
                           <h3 title = "Quantity" ><i class="ri-numbers-fill"></i> <p>${item.quantity}</p></h3>
                           </div>`;
    itemList.appendChild(listItem);
  }

  var itemsString = '[';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    itemsString += '\n    { id: ' + item.id + ', name: \'' + item.name + '\', quantity: ' + item.quantity + ' },';
  }
  itemsString = itemsString.slice(0, -1); // remove the last comma
  itemsString += '\n]';
  console.log(itemsString);

  if (items.length == 0) {
    itemsString = '[]';
  }

  var cardString = "";
  var addressString = "";

  cardString = `card = {
        number: '${card.number}',
        expirationDate: '${card.expirationDate}',
        cvv: '${card.cvv}'
      },`;

  addressString = `address = {
        street: '${address.street}',
        city: '${address.city}',
        state: '${address.state}',
        zip: '${address.zip}'
      },`;



  elementHTML = `
    <tr general-data-type = "row" data-type = "row${formatNumber(id)}" >
      <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString},` + cardString + `` + addressString + `'` + frequency+`')" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString},` + cardString + `` + addressString + `'` + frequency+`')" data-frequency="${frequency}"><span class = '${frequency}'><i class="ri-history-fill"></i> ${frequency}</span></td>
      <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString},` + cardString + `` + addressString + `'` + frequency+`')" data-date="${date}">${date}</td>
      <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString},` + cardString + `` + addressString + `'` + frequency+`')" data-customerName="${customerName}">${customerName}</td>
      <div class = "hidden-card-display">
      <p>${card.number}</p>
      <p>${card.expirationDate}</p>
      <p>${card.CVV}</p>
      </div>
      <div class = "hidden-address-display">
      <p>${address.street}</p>
      <p>${address.city}</p>
      <p>${address.state}</p>
      <p>${address.zip}</p>
      </div>
      <div class = "hidden-subscriptionStatus-display">
      <p>${subscriptionStatus}</p>
      </div>
      <td>
        <button onclick="editSubscription(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString},` + cardString + `` + addressString + `'` + frequency+`')" uk-toggle="#subscription-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
        <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
      <div id = "hidden${formatNumber(id)}" style = "display: none;">
        ${itemList.innerHTML}
      </div>
    </tr>
  `;
  itemBody.innerHTML += elementHTML;



};


// create new subscription
var createNewSubscription = function () {
  var id = generateRandomNumber();
  var subscriptionStatus = document.getElementById('subscriptionStatus').value;
  var date = document.getElementById('subscriptionDate').value;
  var subscriptionCustomerName = document.getElementById('subscriptionCustomerName').value;
  var subscriptionPartList = document.getElementById('subscriptionPartList').children;
  var items = [];

  if (subscriptionStatus == "" || date == "" || subscriptionCustomerName == "" || subscriptionPartList.length == 0) {
    alert("Please fill out all empty fields.");
    return;
  } else {

    var partList = document.getElementById('subscriptionPartList').children;
    for (var i = 0; i < partList.length; i++) {
      var part = partList[i];
      var id = part.children[0].getAttribute('data-id');
      var name = part.children[1].getAttribute('data-name');
      var quantity = part.children[2].getAttribute('data-quantity');
      items.push({ id: id, name: name, quantity: quantity });
    }

    // add address and card info

    var cardNumber = document.getElementById('subscriptionCardNumber').value;
    var cardExpiration = document.getElementById('subscriptionCardExpiration').value;
    var cardCVV = document.getElementById('subscriptionCardCVV').value;

    var addressStreet = document.getElementById('subscriptionAddressStreet').value;
    var addressCity = document.getElementById('subscriptionAddressCity').value;
    var addressState = document.getElementById('subscriptionAddressState').value;
    var addressZip = document.getElementById('subscriptionAddressZip').value;

    var card = {
      number: cardNumber,
      expirationDate: cardExpiration,
      cvv: cardCVV
    };

    var address = {
      street: addressStreet,
      city: addressCity,
      state: addressState,
      zip: addressZip
    };

    var frequency = document.getElementById('subscriptionFrequency').value;

    addSubscription(formatNumber(id), subscriptionStatus, date, subscriptionCustomerName, items, card, address, frequency);
    UIkit.modal("#subscription-creation-modal").hide();
    setTimeout(function () {
      document.getElementById('subscriptionStatus').selectedIndex = 0;
      document.getElementById('subscriptionDate').value = "";
      document.getElementById('subscriptionCustomerName').value = "";
      document.getElementById('subscriptionPartList').innerHTML = "";
      document.getElementById('subscriptionCardNumber').value = "";
      document.getElementById('subscriptionCardExpiration').value = "";
      document.getElementById('subscriptionCardCVV').value = "";
      document.getElementById('subscriptionAddressStreet').value = "";
      document.getElementById('subscriptionAddressCity').value = "";
      document.getElementById('subscriptionAddressState').value = "";
        document.getElementById('subscriptionAddressZip').value = "";
        document.getElementById('subscriptionFrequency').selectedIndex = 0;
    }, 1000);
  }
};

var editSubscription = function (id, subscriptionStatus, date, customerName, items, card, address, frequency) {

  document.getElementById('editSubscriptionID').value = formatNumber(id);
  document.getElementById('editSubscriptionStatus').value = subscriptionStatus;
  document.getElementById('editSubscriptionDate').value = convertSingleDigitToDoubleDigit(date);
  document.getElementById('editSubscriptionCustomerName').value = customerName;
  document.getElementById('editSubscriptionCardNumber').value = card.number;
  document.getElementById('editSubscriptionCardExpiration').value = card.expirationDate;
  document.getElementById('editSubscriptionCardCVV').value = card.cvv;
  document.getElementById('editSubscriptionAddressStreet').value = address.street;
  document.getElementById('editSubscriptionAddressCity').value = address.city;
  document.getElementById('editSubscriptionAddressState').value = address.state;
  document.getElementById('editSubscriptionAddressZip').value = address.zip;
document.getElementById('editSubscriptionFrequency').value = frequency;

  // clear existing items
  document.getElementById('editSubscriptionPartList').innerHTML = "";

  // add existing items to the list
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemHTML = `
      <h4 id="${item.id}_partToAdd">
      <span data-id="${item.id}">      <i class="ri-hashtag"></i> ${formatNumber(item.id)}</span>
      <span data-name="${item.name}">                 <i class="ri-price-tag-3-fill"></i> ${item.name}</span>
      <span data-quantity="${item.quantity}">         <i class="ri-numbers-fill"></i> ${item.quantity}</span>
      <button onclick="this.parentNode.remove()"><i class="ri-delete-bin-2-fill"></i></button>
    </h4>`;

    document.getElementById('editSubscriptionPartList').innerHTML += itemHTML;
  }

  document.getElementById('editSubscriptionButton').onclick = function () {
    var newsubscriptionID = document.getElementById('editSubscriptionID').value;
    var newsubscriptionStatus = document.getElementById('editSubscriptionStatus').value;
    var newsubscriptionDate = document.getElementById('editSubscriptionDate').value;
    var newCustomerName = document.getElementById('editSubscriptionCustomerName').value;

    // get updated items
    var newItems = [];
    var partList = document.getElementById('editSubscriptionPartList').children;
    for (var i = 0; i < partList.length; i++) {
      var part = partList[i];
      var id = part.children[0].getAttribute('data-id');
      var name = part.children[1].getAttribute('data-name');
      var quantity = part.children[2].getAttribute('data-quantity');
      newItems.push({ id: id, name: name, quantity: quantity });
    }

    // get updated card and address info
    var newCard = {
      number: document.getElementById('editSubscriptionCardNumber').value,
      expirationDate: document.getElementById('editSubscriptionCardExpiration').value,
      cvv: document.getElementById('editSubscriptionCardCVV').value
    };

    var newAddress = {
      street: document.getElementById('editSubscriptionAddressStreet').value,
      city: document.getElementById('editSubscriptionAddressCity').value,
      state: document.getElementById('editSubscriptionAddressState').value,
      zip: document.getElementById('editSubscriptionAddressZip').value
    };

    var newFrequency = document.getElementById('editSubscriptionFrequency').value; 

    editSubscriptionValues(newsubscriptionID, newsubscriptionStatus, newsubscriptionDate, newCustomerName, newItems, newCard, newAddress, newFrequency);
  };
};

var editSubscriptionValues = function (id, subscriptionStatus, date, customerName, items, card, address, frequency) {

  var itemList = document.createElement('ul');
  var listItem = document.createElement('li');
  listItem.innerHTML = ``;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    listItem.innerHTML += `<div class="details-box">
                             <h3 title="Name" style="font-size:14px!important;color:#333!important"><i class="ri-price-tag-3-fill"></i> <p style="font-size:14px!important;color:#333!important">${item.name}</p></h3> 
                             <hr>
                             <h3 title="ID"><i class="ri-hashtag"></i> <p>${item.id}</p></h3> 
                             <hr>
                             <h3 title="Quantity"><i class="ri-numbers-fill"></i> <p>${item.quantity}</p></h3>
                             </div>`;
    itemList.appendChild(listItem);
  }

  // Get the element containing the HTML values to be edited.
  var element = document.querySelector(`[data-type="row${id}"]`);

  var itemsString = '[';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    itemsString += '\n    { id: ' + item.id + ', name: \'' + item.name + '\', quantity: ' + item.quantity + ' },';
  }
  itemsString = itemsString.slice(0, -1); // remove the last comma
  itemsString += '\n]';
  console.log(itemsString);

  if (items.length == 0) {
    itemsString = '[]';
  }

  var cardString = "";
  var addressString = "";

  cardString = `card = {
        number: '${card.number}',
        expirationDate: '${card.expirationDate}',
        cvv: '${card.cvv}'
      },`;

  addressString = `address = {
        street: '${address.street}',
        city: '${address.city}',
        state: '${address.state}',
        zip: '${address.zip}'
      },`;


  // Update the element's innerHTML with the new values.
  element.innerHTML = `
       <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString}, ` + cardString + `` + addressString + `'` + frequency+`')" data-id='${formatNumber(id)}'>${formatNumber(id)}</td>
       <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString},` + cardString + `` + addressString + `'` + frequency+`')" data-frequency="${frequency}"><span class = '${frequency}'><i class="ri-history-fill"></i> ${frequency}</span></td>
       <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString}, ` + cardString + `` + addressString + `'` + frequency+`')" data-date='${date}'>${date}</td>
       <td onclick="displaySubscriptionRow(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString}, ` + cardString + `` + addressString + `'` + frequency+`')" data-customerName='${customerName}'>${customerName}</td>
       <div class = "hidden-card-display">
       <p>${card.number}</p>
       <p>${card.expirationDate}</p>
       <p>${card.CVV}</p>
       </div>
       <div class = "hidden-address-display">
       <p>${address.street}</p>
       <p>${address.city}</p>
       <p>${address.state}</p>
       <p>${address.zip}</p>
       </div>
       <div class = "hidden-subscriptionStatus-display">
       <p>${subscriptionStatus}</p>
       </div>
       <td>
       <button onclick="editSubscription(${id}, '${subscriptionStatus}', '${date}', '${customerName}', items = ${itemsString},` + cardString + `` + addressString + `'` + frequency+`')" uk-toggle="#subscription-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
       <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
       </td>
       `;

  document.getElementById('hidden' + formatNumber(id)).innerHTML = itemList.innerHTML;

  displaySubscriptionRow(id, subscriptionStatus, date, customerName, items, card, address, frequency);
  UIkit.modal("#subscription-edit-modal").hide();

  //now, reset all of the input boxes.
  setTimeout(function () {
    document.getElementById('editSubscriptionID').value = "";
    document.getElementById('editSubscriptionStatus').value = "";
    document.getElementById('editSubscriptionDate').value = "";
    document.getElementById('editSubscriptionCustomerName').value = "";
    document.getElementById('editSubscriptionPartList').innerHTML = "";
    document.getElementById('editSubscriptionCardNumber').value = "";
    document.getElementById('editSubscriptionCardExpiration').value = "";
    document.getElementById('editSubscriptionCardCVV').value = "";
    document.getElementById('editSubscriptionAddressStreet').value = "";
    document.getElementById('editSubscriptionAddressCity').value = "";
    document.getElementById('editSubscriptionAddressState').value = "";
    document.getElementById('editSubscriptionAddressZip').value = "";
    document.getElementById('editSubscriptionFrequency').value = "";
  }, 1000);
};


// display the row a user clicks on
var displaySubscriptionRow = function (id, subscriptionStatus, date, customerName, items, card, address, frequency) {

  document.getElementById('subscription-view-only').style.display = "block";

  document.getElementById('selected-row').style.backgroundImage = "none";
  document.getElementById('selected-row').style.opacity = "100%";
  document.getElementById('selected-row').style.pointerEvents = "auto";
  document.getElementById('selected-row').style.transform = "scale(1)";
  // name
  document.getElementById('selected-row-status').innerHTML = subscriptionStatus;
  document.getElementById('selected-row-status').className = subscriptionStatus;

  document.getElementById('selected-row-frequency').innerHTML = frequency;
  document.getElementById('selected-row-frequency').className = frequency;

  document.getElementById('selected-row-date').innerHTML = date;
  document.getElementById('selected-row-customerName').innerHTML = customerName;

  document.getElementById('selected-row-item-list').innerHTML = document.getElementById(`hidden${formatNumber(id)}`).innerHTML;

  // id
  document.getElementById('selected-row-id').innerHTML = `<i class="ri-hashtag" style="font-size: 20px;color: #666;vertical-align: middle;"></i> ` + formatNumber(id);

  document.getElementById('selected-row-delete-button').onclick = function () { deleteRow(id) };
  document.getElementById('selected-row-edit-button').onclick = function () {
    UIkit.modal("#subscription-edit-modal").show();

    editSubscription(id, subscriptionStatus, date, customerName, items, card, address, frequency);

  };

  // parse cardNumber every 4 digits, separated by a hyphen

  var cardNumber = card.number;
  var cardNumberFormatted = "";

  for (var i = 0; i < cardNumber.length; i++) {
    if (i % 4 == 0 && i != 0) {
      cardNumberFormatted += "-";
    }
    cardNumberFormatted += cardNumber[i];
  }

  document.getElementById('selected-row-addressStreet').innerHTML = address.street;
  document.getElementById('selected-row-addressCity').innerHTML = address.city;
  document.getElementById('selected-row-addressState').innerHTML = address.state;
  document.getElementById('selected-row-addressZip').innerHTML = address.zip;

  document.getElementById('selected-row-cardNumber').innerHTML = cardNumberFormatted;
  document.getElementById('selected-row-cardExpiration').innerHTML = card.expirationDate;
  document.getElementById('selected-row-cardCVV').innerHTML = card.cvv;


};

var addPartToSubscription = function () {

  var partID = generateRandomNumber();
  var partName = document.getElementById('subscriptionPartName').value;
  var partQuantity = document.getElementById('subscriptionPartQuantity').value;
  var subscriptionPartList = document.getElementById('subscriptionPartList');

  if (partName == "" || partQuantity == "") {
    alert("Please fill out all empty fields.");
    return;
  } else {
    document.getElementById('subscriptionPartList').innerHTML += `
      <h4 id="` + partID + `_parttoadd">
      <span data-id = "`+ formatNumber(partID) + `" >      <i class="ri-hashtag"></i> ` + formatNumber(partID) + `</span>
      <span data-name = "`+ partName + `">                 <i class="ri-price-tag-3-fill"></i> ` + partName + `</span>
      <span data-quantity = "`+ partQuantity + `">         <i class="ri-numbers-fill"></i> ` + partQuantity + `</span>
      <button onclick="this.parentNode.remove()"><i class="ri-delete-bin-2-fill"></i></button>
    </h4>
    `;

    document.getElementById('subscriptionPartName').value = "";
    document.getElementById('subscriptionPartQuantity').value = "";

  }
};


var editPartToSubscription = function () {

  var partID = generateRandomNumber();
  var partName = document.getElementById('editSubscriptionPartName').value;
  var partQuantity = document.getElementById('editSubscriptionPartQuantity').value;
  var subscriptionPartList = document.getElementById('editSubscriptionPartList');

  if (partName == "" || partQuantity == "") {
    alert("Please fill out all empty fields.");
    return;
  } else {
    document.getElementById('editSubscriptionPartList').innerHTML += `<h4 id="` + partID + `_parttoadd">
      <span data-id = "`+ formatNumber(partID) + `" >      <i class="ri-hashtag"></i> ` + formatNumber(partID) + `</span>
      <span data-name = "`+ partName + `">                 <i class="ri-price-tag-3-fill"></i> ` + partName + `</span>
      <span data-quantity = "`+ partQuantity + `">         <i class="ri-numbers-fill"></i> ` + partQuantity + `</span>
      <button onclick="this.parentNode.remove()"><i class="ri-delete-bin-2-fill"></i></button>
    </h4>`;

    document.getElementById('editSubscriptionPartName').value = "";
    document.getElementById('editSubscriptionPartQuantity').value = "";

  }
};

