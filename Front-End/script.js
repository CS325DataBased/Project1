//Test for backend functionality.
var button = document.getElementById("button");

//Test post on click.
button.onclick = function() {
    button.style.backgroundColor = "red";
    const url = 'http://localhost:80/test';
    const response = fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    });
};