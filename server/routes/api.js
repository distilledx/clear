const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    data = JSON.parse(fs.readFileSync('./server/data.json'));
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hashedUser = await bcrypt.hash(req.body.username, 10);

        data[hashedUser] = {
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            files: [],
        };

        fs.writeFileSync('./server/data.json', JSON.stringify(data));

        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
});

router.post('/login', async (req, res) => {
    data = JSON.parse(fs.readFileSync('./server/data.json'));
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hashedUser = await bcrypt.hash(req.body.username, 10);

        if (!(hashedUser in data) || data[req.body.password] == null) {
            return res.send({ body: `${req.body.username} ${hashedUser}` });
        }
        if (await bcrypt.compare(hashedPassword, data[hashedUser].password)) {
            res.redirect('/');
        } else {
            return res.send({ body: 'Wrong Password' });
        }
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
});

module.exports = router;
