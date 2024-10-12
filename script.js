let cartCount = 0;
let cartItems = [];

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name: productName, price: parseFloat(productPrice.replace('$', '').replace(',', '')), quantity: 1 });
    }

    cartCount++;
    updateCartNotification();
    updateCartItems();
}

// Función para actualizar la notificación del carrito
function updateCartNotification() {
    const notification = document.getElementById('cart-notification');
    notification.innerText = cartCount;
    notification.style.display = cartCount > 0 ? 'inline' : 'none';
}

// Función para actualizar los items del carrito
function updateCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsList.innerHTML = ''; // Limpia la lista
    let total = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';

        li.innerHTML = `
            <span>${item.name}</span>
            <div class="quantity">
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
            </div>
            <span>$${(item.price * item.quantity).toLocaleString()}</span>
            <span class="remove-item" onclick="removeItem('${item.name}')">🗑️</span>
        `;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = `$${total.toLocaleString()}`;
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productName, change) {
    const item = cartItems.find(item => item.name === productName);
    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeItem(productName);
        }

        cartCount += change;
        updateCartNotification();
        updateCartItems();
    }
}

// Función para eliminar un producto del carrito
function removeItem(productName) {
    cartItems = cartItems.filter(item => item.name !== productName);
    cartCount -= cartItems.find(item => item.name === productName)?.quantity || 0;
    updateCartNotification();
    updateCartItems();
}

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('cart-open');
}

// Event listeners para agregar productos al carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = productCard.querySelector('.price').innerText;

        addToCart(productName, productPrice);
    });
});

// Event listeners para mostrar los detalles de los productos
const detailsButtons = document.querySelectorAll('.details-btn');
detailsButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const details = productCard.querySelector('.details');
        details.style.display = details.style.display === 'none' || details.style.display === '' ? 'block' : 'none';
    });
});


// ... Código existente ...

// Función para abrir el checkout
function openCheckout() {
  if (cartCount === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de comprar.");
      return;
  }
  window.open('checkout.html', '_blank', 'width=600,height=600');
}

// ... Código existente ...
