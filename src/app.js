const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes/app");
const db = require("./config/db/app"); // Import the database connection
db.connect(); // Connect to the database

const dotenv = require('dotenv');
const port = 8000;

dotenv.config();

const app = express();

app.use(morgan("combined"));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
routes(app);

// Khởi động server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});