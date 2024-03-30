// server/routes/companies.js
const express = require('express');
const router = express.Router();
const companiesmodel = require('../models/companies');

router.get('/api/companies', async (req, res) => {
  try {
    const companies = await companiesmodel.find().lean();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
