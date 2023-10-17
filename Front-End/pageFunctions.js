var itemBody = document.getElementById('itemBody');
var idArray = [];
var nameArray = [];
var priceArray = [];
var quantityArray = [];

// 4-digit number converter
function formatNumber(number) {
  return String(number).padStart(4, '0');
}

// number to price converter
function formatPrice(number) {
  return parseFloat(number).toFixed(2);
}

// random number generator
function generateRandomNumber() {
  var numbers = Array.from(Array(9999), (_, i) => i + 1);
  numbers.sort(() => Math.random() - 0.5);
  return numbers[0];
}

// input element that restricts input to 4 digits
var input4Elements = document.querySelectorAll('.input-4-numbers');
input4Elements.forEach(input => {
  input.addEventListener('keypress', e => {
    if (!e.key.match(/\d|Backspace/)) e.preventDefault();
    if (e.target.value.length >= 4) e.preventDefault();
  });
});

// Define the deleteRow function
function deleteRow(id) {
  var row = document.querySelector('td[data-id="' + formatNumber(id) + '"]');
  if (row) {
    row.parentElement.remove();
    document.getElementById('selected-row').style = `width:calc(30% + 30px);
      background-color:#f8f8f8;
      opacity:0%;
      transition: all 0.5s, transform 0.25s;
      transform:scale(0.95);
      transform-origin: top left;
      transition-timing-function:cubic-bezier(0.8,0,0,1);
      pointer-events:none;`
  }
}

  function searchTableRow(inputElementId, tableRowElement) {
    // Get the search term from the input element.
    const searchTerm = document.getElementById(inputElementId).value;
  
    // Loop through the table row element's child elements.
    for (const element of tableRowElement) {
      // Check if the text content of the element matches the search term.
      if (element.textContent.toString().toLowerCase().includes(searchTerm)) {
        // Highlight the element.
        element.classList.add('highlight');
      } else {
        element.classList.remove('highlight');
      }
    }
  }

  
  document.getElementById('search-input').addEventListener('input', (event) => {

      // Get the table row element.
      const tableRowElement = document.querySelectorAll('tr[general-data-type="row"]');
      console.log(tableRowElement);

    if (document.getElementById('search-input').value == "" || document.getElementById('search-input').value == " " || document.getElementById('search-input').value == "  "){

      for (const element of tableRowElement) {
          // Highlight the element.
          element.classList.remove('highlight');
      }

    } else {

      // Call the searchTableRow() function.
      searchTableRow('search-input', tableRowElement);
    }
  });

