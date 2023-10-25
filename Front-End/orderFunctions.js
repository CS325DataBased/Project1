// addOrder
var addOrder = function (id, orderStatus, date, customerName, items) {
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
  elementHTML = `
    <tr general-data-type = "row" data-type = "row${formatNumber(id)}" >
      <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-id="${formatNumber(id)}">${formatNumber(id)}</td>
      <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-status="${orderStatus}"><span class = '${orderStatus}'>${orderStatus}</span></td>
      <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-date="${date}">${date}</td>
      <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-customerName="${customerName}">${customerName}</td>
      <td>
        <button onclick="editOrder(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" uk-toggle="#order-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
        <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
      </td>
      <div id = "hidden${formatNumber(id)}" style = "display: none;">
        ${itemList.innerHTML}
      </div>
    </tr>
  `;
  itemBody.innerHTML += elementHTML;
};


// create new Order
var createNewOrder = function () {
  var id = generateRandomNumber();
  var orderStatus = document.getElementById('orderStatus').value;
  var date = document.getElementById('orderDate').value;
  var orderCustomerName = document.getElementById('orderCustomerName').value;
  var orderPartList = document.getElementById('orderPartList').children;
  var items = [];

  if (orderStatus == "" || date == "" || orderCustomerName == "" || orderPartList.length == 0) {
    alert("Please fill out all empty fields.");
    return;
  } else {

    var partList = document.getElementById('orderPartList').children;
    for (var i = 0; i < partList.length; i++) {
      var part = partList[i];
      var id = part.children[0].getAttribute('data-id');
      var name = part.children[1].getAttribute('data-name');
      var quantity = part.children[2].getAttribute('data-quantity');
      items.push({ id: id, name: name, quantity: quantity });
    }

    addOrder(formatNumber(id), orderStatus, date, orderCustomerName, items);
    UIkit.modal("#order-creation-modal").hide();
    setTimeout(function () {
      document.getElementById('orderStatus').selectedIndex = 0;
      document.getElementById('orderDate').value = "";
      document.getElementById('orderCustomerName').value = "";
      document.getElementById('orderPartList').innerHTML = "";
    }, 1000);
  }
};

var editOrder = function (id, orderStatus, date, customerName, items) {



  document.getElementById('editOrderID').value = formatNumber(id);
  document.getElementById('editOrderStatus').value = orderStatus;
  document.getElementById('editOrderDate').value = convertSingleDigitToDoubleDigit(date);
  document.getElementById('editCustomerName').value = customerName;

  // clear existing items
  document.getElementById('editOrderPartList').innerHTML = "";

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

      document.getElementById('editOrderPartList').innerHTML += itemHTML;
    }

    document.getElementById('editOrderButton').onclick = function () {
      var newOrderID = document.getElementById('editOrderID').value;
      var newOrderStatus = document.getElementById('editOrderStatus').value;
      var newOrderDate = document.getElementById('editOrderDate').value;
      var newCustomerName = document.getElementById('editCustomerName').value;

      // get updated items
      var newItems = [];
      var partList = document.getElementById('editOrderPartList').children;
      for (var i = 0; i < partList.length; i++) {
        var part = partList[i];
        var id = part.children[0].getAttribute('data-id');
        var name = part.children[1].getAttribute('data-name');
        var quantity = part.children[2].getAttribute('data-quantity');
        newItems.push({ id: id, name: name, quantity: quantity });
      }

      editOrderValues(newOrderID, newOrderStatus, newOrderDate, newCustomerName, newItems);
    };
  };

  var editOrderValues = function (id, orderStatus, date, customerName, items) {

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
    

    // Update the element's innerHTML with the new values.
    element.innerHTML = `
       <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-id='${formatNumber(id)}'>${formatNumber(id)}</td>
       <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-orderStatus='${orderStatus}'><span class = '${orderStatus}'>${orderStatus}</span></td>
       <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-date='${date}'>${date}</td>
       <td onclick="displayOrderRow(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString})" data-customerName='${customerName}'>${customerName}</td>
       <td>
       <button onclick="editOrder(${id}, '${orderStatus}', '${date}', '${customerName}', items = ${itemsString});" uk-toggle="#order-edit-modal" class="uk-button uk-button-default uk-edit-button"><i class="ri-pencil-fill"></i></button>
       <button onclick="deleteRow(${id})" class="uk-button uk-button-default uk-delete-button"><i class="ri-delete-bin-fill"></i></button>
       </td>
       `;

    document.getElementById('hidden' + formatNumber(id)).innerHTML = itemList.innerHTML;

    displayOrderRow(id, orderStatus, date, customerName, items);
    UIkit.modal("#order-edit-modal").hide();

    //now, reset all of the input boxes.
    setTimeout(function () {
      document.getElementById('editOrderID').value = "";
      document.getElementById('editOrderStatus').value = "";
      document.getElementById('editOrderDate').value = "";
      document.getElementById('editCustomerName').value = "";
      document.getElementById('editOrderPartList').innerHTML = "";
    }, 1000);
  };


  // display the row a user clicks on
  var displayOrderRow = function (id, orderStatus, date, customerName, items) {

    document.getElementById('selected-row').style.backgroundImage = "none";
    document.getElementById('selected-row').style.opacity = "100%";
    document.getElementById('selected-row').style.pointerEvents = "auto";
    document.getElementById('selected-row').style.transform = "scale(1)";
    // name
    document.getElementById('selected-row-orderStatus').innerHTML = orderStatus;
    document.getElementById('selected-row-orderStatus').className = orderStatus;
    document.getElementById('selected-row-date').innerHTML = date;
    document.getElementById('selected-row-customerName').innerHTML = customerName;

    document.getElementById('selected-row-item-list').innerHTML = document.getElementById(`hidden${formatNumber(id)}`).innerHTML;

    // id
    document.getElementById('selected-row-id').innerHTML = `<i class="ri-hashtag" style="font-size: 20px;color: #666;vertical-align: middle;"></i> ` + formatNumber(id);

    document.getElementById('selected-row-delete-button').onclick = function () { deleteRow(id) };
    document.getElementById('selected-row-edit-button').onclick = function () {
      editOrder(id, orderStatus, date, customerName, items);

    };



  };

var addPartToOrder = function () {

  var partID = generateRandomNumber();
  var partName = document.getElementById('orderPartName').value;
  var partQuantity = document.getElementById('orderPartQuantity').value;
  var orderPartList = document.getElementById('orderPartList');

  if (partName == "" || partQuantity == "") {
    alert("Please fill out all empty fields.");
    return;
  } else {
    document.getElementById('orderPartList').innerHTML += `
      <h4 id="` + partID + `_parttoadd">
      <span data-id = "`+ formatNumber(partID) + `" >      <i class="ri-hashtag"></i> ` + formatNumber(partID) + `</span>
      <span data-name = "`+ partName + `">                 <i class="ri-price-tag-3-fill"></i> ` + partName + `</span>
      <span data-quantity = "`+ partQuantity + `">         <i class="ri-numbers-fill"></i> ` + partQuantity + `</span>
      <button onclick="this.parentNode.remove()"><i class="ri-delete-bin-2-fill"></i></button>
    </h4>
    `;

    document.getElementById('orderPartName').value = "";
    document.getElementById('orderPartQuantity').value = "";

  }
};


var editPartToOrder = function () {

  var partID = generateRandomNumber();
  var partName = document.getElementById('editOrderPartName').value;
  var partQuantity = document.getElementById('editOrderPartQuantity').value;
  var orderPartList = document.getElementById('editOrderPartList');

  if (partName == "" || partQuantity == "") {
    alert("Please fill out all empty fields.");
    return;
  } else {
    document.getElementById('editOrderPartList').innerHTML += `<h4 id="` + partID + `_parttoadd">
      <span data-id = "`+ formatNumber(partID) + `" >      <i class="ri-hashtag"></i> ` + formatNumber(partID) + `</span>
      <span data-name = "`+ partName + `">                 <i class="ri-price-tag-3-fill"></i> ` + partName + `</span>
      <span data-quantity = "`+ partQuantity + `">         <i class="ri-numbers-fill"></i> ` + partQuantity + `</span>
      <button onclick="this.parentNode.remove()"><i class="ri-delete-bin-2-fill"></i></button>
    </h4>`;

    document.getElementById('editOrderPartName').value = "";
    document.getElementById('editOrderPartQuantity').value = "";

  }
};








