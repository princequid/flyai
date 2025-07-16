const express = require('express');
const Flyer = require('../models/Flyer');
const router = express.Router();

// Get all flyers for a user (mock userId for now)
router.get('/', async (req, res) => {
  const userId = req.query.userId || 'mock-user-id';
  try {
    const flyers = await Flyer.find({ userId });
    res.json(flyers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flyers' });
  }
});

// Get a single flyer by ID
router.get('/:id', async (req, res) => {
  try {
    const flyer = await Flyer.findById(req.params.id);
    if (!flyer) return res.status(404).json({ error: 'Flyer not found' });
    res.json(flyer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flyer' });
  }
});

// Create a new flyer
router.post('/', async (req, res) => {
  try {
    const flyer = new Flyer({ ...req.body, userId: req.body.userId || 'mock-user-id' });
    await flyer.save();
    res.status(201).json(flyer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create flyer' });
  }
});

// Update a flyer
router.put('/:id', async (req, res) => {
  try {
    const flyer = await Flyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flyer) return res.status(404).json({ error: 'Flyer not found' });
    res.json(flyer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update flyer' });
  }
});

// Delete a flyer
router.delete('/:id', async (req, res) => {
  try {
    const flyer = await Flyer.findByIdAndDelete(req.params.id);
    if (!flyer) return res.status(404).json({ error: 'Flyer not found' });
    res.json({ message: 'Flyer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete flyer' });
  }
});

module.exports = router; 