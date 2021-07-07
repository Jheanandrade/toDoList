import Sequelize, { Model } from 'sequelize';

class Tasks extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        description: Sequelize.STRING,
        count_update: Sequelize.INTEGER,
        check: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Tasks;
