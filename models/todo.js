/* eslint-disable require-jsdoc */
'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }

    static addTodo({title, dueDate}) {
      return this.create({title: title, dueDate: dueDate, completed: false});
    }

    static getTodos(){
      return this.findAll();
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date().toLocaleDateString("en-CA") },
          completed: false,
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date().toLocaleDateString("en-CA") },
          completed: false,
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toLocaleDateString("en-CA") },
          completed: false,
        },
      });
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        }
      })
    }

    static async completedItems(){
      return this.findAll({
        where: {
          completed: true,
        }
      })
    }
    setCompletionStatus(receiver) {
      return this.update({ completed: receiver });
    }
    
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
