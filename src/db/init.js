const Database = require("./config");

const initDb = {

  async init(){
    
    const db = await Database(); //abre conexão com o banco

    await db.exec(`
      CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
      );
    `);

    await db.exec(`
      CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
      );
    `);

    await db.run(`
      INSERT INTO profile (
        name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour) 
      VALUES (
        "Rafael",
        "https://avatars.githubusercontent.com/u/17714286?v=4",
        3000,
        5,
        5,
        4,
        75
      );
    `);

    await db.run(`
      INSERT INTO jobs (
        name, daily_hours, total_hours, created_at)
      VALUES (
        "Pizzaria Guloso",
        2,
        1,
        1617514376018
      );
    `);

    await db.run(`
      INSERT INTO jobs (
        name, daily_hours, total_hours, created_at)
      VALUES (
        "One Two Projects",
        3,
        47,
        1617514376018
      );
    `);

    await db.close(); //fecha a conexão com o banco
  }
}

initDb.init();