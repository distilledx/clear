const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    data = JSON.parse(fs.readFileSync('./server/data.json'));
    users = JSON.parse(fs.readFileSync('./server/users.json'));
    try {
        let ses = '';
        for (let i = 0; i < 25; i++) {
            ses += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        data[req.body.username] = {
            email: req.body.email,
            password: hashedPassword,
            session: ses,
            files: [],
        };

        users[ses] = req.body.username;

        fs.writeFileSync('./server/data.json', JSON.stringify(data));
        fs.writeFileSync('./server/users.json', JSON.stringify(users));

        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
});

router.post('/login', async (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/data.json'));
    try {
        if (!(req.body.username in data) || req.body.password == null) {
            return res.send({ body: 'Could not find user' });
        }
        if (await bcrypt.compare(req.body.password, data[req.body.username].password)) {
            return res.send({ body: 'Success!', session: data[req.body.username].session });
        } else {
            return res.send({ body: 'Wrong Password' });
        }
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
});

module.exports = router;
