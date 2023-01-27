import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';

const db = {};


//creates client that connects to database
const sequelize = new Sequelize('chat_server_dev', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

//creates a list of file names in this folder
const files = fs.readdirSync(__dirname);

//loops thorugh the files and creates an object of all the chems from the files
for (let file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  }
}

//enables associations in all schemas

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

// allows you to sequalize functions on the dtatabse

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;