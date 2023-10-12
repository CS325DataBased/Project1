var itemBody = document.getElementById('itemBody');

// 4-digit number converter
function formatNumber(number) {
  return String(number).padStart(4, '0');
}

// random number generator
function generateRandomNumber() {
  const numbers = Array.from(Array(9999), (_, i) => i + 1);
  numbers.sort(() => Math.random() - 0.5);
  return numbers[0];
}



// input element that restricts input to 4 digits
const input4Elements = document.querySelectorAll('.input-4-numbers');
input4Elements.forEach(input => {
  input.addEventListener('keypress', e => {
    if (!e.key.match(/\d|Backspace/)) e.preventDefault();
    if (e.target.value.length >= 4) e.preventDefault();
  });
});





// display the row a user clicks on
var displayRow = function (id, name, price, quantity) {

  document.getElementById('selected-row').style.backgroundImage = "none";
  document.getElementById('selected-row').style.opacity = "100%";
  document.getElementById('selected-row').style.pointerEvents = "auto";
  document.getElementById('selected-row').style.transform = "scale(1)";
  // name
  document.getElementById('selected-row-name').innerHTML = name;
  // id
  document.getElementById('selected-row-id').innerHTML = "#" + formatNumber(id);

  document.getElementById('selected-row-delete-button').onclick = function () { deleteRow(id) };

  // if we're on the catalog page, display the quantity value
  if (quantity) {
    document.getElementById('selected-row-quantity').innerHTML = quantity;
  }

  // if we're on the catalog page, display the price value
  if (price) {
    document.getElementById('selected-row-price').innerHTML = "$" + price;
  }

};

// Define the deleteRow function
function deleteRow(id) {
  var row = document.querySelector('td[data-id="' + formatNumber(id) + '"]');
  if (row) {
    row.parentElement.remove();
    document.getElementById('selected-row').style = `width:calc(40% + 30px);
      background-color:#f8f8f8;
      opacity:0%;
      transition: all 0.5s, transform 0.25s;
      transform:scale(0.95);
      transform-origin: top left;
      transition-timing-function:cubic-bezier(0.8,0,0,1);
      pointer-events:none;`
  }
}

// addPart
var addPart = function (id, name, price, quantity) {
  elementHTML = `
    <tr data-type = "row${formatNumber(id)}" >
      <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-name="${name}">${name}</td>
      <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-quantity="${quantity}">${quantity}</td>
      <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-price="${price}">$${price}</td>
      <td>
        <button onclick="editPart(${id}, '${name}', ${price}, ${quantity})" uk-toggle = "#part-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
        <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
    </tr>
  `;
  itemBody.innerHTML += elementHTML;
};

// addCustomer
var addCustomer = function (id, name) {
  elementHTML = `
    <tr data-type = "row${formatNumber(id)}" >
      <td onclick="displayRow(${id}, '${name}')" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displayRow(${id}, '${name}')" data-name="${name}">${name}</td>
      <td>
        <button onclick="editCustomer(${id},'${name}' )" uk-toggle = "#customer-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
        <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
    </tr>
  `;
  itemBody.innerHTML += elementHTML;
};

// create new part
var createNewPart = function () {
  var partName = document.getElementById('partName');         //get partName from input box
  var partQuantity = document.getElementById('partQuantity'); //get partQuantity from input box
  var partPrice = document.getElementById('partPrice');       //get partPrice from input box
  var partID = generateRandomNumber();                        //generate a random number to be the ID

  //values are empty. don't create the item.
  if (partName.value == "" || partQuantity.value == "" || partPrice.value == "") {

    alert("Please fill out all empty fields.");
    return;

  } else {

    //update the frontend interface
    addPart(partID, partName.value.toString(), partPrice.value, partQuantity.value);

    UIkit.modal("#part-creation-modal").hide();

    //now, reset all of the input boxes.
    setTimeout(function () {
      partName.value = "New Part";
      partQuantity.value = "";
      partPrice.value = "";
    }, 1000);

  }
};


// create new customer
var createNewCustomer = function () {

  var customerName = document.getElementById('customerName');     //get customerName from input box
  var customerID = generateRandomNumber();                        //generate a random number to be the ID

  //values are empty. don't create the item.
  if (customerName.value == "") {

    alert("Please fill out all empty fields.");
    return;

  } else {

    //update the frontend interface
    addCustomer(customerID, customerName.value.toString());

    UIkit.modal("#customer-creation-modal").hide();

    //now, reset all of the input boxes.
    setTimeout(function () {
      customerName.value = "New Customer";
    }, 1000);

  }

};


var editPart = function(id, name, price, quantity){

document.getElementById('editPartID').value = formatNumber(id);
document.getElementById('editPartName').value = name;
document.getElementById('editPartPrice').value = price;
document.getElementById('editPartQuantity').value = quantity;

document.getElementById('editPartButton').onclick = function(){

var newPartID = document.getElementById('editPartID').value;
var newPartName = document.getElementById('editPartName').value;
var newPartPrice = document.getElementById('editPartPrice').value;
var newPartQuantity = document.getElementById('editPartQuantity').value;

editPartValues(newPartID,newPartName,newPartPrice, newPartQuantity);

};

};

var editPartValues = function(id, name, price, quantity) {
  // Get the element containing the HTML values to be edited.
  var element = document.querySelector(`[data-type="row${id}"]`);

  // Update the element's innerHTML with the new values.
  element.innerHTML = `
    <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
    <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-name="${name}">${name}</td>
    <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-quantity="${quantity}">${quantity}</td>
    <td onclick="displayRow(${id}, '${name}', ${price}, ${quantity})" data-price="${price}">$${price}</td>
    <td>
    <button onclick="editPart(${id}, '${name}', ${price}, ${quantity})" uk-toggle = "#part-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
    <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
    </td>
  
    `;

    UIkit.modal("#part-edit-modal").hide();

    //now, reset all of the input boxes.
setTimeout(function () {
document.getElementById('editPartID').value = "";
document.getElementById('editPartName').value = "";
document.getElementById('editPartPrice').value = "";
document.getElementById('editPartQuantity').value = "";
    }, 1000);

};

var editCustomer = function(id, name){

  document.getElementById('editCustomerID').value = formatNumber(id);;
  document.getElementById('editCustomerName').value = name;
  
  document.getElementById('editCustomerButton').onclick = function(){
  
  var newCustomerID = document.getElementById('editCustomerID').value;
  var newCustomerName = document.getElementById('editCustomerName').value;
  
  editCustomerValues(newCustomerID,newCustomerName);
  
  };
  
  };
  
  var editCustomerValues = function(id, name) {
    // Get the element containing the HTML values to be edited.
    var element = document.querySelector(`[data-type="row${id}"]`);
  
    // Update the element's innerHTML with the new values.
    element.innerHTML = `
      <td onclick="displayRow(${id}, '${name}')" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displayRow(${id}, '${name}')" data-name="${name}">${name}</td>
      <td>
      <button onclick="editCustomer(${id}, '${name})" uk-toggle = "#Customer-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
      <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
    
      `;
  
      UIkit.modal("#customer-edit-modal").hide();
  
      //now, reset all of the input boxes.
  setTimeout(function () {
  document.getElementById('editCustomerID').value = "";
  document.getElementById('editCustomerName').value = "";
      }, 1000);
  
  };
