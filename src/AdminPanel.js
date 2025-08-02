//frontend\src\AdminPanel.js

const express = require('express');
const router = express.Router();

let users = [
  { _id: '1', name: 'Admin', email: 'admin@example.com' },
  { _id: '2', name: 'User1', email: 'user1@example.com' },
];

let clubs = [
  { _id: '1', name: 'Attack on Titan Fans', members: ['1', '2'] },
  { _id: '2', name: 'Fantasy Lovers', members: ['2'] },
];

router.get('/users', (req, res) => {
  res.json(users);
});

router.delete('/users/:id', (req, res) => {
  users = users.filter(u => u._id !== req.params.id);
  res.json({ success: true });
});

router.get('/clubs', (req, res) => {
  res.json(clubs);
});

router.delete('/clubs/:id', (req, res) => {
  clubs = clubs.filter(c => c._id !== req.params.id);
  res.json({ success: true });
});

module.exports = router;
