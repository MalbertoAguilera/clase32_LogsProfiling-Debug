const contarRepetidos = (array) =>{
      const arrayRepetidos = {}
      array.forEach((numero) => {
            arrayRepetidos[numero] = (arrayRepetidos[numero] || 0) + 1;
          });

      return arrayRepetidos;
}

module.exports = contarRepetidos;