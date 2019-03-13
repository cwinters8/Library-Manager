const Sequelize = require('sequelize');
const path = require('path');

function getDatabaseConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  } else {
    return {
      database: 'library',
      host: 'localhost',
      dialect: 'postgres',
      operatorsAliases: false
    };
  }
}

const sequelize = new Sequelize(getDatabaseConfig());

const BookModel = (sequelize, DataTypes) => {
  return sequelize.define('books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Title is required'}
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Author is required'}
      }
    },
    genre: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  });
}

const Book = BookModel(sequelize, Sequelize);

module.exports = Book;