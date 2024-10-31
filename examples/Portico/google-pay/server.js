const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const transactionRoutes = require("./routes/transaction");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(transactionRoutes);

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

const PORT = 3000;
app.listen(PORT, ()=> {
  console.log(`Server listening on ${PORT}`);
});

