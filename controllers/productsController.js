const { Products } = require('../models');
const {mainMenu } = require('../views/cli');
const { materialsMenu } = require('../controllers/materialsController');
const { ReportingMenu } = require('../views/reporting');
const { OrderMenu } = require('../controllers/orderController');


function ProductMenu(rl) {
    
    rl.question('\nEscolha uma opção:\n 1. Adicionar uma Produto\n 2. Listar Produtos\n 3. Voltar\n', (choice) => {
      if (choice === '1') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        addProduct(rl);
      } else if (choice === '2') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        listProducts(rl);
      } else if (choice === '3') {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('Saindo do programa.');

        mainMenu(rl, OrderMenu, materialsMenu, ProductMenu, ReportingMenu);
      } else {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('Opção inválida. Tente novamente.');
        ProductMenu(rl);
      }
    });
 }



async function addProduct(rl) {
    const findAllProducts = await Products.findAll({});
    console.log('Produtos já cadastrados:');
    for (const product of findAllProducts){
        console.log(`- ${product.name}`);
    }
    
rl.question('Nome do produto: ', (productName) => {
    const product = { name: productName.toLocaleLowerCase(), materials: [] };
    if (findAllProducts.find((product) => product.name === productName.toLocaleLowerCase())) {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('Produto já cadastrado. Tente novamente.');
        addProduct(rl);
        return;
    }

    askMaterial(product, rl);
});

function askMaterial(product, rl) {
    rl.question('Nome do material: ', (materialName) => {
        materialName = materialName.toLocaleLowerCase();

        // VERIFICANDO SE O MATERIAL JÁ FOI ADICIONADO
        if (product.materials.find((material) => material.name === materialName)) {
            process.stdout.write('\u001B[2J\u001B[0;0f');
            console.log('Material já adicionado. Tente novamente.');
            askMaterial(product, rl);
            return;
        }
        
        rl.question('Quantidade: ', (quantity) => {
            // VERIFICANDO SE A QUANTIDADE É UM NÚMERO
            if (isNaN(quantity)) {
                process.stdout.write('\u001B[2J\u001B[0;0f');
                console.log('Quantidade inválida. Tente novamente.');
                askMaterial(product, rl);
                return;
            }

            product.materials.push({ name: materialName, quantity: quantity });
            rl.question('Deseja adicionar mais materiais? (sim/não) ', async (answer) => {
                if (answer.toLocaleLowerCase() === 'sim') {
                    process.stdout.write('\u001B[2J\u001B[0;0f');
                    askMaterial(product, rl);
                } else {
                    process.stdout.write('\u001B[2J\u001B[0;0f');
                    console.log('Produto adicionado com sucesso.');
                    await Products.create({
                        name: product.name,
                        materials_required: product.materials
                    })
                    ProductMenu(rl);
                }
            });
        });
    });
 }
}


async function listProducts(rl) {
    await Products.findAll().then((products) => {
        if (products.length === 0) {
            console.log('Nenhum Produto encontrado/cadastrado.');
        } else {
        console.log('Listagem de Produtos:');
            products.forEach((product, index) => {
                console.log(`\nProduto ${index + 1}: ${product?.name}`);
                product?.materials_required.forEach((material) => {
                    console.log(` - Material: ${material?.name} - Quantidade: ${material?.quantity}`);
                })
            });
        }
    });
        ProductMenu(rl);
}

module.exports = { ProductMenu };
