const { materialsMenu } = require('../controllers/materialsController');
const { ProductMenu } = require('../controllers/productsController');
const { Products, Materials, Orders} = require('../models');
const { mainMenu } = require('./cli');


async function ReportingMenu(rl) {

    console.log('Reporting Status: \n');
    const findAllOrders = await Orders.findAll({ include: [{ model: Products, as: 'Products' }]});
    if (findAllOrders.length === 0) {
      console.log('Nenhuma ordem encontrada.');
    }

    for (const order of findAllOrders){
        console.log(`ID: [${order.id}]: ${order.Products.name} - ${order.amount_required} unidades - Data de Entrega: ${order.delivery_date} | STATUS: ${order.flag_finished? 'CONCLUIDA' : 'ANDAMENTO'}`);
    }

    rl.question("Voltar ao menu: (envie qualquer coisa) ", (response) => {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        mainMenu(rl, Orders, materialsMenu, ProductMenu, ReportingMenu)
    });
 }



module.exports = { ReportingMenu };