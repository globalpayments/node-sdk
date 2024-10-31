const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser")
const transactionController = require('../controllers/transaction');


router.use(bodyParser.urlencoded({extended: false}));


//POST
router.post('/post', transactionController.processToken);

module.exports = router;