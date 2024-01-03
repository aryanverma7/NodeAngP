// routes/shoppingItems.js
const express = require('express');
const router = express.Router();
const ShoppingItem = require('mongoose').model('ShoppingItem');

// ShoppingItem route handlers
router.get('/', async (req, res) => {
  try {
    const shoppingItems = await ShoppingItem.find();
    res.json(shoppingItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
