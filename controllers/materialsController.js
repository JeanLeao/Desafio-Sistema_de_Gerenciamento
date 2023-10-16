const { Materials } = require('../models');
const { mainMenu } = require('../views/cli');
const { OrderMenu } = require('../controllers/orderController');
const { ProductMenu } = require('../controllers/productsController');
const { ReportingMenu } = require('../views/reporting');

function materialsMenu(rl) {
  rl.question(
    "\nEscolha uma opção:\n 1. Adicionar Material\n 2. Listar Materiais\n 3. Voltar\n",
    (choice) => {
      if (choice === "1") {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        
        const materials = [];
        addMaterials(materials, rl);
      } else if (choice === "2") {
        process.stdout.write('\u001B[2J\u001B[0;0f');

        listMaterials(rl);
      } else if (choice === "3") {
        process.stdout.write('\u001B[2J\u001B[0;0f');

        mainMenu(rl, OrderMenu, materialsMenu, ProductMenu, ReportingMenu)
      } else {
        process.stdout.write('\u001B[2J\u001B[0;0f');

        console.log("Opção inválida. Tente novamente.");
        materialsMenu(rl);
      }
    }
  );
}

function addMaterials(materials, rl) {

  rl.question("Nome do material: ", (product) => {
    rl.question("Quantidade desejada: ", (quantity) => {
      if (isNaN(quantity)) {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('Quantidade inválida. Tente novamente.');
        addMaterials(materials, rl);
        return;
    }

      materials.push({ name: product.toLocaleLowerCase(), quantity: quantity });
      rl.question(
        "Deseja adicionar mais materiais? (sim/não) ",
        async (answer) => {
          if (answer.toLocaleLowerCase() === "sim") {
            addMaterials(materials, rl);
          } else {
              console.log("Material adicionado com sucesso.");
              materials.map(async (material) => {
               const findMaterial = await Materials.findOne({
                 where: { name: material.name },
               });

               // transformando o valor findMaterial.storage em um número               
               if (findMaterial) {
                const storage = +findMaterial.storage + +material.quantity;
                
                 await Materials.update(
                   { storage:  storage },
                   { where: { name: material.name } }
                 );
                } else {
                    await Materials.create({
                        name: material.name,
                        storage: material.quantity,
                    });
                    }
                });
                
            process.stdout.write('\u001B[2J\u001B[0;0f');
            console.log("Materiais adicionados com sucesso.");
            materialsMenu(rl);
          }
        }
      );
    });
  });
}
        

async function listMaterials(rl) {
  process.stdout.write('\u001B[2J\u001B[0;0f');

    const materials = await Materials.findAll();
    if (materials.length === 0) {
        console.log("Nenhum material encontrado.");
    } else {
        materials.map((material) => {
            console.log(`${material.name} - ${material.storage} unidades`);
        });
    }
  materialsMenu(rl);
}

module.exports = { materialsMenu };
