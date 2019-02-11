import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const port = 5000;
const app = express();

app.use(express.static('./build'));

app.get('*',(req,res) => {
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
        <App />
        </StaticRouter>
    );

    const indexFile = path.resolve('./build/index.html');

    fs.readFile(indexFile, 'utf8', (err,data) => {
        if(err) {
            console.error('Error occured!',err);
            return res.status('<div id="root"></div>','<div id="root">${app}></div>')
        }
    })
})

app.listen(port, () => {
    console.log('Server running on port : ',port);
})