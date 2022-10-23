const express = require('express');
const next = require('next');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        const showRoutes = require('./routes/index.js');
        const users = [];

        server.use('/api', showRoutes);
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.get('login', (req, res) => {
            res;
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on ${port}`);
        });

        server.post('/register', async (req, res) => {
            try {
                console.log(req.body);
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                users.push({
                    id: Date.now().toString(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                });
                res.redirect('/login');
            } catch {
                res.redirect('/register');
            }
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
