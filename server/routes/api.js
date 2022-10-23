const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const SignUp = require('../models/signUp.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/names', (req, res) => {
    res.json({ testing: 'testing' });
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const signedUp = new SignUp({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        signedUp.save();
        res.redirect('/login');
    } catch {
        console.log(req.body);
        res.redirect('/register');
    }
});

router.post('/login', async (req, res) => {});

module.exports = router;
