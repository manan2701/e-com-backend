import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Read JSON file
const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

// GET all products
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

// GET all users
app.get('/api/users', (req, res) => {
  res.json(data.users);
});

// Optional: get specific product/user
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(p => p.id === req.params.id);
  product ? res.json(product) : res.status(404).send("Product not found");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
