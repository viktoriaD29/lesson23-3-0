const listElem = document.querySelector('.list');

const tasks = [
  { text: 'Buy milk', done: false, id: Math.random() },
  { text: 'Pick up Tom from airport', done: false, id: Math.random() },
  { text: 'Visit party', done: false, id: Math.random() },
  { text: 'Visit doctor', done: true, id: Math.random() },
  { text: 'Buy meat', done: true, id: Math.random() },
];

const inputElem = document.querySelector('.task-input');
const buttonElem = document.querySelector('.create-task-btn');

const createTask = () => {
  if (inputElem.value === '') {
    return;
  }

  tasks.push({ text: inputElem.value, done: false, id: Math.random() });
  renderTasks(tasks);
  inputElem.innerHTML = '';
};

buttonElem.addEventListener('click', createTask);

const renderTasks = (tasksList) => {
  const tasksElems = tasksList
    .sort((a, b) => a.done - b.done)
    .map(({ text, done }) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('list__item');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = done;
      checkbox.classList.add('list__item-checkbox');
      if (done) {
        listItemElem.classList.add('list__item_done');
      }
      listItemElem.append(checkbox, text);

      return listItemElem;
    });
  listElem.append(...tasksElems);
};

const completeTask = (event) => {
  const isCheckbox = event.target.classList.contains('.list__item-checkbox');

  if (!isCheckbox) {
    return;
  }

  tasks.map((el) => {
    console.log(el.id);
    if (el.id === event.target.dataset.id) {
      if (el.done === true) {
        document.getElementById(el.id).disabled = false;
      }
      document.getElementById(el.id).checked = true;
    }
  });

  renderTasks(tasks);
};

listElem.addEventListener('click', completeTask);
