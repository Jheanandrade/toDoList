import { Router } from 'express';
import TasksController from './presentation/controllers/tasksController';

const routes = new Router();

routes.post('/dogs', TasksController.create);

routes.post('/tasks', TasksController.store);

routes.get('/tasks', TasksController.index);

routes.put('/tasks/:id', TasksController.update);

routes.delete('/tasks/:id', TasksController.delete);

export default routes;
