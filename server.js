const express = require("express");
const cors = require("cors");
const {connectDB} = require('./config/db');
const { errorHandler } = require("./middlewares/error");
require("dotenv").config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/api/auth", require("./routes/auth"));



const server = app.listen(PORT, ()=> console.log(`server started listening on ${PORT}`));
app.post('/', (req, res) => {
    res.send('POST request received');
  });
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(()=> process.exit(1));
});

