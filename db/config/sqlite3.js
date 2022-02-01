const sqlite3 = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./ecommerce.sqlite",
  }
});

sqlite3.schema
  .createTableIfNotExists("messages", (table) => {
    table.increments("id").primary(),
      table.timestamp("date").defaultTo(sqlite3.fn.now()),
      table.string("user"),
      table.string("content");
  })
  .then(() => {
    console.log("Tabla sqlite creada con exito");
  })
  .catch((err) => {
    console.log(err);
  });


module.exports = sqlite3;
