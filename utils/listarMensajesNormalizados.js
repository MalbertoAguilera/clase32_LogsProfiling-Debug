const { normalize, schema } = require("normalizr");

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity(
  "post",
  { author: schemaAuthor },
  { idAttribute: "id" }
);

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity(
  "posts",
  { mensajes: [schemaMensaje] },
  { idAttribute: "id" }
);

const normalizarMensajes = (mensajesConId) =>
  normalize(mensajesConId, schemaMensajes);

const listarMensajesNormalizados = (mensajes) => {
  // const mensajes = await mensajesApi.listarAll()
  const normalizados = normalizarMensajes({ id: "mensajes", mensajes });
  return normalizados;
};

module.exports = listarMensajesNormalizados;
