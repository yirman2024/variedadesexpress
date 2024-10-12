
    document.addEventListener('DOMContentLoaded', () => {
        const checkoutButton = document.getElementById('checkoutButton');
        const checkoutForm = document.getElementById('checkoutForm');
        const orderDetails = document.getElementById('orderDetails');
        const totalAmount = document.getElementById('totalAmount');
        const paymentMethodSelect = document.getElementById('paymentMethod');
        const creditCardDetails = document.getElementById('creditCardDetails');
        const paypalDetails = document.getElementById('paypalDetails');
        const bankTransferDetails = document.getElementById('bankTransferDetails');

        // Ejemplo de productos, reemplaza esto con tus productos reales
        const cartItems = [
            { name: 'Producto A', price: 50000, quantity: 1, color: 'Rojo', size: 'M' } // 3 x 50000 = 150000
        ];

        function updateOrderSummary() {
            orderDetails.innerHTML = ''; // Limpiar el resumen de pedidos
            let total = 0;

            cartItems.forEach(product => {
                const li = document.createElement('li');
                const productTotal = product.price * product.quantity; // Calcular total del producto
                li.textContent = `${product.name} - $${(product.price).toLocaleString('es-CO')} COP x ${product.quantity} | Color: ${product.color} | Talla: ${product.size} | Total: $${productTotal.toLocaleString('es-CO')} COP`;
                orderDetails.appendChild(li);
                total += productTotal; // Acumular el total
            });

            totalAmount.textContent = `$${total.toLocaleString('es-CO')} COP`; // Mostrar total final
        }

        // Inicializar el resumen de pedido
        updateOrderSummary();

        paymentMethodSelect.addEventListener('change', (event) => {
            const selectedMethod = event.target.value;

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

        checkoutButton.addEventListener('click', () => {
            document.querySelector('.cart').style.display = 'none';
            document.getElementById('checkout').style.display = 'block';
        });

        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevenir el envío del formulario por defecto

            // Validar los campos requeridos
            if (checkoutForm.checkValidity()) {
                alert('Pedido confirmado. ¡Gracias por su compra!');
                // Aquí puedes implementar la lógica para procesar el pedido
            } else {
                alert('Por favor, completa todos los campos obligatorios.');
            }
        });
    });
