var addNewOrderToDB = function(orderInfo,items,card,address,type) {
  const url = 'http://localhost:80/addCardToDB';
  const response2 = fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({cc_id:card.cc_id,cc_number:card.cc_number,cc_expiration:card.cc_expiration,cc_cvv:card.cc_cvv,cust_id:orderInfo.cust_id})
  });

  console.log(orderInfo.order_id,orderInfo.cust_id,orderInfo.order_date,orderInfo.order_amount,orderInfo.sales_tax,card.cc_id);
  const url2 = 'http://localhost:80/addNewOrderToDB';
  const response = fetch(url2, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({type:type,orderid:orderInfo.order_id,custid:orderInfo.cust_id,order_date:orderInfo.order_date,order_amount:orderInfo.order_amount,sales_tax:orderInfo.sales_tax,cc_id:card.cc_id})
  });

  const url3 = 'http://localhost:80/addAddressToDB';
  const response3 = fetch(url3, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({address_id:address.address_id,address_type:address.addressType,street:address.street,city:address.city,state:address.state,postal:address.zip,cust_id:orderInfo.cust_id})
  });
  
  const url4 = 'http://localhost:80/addOrderPrductsToDB';
  for(let i = 0;i < items.length;i++) {
    console.log(items[i].id,items[i].name,items[i].quantity,orderInfo.order_id);
    const response4 = fetch(url4, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({item_id:items[i].id,item_quantity:items[i].quantity,order_id:orderInfo.order_id})
    });
  }
};

var deleteOrderFromDB = function(orderid,type) {
  const url = 'http://localhost:80/deleteOrderFromDB';
  const response = fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({orderid:orderid,type:type})
  });
};

document.addEventListener("DOMContentLoaded", function(){
    const url = 'http://localhost:80/GetOrderData';
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
        var items = [];
        items.push({ id: 1234, name: "test", quantity: 1});
        var card = {
          number: 1234,
          expirationDate: 1234,
          cvv: 123
        };
        var address = {
          street: "1234 test",
          city: "testing",
          state: "CA",
          zip: "92506"
        };
        date = json[i].order_date;
        date = date.slice(0, 10);
        addOrder(json[i].order_id,"Returned",date,json[i].cust_id,items,card,address);
      }
    });
});