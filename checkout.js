document.addEventListener('DOMContentLoaded', () => {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const orderDetails = document.getElementById('orderDetails');
    const totalAmount = document.getElementById('totalAmount');
    const confirmOrderButton = document.getElementById('confirmOrder');

    // Este array representa los productos en el carrito de compras
    const cartItems = [
        { name: 'Camisa', price: 50000, quantity: 1, color: 'Rojo', size: 'M' },
        { name: 'Pantalón', price: 80000, quantity: 2, color: 'Azul', size: 'L' }
    ];

    function updateOrderSummary() {
        orderDetails.innerHTML = ''; // Limpiar el resumen de pedidos
        let total = 0;

        // Recorrer los productos del carrito y agregar al resumen
        cartItems.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${(product.price).toLocaleString('es-CO')} COP x ${product.quantity} | Color: ${product.color} | Talla: ${product.size}`;
            orderDetails.appendChild(li);
            total += product.price * product.quantity; // Calculando el total
        });

        totalAmount.textContent = `$${total.toLocaleString('es-CO')} COP`;
    }

    // Inicializar el resumen de pedido
    updateOrderSummary();

    paymentMethodSelect.addEventListener('change', (event) => {
        const selectedMethod = event.target.value;
        const creditCardDetails = document.getElementById('creditCardDetails');
        const paypalDetails = document.getElementById('paypalDetails');
        const bankTransferDetails = document.getElementById('bankTransferDetails');

        // Ocultar todos los detalles de pago
        creditCardDetails.style.display = 'none';
        paypalDetails.style.display = 'none';
        bankTransferDetails.style.display = 'none';

        // Mostrar solo los detalles del método de pago seleccionado
        if (selectedMethod === 'creditCard') {
            creditCardDetails.style.display = 'block';
        } else if (selectedMethod === 'paypal') {
            paypalDetails.style.display = 'block';
        } else if (selectedMethod === 'bankTransfer') {
            bankTransferDetails.style.display = 'block';
        }
    });

    confirmOrderButton.addEventListener('click', () => {
        // Aquí puedes implementar la lógica para procesar el pedido
        alert('Pedido confirmado. ¡Gracias por su compra!');
    });
});
