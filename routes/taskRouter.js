const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getSingleTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
