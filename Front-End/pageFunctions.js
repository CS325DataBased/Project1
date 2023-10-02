function formatNumber(number) {
    return String(number).padStart(4, '0');
  }


var displayRow = function(id, name, price, quantity){

document.getElementById('selected-row-name').innerHTML = name;
document.getElementById('selected-row-id').innerHTML = "#"+formatNumber(id);
document.getElementById('selected-row-quantity').innerHTML = quantity;
document.getElementById('selected-row-price').innerHTML = "$"+price;

};

var itemBody = document.getElementById('itemBody');

var addItem = function (id, name, price, quantity) {

    elementHTML = `
<tr onclick = "displayRow(`+id+`, '`+name+`', `+price+`, `+quantity+`)" >
            <td data-id = `+formatNumber(id)+` >`+ formatNumber(id) + `</td>
            <td data-name = "`+name+`" >`+ name + `</td>
            <td data-quantity = `+quantity+` >`+ quantity + `</td>
            <td data-price = "`+price+`" >$`+ price + `</td>
            <td>
			<button onclick = "" class = "uk-button uk-button-default uk-edit-button" ><i class="ri-pencil-fill"></i></button>
			<button onclick = "" class = "uk-button uk-button-default uk-delete-button" ><i class="ri-delete-bin-fill"></i></button>
			</td>
</tr>
`;

    itemBody.innerHTML += elementHTML;


};

var addCustomer = function (id, name) {

    elementHTML = `
<tr onclick = "displayRow(`+id+`, '`+name+`')">
            <td data-id = `+formatNumber(id)+` >`+ formatNumber(id) + `</td>
            <td data-name = "`+name+`" >`+ name + `</td>
            <td>
			<button onclick = "" class = "uk-button uk-button-default uk-edit-button" ><i class="ri-pencil-fill"></i> Edit</button>
			<button onclick = "" class = "uk-button uk-button-default uk-delete-button" ><i class="ri-delete-bin-fill"></i> Delete</button>
			</td>
</tr>
`;

    itemBody.innerHTML += elementHTML;

};

