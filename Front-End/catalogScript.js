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

var addNewProductToDB = function(id,name,desc,price,quantity) {
    const url = 'http://localhost:80/addNewProductToDB';
    const response = fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id:id,name:name,desc:desc,price:price,quantity:quantity})
    });
};
var deleteProductFromDB = function(id) {
  const url = 'http://localhost:80/deleteProductFromDB';
  const response = fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id:id})
  });
};

document.addEventListener("DOMContentLoaded", function(){
  console.log('hello')
    const url = 'http://localhost:80/GetProductData';
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
        addPart(json[i].product_id,json[i].product_name, json[i].price,json[i].quantity);
      }
    });
});

