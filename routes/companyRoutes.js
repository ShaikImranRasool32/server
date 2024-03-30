// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companiesmodel = require('../models/companies');

// POST request to add a new company
router.post('/', async (req, res) => {
  try {
    const newCompany = req.body; // Assuming the request body contains the new company data
    const createdCompany = await companiesmodel.create(newCompany);
    res.status(201).json(createdCompany);
  } catch (error) {
    console.error('Error adding new company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
