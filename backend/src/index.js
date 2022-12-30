var express = require("express");
//const mongoose = require('mongoose');
 //const router = require('./controller/user.controller')
 //const router = express.Router();
const authRouter = require("./controller/auth");
const app = express();
app.use(express.json()); 
app.use(
  express.urlencoded({ extended: true })
);

const songRoutes = require("./controller/song.controller");
const userController = require('./controller/user.controller');
app.use("/users",userController);
app.use("/login",authRouter)
app.use("/song",songRoutes);




 

//const app = require("./index");
const connect = require("./config/db");
 //const router = require('../src/controller/user.controller')
var cors = require("cors");
const port = 8008;
app.use(cors({ origin: `http://localhost:${port}`, credentials: true }));

app.get('/', (req, res) => {
  res.send('Spotify on spot!');
});
app.listen(8008, async () => {
  await connect();
  console.log(`Listening on the ${port}`);
});