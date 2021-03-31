//Carrito de la compra

// Constants
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

//Initial input
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

//Main function:
//-generate the html of the product list
//-add listeners for button and inputs
var printPage = () => {
  var productListContainer = document.getElementById("product-list-container");
  //Create a product-item element for each product and add it to product-list-container
  for (const product of products) {
    productListContainer.appendChild(createProductHtml(product));
  }
  //Add a listener for the submit button
  var cartButton = document.getElementById("submit-button");
  cartButton.addEventListener("click", handleButtonClick);
  //Extra: disable the button if there's not at least one unit of product
  //Button will be disabled by default and enabled whenever a product.unit is more than 0
  cartButton.disabled = true;
};

//Generate the html for every product on the list
var createProductHtml = (product) => {
  //Create product-item div
  var productItem = document.createElement("div");
  productItem.setAttribute("class", "product-item");
  //Create inner span for product description
  var productDescription = document.createElement("span");
  productDescription.innerText = product.description;
  //Append span to product-item div
  productItem.appendChild(productDescription);
  //Create inner input for product units
  var productUnits = document.createElement("input");
  productUnits.setAttribute("class", "product-units");
  productUnits.setAttribute("type", "number");
  productUnits.setAttribute("min", "0");
  productUnits.setAttribute("max", product.stock);
  productUnits.setAttribute("value", product.units);
  //Add a listener to update the value of units with the input value
  productUnits.addEventListener(
    "change",
    event => {
        //Check if product stock allows the input value
        product.units = validateInputValue(event.target.value,product);
        //Update the input value
        event.target.value = product.units;
    }
  );
  //Extra: disable the button if there's not at least one unit of product
  //Add a listener to enable the button when the cart is not empty
  productUnits.addEventListener("change", handleInputChange);
  //Append input to product-item div
  productItem.appendChild(productUnits);
  return productItem;
};

var handleButtonClick = () => {
  //Calculate and print the subtotal, vat and total values
  var subtotal = Number(calculateSubtotal());
  var vat = Number(calculateVat());
  var total = subtotal + vat;
  document.getElementById("subtotal").innerHTML = subtotal;
  document.getElementById("vat").innerHTML = vat;
  document.getElementById("total").innerHTML = total;
};

var handleInputChange = (event) => {
  //If the value of the field is more than 0, enable the button
  if (event.target.value > 0) {
    document.getElementById("submit-button").disabled = false;
  } else {
    //Check the other fields. If all are 0, disable the button
    if (isCartEmpty()) {
      document.getElementById("submit-button").disabled = true;
    }
  }
};

var validateInputValue = (value,product) => {
    //If input value is more than the product stock, limit the value to the stock
    var limitedValue = value;
    if (value > product.stock) limitedValue = product.stock;
    return limitedValue;
} 

var isCartEmpty = () => {
  var empty = true;
  var i = 0;
  //Iterate through the products in the cart
  //and check if at least one of the inputs is more than 0
  do {
    if (products[i].units > 0) empty = false;
    i++;
  } while (empty && i < products.length - 1);
  return empty;
};

var calculateSubtotal = () => {
  var subtotal = 0;
  for (const product of products) {
    subtotal += product.price * product.units;
  }
  return subtotal.toFixed(2);
};

var calculateVat = () => {
  var vat = 0;
  for (const product of products) {
    vat += product.price * product.units * (product.tax / 100);
  }
  return vat.toFixed(2);
};

//Main call
printPage(products);
