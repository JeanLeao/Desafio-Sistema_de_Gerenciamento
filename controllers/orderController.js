const { Products, Materials, Orders} = require('../models');
const { mainMenu } = require('../views/cli');
const { materialsMenu } = require('../controllers/materialsController');
const { ProductMenu } = require('../controllers/productsController');
const { ReportingMenu } = require('../views/reporting');

function OrderMenu(rl) {
    rl.question('\nEscolha uma opção:\n 1. Adicionar uma ordem\n 2. Listar ordens\n 3. Atualizar Status\n 4. Voltar\n', (choice) => {
      if (choice === '1') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        addOrder(rl);
      } else if (choice === '2') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        listOrders(rl);
      }else if (choice === '3') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        changeStatusOrders(rl);
      } else if (choice === '4') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('Saindo do programa.');
        mainMenu(rl, OrderMenu, materialsMenu, ProductMenu, ReportingMenu)
      } else {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('Opção inválida. Tente novamente.');
        OrderMenu(rl);
      }
    });
 }


async function addOrder(rl) {
  const findAllProducts = await Products.findAll({});
  console.log('Produtos existentes:');
  for (const product of findAllProducts){
      console.log(`- ${product.name}`);
  }

  rl.question('Nome do produto: ', async (product) => {
    const findProduct = await Products.findOne({ where: { name: product.toLocaleLowerCase() } });
    if (!findProduct) {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      console.log('Produto não encontrado. Tente novamente.');
      addOrder(rl);
      return;
    }
    rl.question('Quantidade desejada: ', async (quantity) => {
      if (isNaN(quantity)) {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('Quantidade inválida. Tente novamente.');
        addOrder(rl);
        return;
      }
      for (let i = 0; i < findProduct.materials_required.length; i += 1) {
        const material = findProduct.materials_required[i];
        const findMaterial = await Materials.findOne({ where: { name: material.name.toLocaleLowerCase() } });
        if (!findMaterial) {
          process.stdout.write('\u001B[2J\u001B[0;0f');
          console.log('Material não encontrado. Tente novamente.');
          addOrder(rl);
          return;
        }
        
        if (findMaterial.storage < material.quantity * quantity) {
          process.stdout.write('\u001B[2J\u001B[0;0f');
          console.log(`Não há material suficiente para a produção. Quantidade de ${findMaterial.name} disponível: ${findMaterial.storage}. Tente novamente.`);
          addOrder(rl);
          return;
        }
      };

      rl.question('Data de entrega (DD/MM/AAAA): ', async (deliveryDate) => {
        // REGEX DE DATAS VALIDAS
        if (!deliveryDate.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)) {
          process.stdout.write('\u001B[2J\u001B[0;0f');
          console.log('Data inválida. Tente novamente.');
          addOrder(rl);
          return;
        }
        // transform data to ISO
        const date = deliveryDate.split('/');
        const deliveryDateISO = new Date(`${date[2]}-${date[1]}-${date[0]}`).toISOString();

        await Orders.create({
          product_id: findProduct.id,
          amount_required: quantity,
          delivery_date: deliveryDateISO,
        });

        findProduct.materials_required.forEach(async (material) => {
          const findMaterial = await Materials.findOne({ where: { name: material.name } });
          if (!findMaterial) {
            process.stdout.write('\u001B[2J\u001B[0;0f');
            console.log('Material não encontrado. Tente novamente.');
            addOrder(rl);
            return;
          }

          const storage = +findMaterial.storage - +material.quantity * +quantity;
          await Materials.update({ storage: storage }, { where: { name: material.name } });
        });
        process.stdout.write('\u001B[2J\u001B[0;0f');

        console.log('Ordem adicionada com sucesso.');
        OrderMenu(rl);

      });
    });
  });
}


async function listOrders(rl) {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  const findOrders = await Orders.findAll({ include: [{ model: Products, as: 'Products' }] });
  if (findOrders.length === 0) {
    console.log('Nenhuma ordem encontrada.');
  }
  else {
    console.log('Listagem de Ordens:');
    findOrders.forEach((order, index) => {
      console.log(`Ordem ${index + 1}: ${order.Products.name} - ${order.amount_required} unidades - Data de Entrega: ${order.delivery_date}`);
    });
  }
  OrderMenu(rl);
}

async function changeStatusOrders(rl){
  const findAllOrders = await Orders.findAll({ include: [{ model: Products, as: 'Products' }]});
  console.log('Listagem de Ordens: [ID]')
  findAllOrders.forEach((order, index) => {
    console.log(`ID: [${order.id}]: ${order.Products.name} - ${order.amount_required} unidades - Data de Entrega: ${order.delivery_date} | STATUS: ${order.flag_finished? 'Finalizado' : 'Pendente'}`);
  });

  rl.question('Digite o id da ordem que deseja atualizar: ', async (id) => {
    const findOrder = await Orders.findOne({ where: { id: id } });
    if (!findOrder) {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      console.log('Ordem não encontrada. Tente novamente.');
      changeStatusOrders(rl);
      return;
    }
    rl.question('Deseja atualizar o status da ordem? (sim/não) ', async (answer) => {
      if (answer.toLocaleLowerCase() === 'sim') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        await Orders.update({ flag_finished: !findOrder.flag_finished }, { where: { id: id } });
        console.log('Status atualizado com sucesso.');
      }
      process.stdout.write('\u001B[2J\u001B[0;0f');
      OrderMenu(rl);
    });
  });

}

module.exports = { OrderMenu };
