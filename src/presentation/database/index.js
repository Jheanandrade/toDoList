import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';
import Tasks from '../../domain/models/tasks';

const models = [Tasks];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
