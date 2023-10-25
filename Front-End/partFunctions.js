// addPart
var addPart = function (id, name, description, price, quantity) {

  elementHTML = `
    <tr general-data-type = "row" data-type = "row${formatNumber(id)}" >
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-name="${name}">${name}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-description="${description}">${description}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-quantity="${quantity}">${quantity}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-price="${price}">$${price}</td>
      <td>
        <button onclick="editPart(${id}, '${name}', '${description}', ${price}, ${quantity})" uk-toggle = "#part-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
        <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
    </tr>
  `;
  itemBody.innerHTML += elementHTML;
};

// create new part
var createNewPart = function () {
  var partName = document.getElementById('partName');               //get partName from input box
  var partDescription = document.getElementById('partDescription'); //get partDescription from input box
  var partQuantity = document.getElementById('partQuantity');       //get partQuantity from input box
  var partPrice = document.getElementById('partPrice');             //get partPrice from input box
  var partID = generateRandomNumber();                              //generate a random number to be the ID

  //values are empty. don't create the item.
  if (partName.value == "" || partDescription.value == "" || partQuantity.value == "" || partPrice.value == "") {

    alert("Please fill out all empty fields.");
    return;

  } else {

    //update the frontend interface
    addPart(partID, partName.value.toString(), partDescription.value.toString(), partPrice.value, partQuantity.value);

    UIkit.modal("#part-creation-modal").hide();

    //now, reset all of the input boxes.
    setTimeout(function () {
      partName.value = "New Part";
      partDescription = "This is a new part.";
      partQuantity.value = "";
      partPrice.value = "";
    }, 1000);

  }
};

var editPart = function(id, name, description, price, quantity){
  
  document.getElementById('editPartID').value = formatNumber(id);
  document.getElementById('editPartName').value = name;
  document.getElementById('editPartDescription').value = description;
  document.getElementById('editPartPrice').value = formatPrice(price);
  document.getElementById('editPartQuantity').value = quantity;
  
  document.getElementById('editPartButton').onclick = function(){
  
  var newPartID = document.getElementById('editPartID').value;
  var newPartName = document.getElementById('editPartName').value;
  var newPartDescription = document.getElementById('editPartDescription').value;  
  var newPartPrice = document.getElementById('editPartPrice').value;
  var newPartQuantity = document.getElementById('editPartQuantity').value;
  
  editPartValues(newPartID,newPartName, newPartDescription, newPartPrice, newPartQuantity);
  
  };
  
  };
  
  var editPartValues = function(id, name, description, price, quantity) {
    // Get the element containing the HTML values to be edited.
    var element = document.querySelector(`[data-type="row${id}"]`);
  
    // Update the element's innerHTML with the new values.
    element.innerHTML = `
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-name="${name}">${name}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-description="${description}">${description}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-quantity="${quantity}">${quantity}</td>
      <td onclick="displayPartRow(${id}, '${name}', '${description}', ${price}, ${quantity})" data-price="${price}">$${price}</td>
      <td>
      <button onclick="editPart(${id}, '${name}', '${description}', ${price}, ${quantity})" uk-toggle = "#part-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
      <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
    
      `;
  
      displayPartRow(id, name, price, quantity);
      UIkit.modal("#part-edit-modal").hide();
  
      //now, reset all of the input boxes.
  setTimeout(function () {
  document.getElementById('editPartID').value = "";
  document.getElementById('editPartName').value = "";
  document.getElementById('editPartDescription').value = "";  
  document.getElementById('editPartPrice').value = "";
  document.getElementById('editPartQuantity').value = "";
      }, 1000);
  
  };


// display the row a user clicks on
var displayPartRow = function (id, name, description, price, quantity) {

  document.getElementById('selected-row').style.backgroundImage = "none";
  document.getElementById('selected-row').style.opacity = "100%";
  document.getElementById('selected-row').style.pointerEvents = "auto";
  document.getElementById('selected-row').style.transform = "scale(1)";
  // name
  document.getElementById('selected-row-name').innerHTML = name;
  document.getElementById('selected-row-description').innerHTML = description;
  document.getElementById('selected-row-quantity').innerHTML = quantity;
  document.getElementById('selected-row-price').innerHTML = "$" + formatPrice(price);
  // id
  document.getElementById('selected-row-id').innerHTML = "#" + formatNumber(id);

  document.getElementById('selected-row-delete-button').onclick = function () { deleteRow(id) };
  document.getElementById('selected-row-edit-button').onclick = function () {
UIkit.modal("#part-edit-modal").show();
editPart(id,name,description,price,quantity);

  };

  

};  