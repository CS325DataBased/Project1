//Test for backend functionality.

//Test post on click.
// newCustomerButton.onclick = function() {
//     button.style.backgroundColor = "red";
//     const url = 'http://localhost:80/test';
//     const response = fetch(url, {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: ''
//     });
// };
var newCustomerButton = document.getElementById("New-Customer-Button");
newCustomerButton.onclick = function() {
  var newCustomerDiv = document.getElementById("new-customer-div");
  newCustomerDiv.style.display = "block";
}
var newCid = document.getElementById("new-cid");
var newFname = document.getElementById("new-fname");
var newLname = document.getElementById("new-lname");
var newEmail = document.getElementById("new-email");
var newPhone = document.getElementById("new-phone");
var newSubmit = document.getElementById("new-submit");
var newCancel = document.getElementById("new-cancel");

newSubmit.onclick = function() {
  console.log(newCid.value,newFname.value,newLname.value,newEmail.value,newPhone.value);
  var info = {newCid: newCid.value,newFname: newFname.value,newLname: newLname.value,newEmail: newEmail.value,newPhone: newPhone.value};
    const url = 'http://localhost:80/pushNewUser';
    const response = fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    });
}


