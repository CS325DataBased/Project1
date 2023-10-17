// addCustomer
var addCustomer = function (id, firstName, lastName, email, phone) {

  elementHTML = `
    <tr general-data-type = "row" data-type = "row${formatNumber(id)}" >
      <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-name="${firstName}_${lastName}">${firstName} ${lastName}</td>
      <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-email="${email}">${email}</td>
      <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-phone="${phone}">${phone}</td>
     
      <td>
        <button onclick="editCustomer(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" uk-toggle = "#customer-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
        <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
    </tr>
  `;
  itemBody.innerHTML += elementHTML;
};

// create new customer
var createNewCustomer = function () {

  var customerFirstName = document.getElementById('customerFirstName');
  var customerLastName = document.getElementById('customerLastName');
  var customerEmail = document.getElementById('customerEmail');
  var customerPhone = document.getElementById('customerPhone');
  var customerID = generateRandomNumber();                        //generate a random number to be the ID

  //values are empty. don't create the item.
  if (customerFirstName.value == "" || customerLastName.value == "" || customerEmail.value == "" || customerPhone.value == "") {

    alert("Please fill out all empty fields.");
    return;

  } else {

    //update the frontend interface
    addCustomer(customerID, customerFirstName.value.toString(), customerLastName.value.toString(), customerEmail.value.toString(), customerPhone.value.toString());
    addNewCustomerToDB(customerID, customerFirstName.value.toString(), customerLastName.value.toString(), customerEmail.value.toString(), customerPhone.value.toString());
    UIkit.modal("#customer-creation-modal").hide();

    //now, reset all of the input boxes.
    setTimeout(function () {
      customerFirstName.value = "";
      customerLastName.value = "";
      customerEmail.value = "";
      customerPhone.value = "";
    }, 1000);

  }

};

var editCustomer = function(id, firstName, lastName, email, phone){

  UIkit.modal("#customer-edit-modal").show();

  document.getElementById('editCustomerID').value = formatNumber(id);;
  document.getElementById('editCustomerFirstName').value = firstName;
  document.getElementById('editCustomerLastName').value = lastName;
  document.getElementById('editCustomerEmail').value = email;
  document.getElementById('editCustomerPhone').value = phone;
  
  document.getElementById('editCustomerButton').onclick = function(){
  
  var newCustomerID = document.getElementById('editCustomerID').value;
  var newCustomerFirstName = document.getElementById('editCustomerFirstName').value;
  var newCustomerLastName = document.getElementById('editCustomerLastName').value;
  var newCustomerEmail = document.getElementById('editCustomerEmail').value;
  var newCustomerPhone = document.getElementById('editCustomerPhone').value;

  editCustomerValues(newCustomerID,newCustomerFirstName, newCustomerLastName, newCustomerEmail, newCustomerPhone);
  
  };
  
  };
  
var editCustomerValues = function(id, firstName, lastName, email, phone) {
    // Get the element containing the HTML values to be edited.
    var element = document.querySelector(`[data-type="row${id}"]`);
  
    // Update the element's innerHTML with the new values.
    element.innerHTML = `
    <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
    <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-name="${firstName}_${lastName}">${firstName} ${lastName}</td>
    <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-email="${email}">${email}</td>
    <td onclick="displayCustomerRow(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" data-phone="${phone}">${phone}</td>
    <td>
      <button onclick="editCustomer(${id}, '${firstName}','${lastName}', '${email}', '${phone}')" uk-toggle = "#customer-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
      <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
    </td>
      `;
  
      displayCustomerRow(id, firstName, lastName, email, phone);
      UIkit.modal("#customer-edit-modal").hide();
  
      //now, reset all of the input boxes.
  setTimeout(function () {
  document.getElementById('editCustomerID').value = "";
  document.getElementById('editCustomerFirstName').value = "";
  document.getElementById('editCustomerLastName').value = "";
  document.getElementById('editCustomerEmail').value = "";
  document.getElementById('editCustomerPhone').value = "";
      }, 1000);
  
  };

// display the row a user clicks on
var displayCustomerRow = function (id, firstName, lastName, email, phone) {

  document.getElementById('selected-row').style.backgroundImage = "none";
  document.getElementById('selected-row').style.opacity = "100%";
  document.getElementById('selected-row').style.pointerEvents = "auto";
  document.getElementById('selected-row').style.transform = "scale(1)";
  // name
  document.getElementById('selected-row-name').innerHTML = firstName + " " + lastName;
  // id
  document.getElementById('selected-row-id').innerHTML = "#" + formatNumber(id);
  document.getElementById('selected-row-email').innerHTML = email;
  document.getElementById('selected-row-phone').innerHTML = phone;

  document.getElementById('selected-row-delete-button').onclick = function () { deleteRow(id) };
  document.getElementById('selected-row-edit-button').onclick = function () {
editCustomerValues(id, firstName, lastName, email, phone);
  };


};  