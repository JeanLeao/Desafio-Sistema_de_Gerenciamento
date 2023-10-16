
const {  OrderMenu } = require('../controllers/orderController');
const { ProductMenu } = require('../controllers/productsController');
const { materialsMenu } = require('../controllers/materialsController');
const { ReportingMenu } = require('./reporting');
const {mainMenu} = require('./cli');

function main(rl) {
  mainMenu(rl, OrderMenu, materialsMenu, ProductMenu, ReportingMenu);
}


module.exports = main;