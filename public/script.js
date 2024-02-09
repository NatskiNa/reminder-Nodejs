const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

const showTasks = async () => {
  //get tasks from spi/v1/tasks
  try {
    const { data: tasks } = await axios.get('/api/v1/tasks');

    //when no tasks to show
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class='empty-list'>There is no task to show</h5>`;
      return;
    }

    //take each task elements out
    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;

        return `<div class="single-task ${completed && 'task-completed'}">
      <h5>
        <span><i class="far fa-check-circle"></i></span>${name}
      </h5>
      <div class="task-links">
        <a href="edit.html?id=${_id}" class="edit-link"><i class="fas fa-edit"></i></a>
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      })
      .join('');
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};

//create new task
showTasks();
formDOM.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = taskInputDOM.value;
  try {
    await axios.post('/api/v1/tasks', { name: name });
    showTasks();
    taskInputDOM.value = '';
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'A new task has has been added to the list';
    formAlertDOM.classList.add('text-success');
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = 'Your task must be within 30 letters';
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});

//delete task
tasksDOM.addEventListener('click', async (event) => {
  const element = event.target;
  //console.log(element.parentElement);
  if (element.parentElement.classList.contains('delete-btn')) {
    const id = element.parentElement.dataset.id;
    //console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
