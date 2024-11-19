// Fetch products and display on the product listing page
if (window.location.pathname.endsWith('index.html')) {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.className = 'product';
          productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
          `;
          productList.appendChild(productElement);
        });
      });
  }
  
  // Cart functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function addToCart(id, name, price) {
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  }
  
  // Display cart items
  if (window.location.pathname.endsWith('cart.html')) {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let total = 0;
    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        ${item.name} - $${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(itemElement);
      total += item.price;
    });
    totalElement.innerText = `Total: $${total}`;
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }
  
  // Handle checkout
  if (window.location.pathname.endsWith('checkout.html')) {
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      const paymentDetails = document.getElementById('payment-details').value;
  
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, paymentDetails, cart })
      })
      .then(response => response.json())
      .then(data => {
        localStorage.clear(); // Clear cart
        window.location.href = `confirmation.html?message=${data.message}&orderId=${data.orderId}`;
      });
    });
  }
  
  // Display confirmation message
  if (window.location.pathname.endsWith('confirmation.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const orderId = urlParams.get('orderId');
    document.getElementById('confirmation-message').innerText = `${message} Your order ID is ${orderId}.`;
  }