const express = require('express');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

authRouter(app);
userRouter(app);

app.listen(port, () => console.log(
  `Successfully connect to database on port: ${port}`
));