// //Test for backend functionality.
// var button = document.getElementById("button");

// //Test post on click.
// button.onclick = function() {
//     button.style.backgroundColor = "red";
//     const url = 'http://localhost:80/test';
//     const response = fetch(url, {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: ''
//     });
// };

var addNewCustomerToDB = function(id,first,last,email,phone) {
    const url = 'http://localhost:80/addNewCustomerToDB';
    const response = fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id:id,first:first,last:last,email:email,phone:phone})
    });
};
var deleteCustomerFromDB = function(id) {
  const url = 'http://localhost:80/deleteCustomerFromDB';
  const response = fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id:id})
  });
};

document.addEventListener("DOMContentLoaded", function(){
  console.log('hello')
    const url = 'http://localhost:80/GetCustomerData';
    const response = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })  .then((response) => {
      // Our handler throws an error if the request did not succeed.
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // Otherwise (if the response succeeded), our handler fetches the response
      // as text by calling response.text(), and immediately returns the promise
      // returned by `response.text()`.
      return response.json();
    })
    // When response.text() has succeeded, the `then()` handler is called with
    // the text, and we copy it into the `poemDisplay` box.
    .then((json) => {
      for(let i =0;i < json.length;i++) {
        console.log(json[i].customer_id);
        addCustomer(json[i].customer_id,json[i].first_name + ' ' + json[i].last_name);
      }
    });
});

