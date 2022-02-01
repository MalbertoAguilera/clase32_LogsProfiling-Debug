const knex = require("knex")({
      client: "mysql",
      connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        database: "ecommerce",
      },
      pool: { min: 2, max: 8 },
    });
    
    //Id, Nombre, Descripcion, codigo, foto, precio, stock, timestamp, id
    knex.schema
      .createTableIfNotExists("products", (table) => {
        table.increments("id").primary(),
          table.timestamp("created_at").defaultTo(knex.fn.now()),
          table.string("name"),
          table.string("description"),
          table.string("code"),
          table.string("thumbnail"),
          table.float("price"),
          table.integer("stock")
      })
      .then(() => {
        console.log("Tabla creada con exito");
      })
      .catch((err) => {
        console.log(err);
      });

      module.exports = knex;