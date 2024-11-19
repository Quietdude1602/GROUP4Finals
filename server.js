const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

app.use(express.static('public'));
app.use(express.json());

// Endpoint to fetch product data
app.get('/api/products', (req, res) => {
  fs.readFile('./data/products.json', (err, data) => {
    if (err) {
      res.status(500).send('Error fetching product data.');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Endpoint to simulate order submission
app.post('/api/checkout', (req, res) => {
  console.log('Order received:', req.body);
  res.json({ message: 'Order confirmed!', orderId: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
