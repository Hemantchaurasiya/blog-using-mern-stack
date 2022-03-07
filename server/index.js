const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Connection = require("./database");
const Router = require("./routes/routes");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = process.env.PORT || 8000;
Connection();

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));