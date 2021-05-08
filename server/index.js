const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./models')

app.use(express.json());
app.use(cors());

// Routers
const usersRouter = require('./routes/Users')
app.use('/auth', usersRouter)

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server opened at port 3001");
  });
});
