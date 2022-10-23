const express = require('express');
const router = express.Router();

router.get('/names', (req, res) => {
    res.json({ testing: 'testing' });
});

module.exports = router;
