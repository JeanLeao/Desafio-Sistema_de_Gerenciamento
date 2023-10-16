const main = require('./views');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  main(rl);  

process.on('unhandledRejection', (err) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  console.log('Estamos tentando validar a sua entrada, tente selecionar uma opção válida novamente. \n')
  main(rl);
})

process.on('uncaughtException', (err) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  console.log('Estamos tentando validar a sua entrada, tente selecionar uma opção válida novamente. \n')
  main(rl);
})