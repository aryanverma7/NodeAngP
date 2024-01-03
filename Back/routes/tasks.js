// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('mongoose').model('Task');

// Task route handlers
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
