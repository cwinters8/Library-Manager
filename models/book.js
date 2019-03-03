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
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  });
}

const Book = BookModel(sequelize, Sequelize);

module.exports = Book;