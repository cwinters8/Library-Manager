const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  "database": "library",
  "dialect": "sqlite",
  "storage": path.resolve(__dirname, '../library.db')
})

const BookModel = (sequelize, DataTypes) => {
  return sequelize.define('Books', {
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
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  });
}

const Book = BookModel(sequelize, Sequelize);

module.exports = Book;