let cart = [];
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const notificationElement = document.querySelector('.notification');
const proceedButtonElement = document.getElementById('proceed-button'); // Asegúrate de que este elemento esté en tu HTML

// Función para añadir un producto al carrito
function addItemToCart(name, price) {
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Función para eliminar un producto del carrito
function removeItemFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        const li = document.createElement('li');
        li.classList.add('cart-item');

        li.innerHTML = `
            <span class="item-name">${item.name}</span>
            <div class="quantity-container">
                <button class="quantity-button" onclick="updateQuantity('decrease', '${item.name}')">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-button" onclick="updateQuantity('increase', '${item.name}')">+</button>
                <span class="delete-icon" onclick="removeItemFromCart('${item.name}')">🗑️</span>
            </div>
        `;
        cartItemsElement.appendChild(li);
    });

    cartTotalElement.textContent = `Total: $${total.toLocaleString()}`;
    notificationElement.textContent = cart.length;  // Actualiza la notificación

    // Muestra el carrito si tiene artículos
    const cartElement = document.querySelector('.cart');
    cartElement.style.display = cart.length > 0 ? 'block' : 'none';
    
    // Muestra el botón de proceder al pago si hay artículos en el carrito
    proceedButtonElement.style.display = cart.length > 0 ? 'block' : 'none';
}

// Función para actualizar la cantidad de un producto
function updateQuantity(action, name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (action === 'increase') {
        cart[itemIndex].quantity++;
    } else if (action === 'decrease' && cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
    }
    updateCart();
}

// Función para mostrar detalles del producto
function showDetails(name, description) {
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('product-modal').style.display = 'block'; // Mostrar el modal
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none'; // Ocultar el modal
}

// Mostrar el carrito inicialmente
document.querySelector('.cart').style.display = 'none'; // Ocultar el carrito al inicio

function showDetails(productId) {
    const details = document.getElementById(`details-${productId}`);
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}





function showDetails(detailsId) {
  const detailsElement = document.getElementById(detailsId);
  // Alternar la visibilidad del contenedor de detalles
  if (detailsElement.style.display === "none") {
      detailsElement.style.display = "block"; // Mostrar detalles
  } else {
      detailsElement.style.display = "none"; // Ocultar detalles
  }
}


// Función para proceder al pago
function proceedToCheckout() {
  // Almacenar el carrito en localStorage
  localStorage.setItem('orderDetails', JSON.stringify(cart));
  // Redirigir a la página de checkout
  window.location.href = 'checkout.html'; // Asegúrate de que la ruta sea correcta
}

// Asegúrate de que el botón de proceder al pago esté visible solo si hay artículos en el carrito
if (proceedButtonElement) {
  proceedButtonElement.addEventListener('click', proceedToCheckout);
}
