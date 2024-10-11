let cart = [];
let cartCount = 0;

function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
}

function openCartSummary() {
  let cartWindow = window.open("", "Cart Summary", "width=400,height=400");
  cartWindow.document.write("<h1>Resumen de Compra</h1>");
  let total = 0;
  cart.forEach(item => {
    cartWindow.document.write(`<p>${item.name} - $${item.price.toFixed(2)}</p>`);
    total += item.price;
  });
  cartWindow.document.write(`<h2>Total: $${total.toFixed(2)}</h2>`);
}
