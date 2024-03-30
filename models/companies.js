// server/models/companies.js
const mongoose = require('mongoose');

const companiesSchema = mongoose.Schema({
  CID: {
    type: String,
    unique: true,
    required: true,
  },
  CNAME: {
    type: String,
    required: true,
  },
  JOBROLE: {
    type: String,
    required: true,
  },
  SAL: {
    type: String,
    required: true,
  },
  VACANCY: {
    type: String,
    required: true,
  },
  CURL: {
    type: String,
    required: true,
  },
});

const companiesmodel = mongoose.model('company', companiesSchema);
module.exports = companiesmodel;
