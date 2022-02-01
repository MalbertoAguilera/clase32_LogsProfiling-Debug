const generarNumerosAleatorios = (min = 1, max = 1000) => {
  return Math.round(Math.random() * (max - min) + min);
};

module.exports = generarNumerosAleatorios;