const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// 🟢 GET all users sorted by totalPoints (Leaderboard)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    // Add rank to each user
    const rankedUsers = users.map((user, index) => ({
      _id: user._id,
      username: user.username,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));

    res.json(rankedUsers);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

// 🟢 POST create a new user
router.post('/create', async (req, res) => {
  try {
    const { username } = req.body;
    const existing = await User.findOne({ username });

    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username });
    await user.save();

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error creating user' });
  }
});

// 🟢 POST claim random points
router.post('/claim/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    user.totalPoints += randomPoints;
    await user.save();

    // Save claim history
    const history = new ClaimHistory({
      userId: user._id,
      pointsClaimed: randomPoints,
    });
    await history.save();

    res.json({
      message: 'Points claimed',
      userId: user._id,
      pointsAdded: randomPoints,
      totalPoints: user.totalPoints,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error claiming points' });
  }
});

// 🟢 GET claim history for a user
router.get('/history/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching history' });
  }
});

module.exports = router;
