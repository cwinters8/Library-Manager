const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  "database": "library",
  "host": "localhost",
  "dialect": "postgres",
  "operatorsAliases": false
})

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