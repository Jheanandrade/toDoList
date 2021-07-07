import axios from 'axios';
import Tasks from '../../domain/models/tasks';

class TasksController {
  async index(req, res) {
    try {
      const task = await Tasks.findAll({
        where: {
          check: false,
        },
      });

      return res.json(task);
    } catch (e) {
      return res.status(400).json({ error: 'Erro ao listar de Tarefas' });
    }
  }

  async store(req, res) {
    try {
      const { name, email, description, count_update, check } = req.body;

      const _email = await axios(
        `http://apilayer.net/api/check?access_key=f20f7ae318c34b92ee6a685fac758feb&email=${email}`,
        { timeout: 10000 }
      );

      if (!_email.data.mx_found && !_email.data.format_valid) {
        return res.json({ Error: _email.did_you_mean });
      }

      const data = await Tasks.create({
        name,
        email,
        description,
        count_update,
        check,
      });

      return res.json(data);
    } catch (e) {
      return res.status(400).json({ error: 'Falha ao se conectar com a API' });
    }
  }

  async create(req, res) {
    try {
      const dogs = await axios(
        `https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=1`,
        { timeout: 5000 }
      );

      const tasks = await Tasks.create({
        name: 'Eu',
        email: 'eu@me.com',
        description: dogs.data.text,
        count_update: 1,
        check: false,
      });
      return res.json(tasks);
    } catch (e) {
      return res.status(400).json({ error: 'Falha ao se conectar com a API' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { check, password } = req.body;

      const task = await Tasks.findByPk(id);

      if (password !== 'TrabalheNaSaipos') {
        return res
          .status(400)
          .json({ error: 'Senha de acesso informada incorreta' });
      }

      if (!task) {
        return res
          .status(400)
          .json({ error: 'Tarefa não encontrada alteração' });
      }

      const _count_update = (await task.get('count_update')) + 1;

      if (_count_update === 4) {
        return res.status(400).json({
          error: 'O máximo de alterações neste Card foram realizadas',
        });
      }

      const _task = await task.update({
        ...task,
        check,
        count_update: _count_update,
      });

      return res.json(_task);
    } catch (e) {
      return res.status(400).json({ error: 'Falha na solicitação' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const task = await Tasks.findByPk(id);

      if (!task) {
        return res
          .status(400)
          .json({ error: 'Tarefa não encontrada exclusão' });
      }

      await task.destroy();

      return res.send();
    } catch (e) {
      return res.status(400).json({ error: 'Erro ao deletar de Tarefas' });
    }
  }
}

export default new TasksController();
