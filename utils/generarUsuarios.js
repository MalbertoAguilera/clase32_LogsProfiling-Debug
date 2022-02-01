const faker = require("faker");
faker.locale = 'es'

function generarUsuario() {
  let arr = [];
  for (let index = 0; index < 5; index++) {
    arr.push({
      nombre: faker.name.firstName(),
      precio: faker.finance.amount(),
      url: faker.image.food()
    })
  }
  return arr;
}

module.exports = generarUsuario;