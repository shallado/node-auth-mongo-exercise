const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.listen(port, () => console.log(
  `Successfully connect to database on port: ${port}`
));