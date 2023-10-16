

function mainMenu(rl, OrderMenu, materialsMenu, ProductMenu, ReportingMenu) {
  rl.question('Escolha uma opção:\n 1. Menu Ordens\n 2. Menu Materiais\n 3. Menu Produtos\n 4. Exibir Relatorios\n 5. Sair\n', (choice) => {
    if (choice === '1') {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      OrderMenu(rl);
    } else if (choice === '2') {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      materialsMenu(rl);
    }else if (choice === '3') {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      
      ProductMenu(rl);
    } else if (choice === '4') {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      ReportingMenu(rl)

    } else if (choice === '5') {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      console.log('Saindo do programa.');
      rl.close();
    } else {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      
      console.log('Opção inválida. Tente novamente.');
      mainMenu(rl);
    }
  });
}  
  
module.exports = { mainMenu };
  