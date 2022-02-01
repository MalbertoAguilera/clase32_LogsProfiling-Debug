const getData = require("../helpers/getData");
const writeData = require("../helpers/writeData");
const isInArray = require("../helpers/isInArray");
const moment = require("moment");
const now = moment().format("DD/MM/YYYY HH:mm:ss");

class Message {
  constructor(filePath) {
    this.file = filePath;
  }

  async getAllMessages() {
    return await getData(this.file);
  }

  async save(message) {

    let data = await this.getAllMessages();
    
    if(Object.keys(data).length === 0){
      message.author.date = now;
      const newArray = {
        id: "mensajes",
        mensajes: [message]
      };
      await writeData(this.file, newArray);
      return;
    }

    message.author.date = now;
    data.mensajes.push(message);

    await writeData(this.file, data);
    return;
  }
}

module.exports = Message;
