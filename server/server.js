const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cors = require('cors');

app.prepare()
    .then(() => {
        const server = express();
        const showRoutes = require('./routes/api.js');

        server.use(express.json());
        server.use(cors());
        server.use('/api', showRoutes);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on ${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
