const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

module.exports = () => 
  open({
    //constrói a ligação do banco com a aplicação
    filename: "./database.sqlite", //nome do arquivo a ser criado e onde serão salvas as informações no bd
    driver: sqlite3.Database,
  });

  