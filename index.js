const express = require('express');
const axios = require('axios');

const app = express();
const port = 8888;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/light-sailed-info', async (req, res) => {
  console.log('req.headers', req.headers);
  try {
    // validate token
    const token = req.headers.authorization;
    const url = 'https://euro-dev.learnindialearn.in/api/auth/auth/validate';
    const { data } = await axios.post(url, {
      token
    });
    res.send(data);
  } catch (err) {
    console.log('errr', err);
    res.status(err.response.status || 500).send(err.response.data);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
