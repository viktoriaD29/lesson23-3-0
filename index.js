//algo:
//1. створюємо функцію createTask (input: - / output: new arr), яка зчитує значення input
//якщо воно пусте, то не створює таску, якщо не пусте, то пушить нову таску в масив і робить новий список
//2. вішаємо еventListener з функцією createTask на кнопку create
//3.отримуємо input з чекбоксом і вішаємо на нього еventListener з функцією statusTask
//4. функція statusTask (input: event / output: new arr):
//-перебирає масив
//-перевіряє чи співпадає id елемента з елементом на який клікнули
//-міняє статус done на протилежний
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
  const textInput = inputElem.value;
  if (textInput === '') {
    return;
  }
  tasks.push({ text: textInput, done: false, id: Math.random() });
  renderTasks(tasks);
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
  listElem.innerHTML = '';
  listElem.append(...tasksElems);
};

const statusTask = (event) => {
  const arr = tasks.map((el) => {
    if (el.id === event.target.dataset.id) {
      el.done = !el.done;
    }
  });
  renderTasks(arr);
};

listElem.addEventListener('click', statusTask);
