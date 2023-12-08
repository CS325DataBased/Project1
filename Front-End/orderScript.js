var addNewOrderToDB = function(orderInfo,items,card,address,type) {
  const url = 'http://localhost:80/addCardToDB';
  const response = fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({cc_id:card.cc_id,cc_number:card.cc_number,cc_expiration:card.cc_expiration,cc_cvv:card.cc_cvv,cust_id:orderInfo.cust_id})
  });

  const url2 = 'http://localhost:80/addAddressToDB';
  const response2 = fetch(url2, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({address_id:address.address_id,address_type:address.addressType,street:address.street,city:address.city,state:address.state,postal:address.zip,cust_id:orderInfo.cust_id})
  });

  console.log(orderInfo.order_id,orderInfo.cust_id,orderInfo.order_date,orderInfo.order_amount,orderInfo.sales_tax,card.cc_id);
  const url3 = 'http://localhost:80/addNewOrderToDB';
  const response3 = fetch(url3, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({status:orderInfo.orderStatus,type:type,orderid:orderInfo.order_id,custid:orderInfo.cust_id,order_date:orderInfo.order_date,order_amount:orderInfo.order_amount,sales_tax:orderInfo.sales_tax,cc_id:card.cc_id,address_id:address.address_id})
  });
  
  const url4 = 'http://localhost:80/addOrderProductsToDB';
  console.log(items.length)
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
    const getOneTimeOrderDataURL = 'http://localhost:80/GetOneTimeOrderData';
    const response = fetch(getOneTimeOrderDataURL, {
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
      for(let i = 0;i < json.length;i++) {
        let customer_name = json[i][4].first_name + " " + json[i][4].last_name;
        let orderInfo = json[i][1];
        let items = json[i][0];
        let card = json[i][2];
        let address = json[i][3];
        console.log(json[i]);
        addOrder(formatNumber(json[i][1].order_id),orderInfo.status,json[i][1].order_date,customer_name,items,card,address);
        // let address = {address_id:json[i].address_id,addressType:json[i].address_type,street:json[i].street,city:json[i].city,state:json[i].state,zip:json[i].postal};
        // console.log(address);
        // let card = {cc_id:json[i].cc_id,cc_number:json[i].cc_number,cc_expiration:json[i].cc_expiration,cc_cvv:json[i].cc_cvv};
        // console.log(card);
        // let orderInfo = {order_id:json[i].order_id,cust_id:json[i].cust_id,order_date:json[i].order_date,order_amount:json[i].order_amount,sales_tax:json[i].sales_tax};
        // console.log(orderInfo);
      }
    });
});