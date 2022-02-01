module.exports = {
      carpetaDelProyecto : process.cwd(),
      processTitle : process.title,
      processID : process.pid,
      versionNodeJS : process.version,
      nombreDePlataforma : process.platform,
      memoriaTotalReservada : process.memoryUsage().rss
}