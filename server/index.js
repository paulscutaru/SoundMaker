const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./models')

app.use(cors());

// Routers
const loginRouter = require('./routes/LoginRoute')
app.use('/login',loginRouter)

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server opened at port 3001");
  });
});
