const express = require('express');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

authRouter(app);

app.listen(port, () => console.log(
  `Successfully connect to database on port: ${port}`
));