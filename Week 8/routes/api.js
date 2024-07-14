const express = require('express');
const router = express.Router();
const upload = require('../upload');
const { getExternalData } = require('../services/thirdPartyService');

// File upload route
router.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    } else {
      if (req.file == undefined) {
        return res.status(400).send('No file selected!');
      } else {
        res.send(`File uploaded! ${req.file.filename}`);
      }
    }
  });
});

// External API route
router.get('/external-data', async (req, res, next) => {
  try {
    const data = await getExternalData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
