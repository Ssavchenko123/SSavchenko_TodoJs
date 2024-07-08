
const ENTER = 'Enter';
const ESC = 'Escape';
const form = document.querySelector('#form');
const inputMain = document.querySelector('#input');
const buttonAdd = document.querySelector('#button');
const list = document.querySelector('#todo-elements')
const newTask = document.querySelector('#newText')
let taskArray = []

function addTask(event) {
  event.preventDefault();
  taskArray.push(
    {
      id: Date.now(),
      taskText: inputMain.value,
      isComplited: false,
    }
  )
  inputMain.value = "";
  render()
}

const render = () => {
  let renderElements = ""
  taskArray.forEach((task) => {
    renderElements += `
    <li class="task-block" id="${task.id}">
      <input class="check-box" type="checkbox">
      <input hidden class = "newText">
      <pre class="task-name">${task.taskText}</pre>
      <button class="delete" id>X</button>
    </li>
    `
  });
  list.innerHTML = renderElements;
}

function handleClick(event) {
  const parentId = event.target.parentElement.id;
  if (event.target.className === 'delete') {
    taskArray = taskArray.filter(task => (task.id != parentId))
    render()
  }

  if (event.target.className === 'check-box') {
    taskArray.forEach((task) => {
      if (task.id == parentId) task.isComplited = event.target.checked;
    });
  }
  if (event.target.className === 'task-name') {
    if (event.detail == 2) {
      event.target.hidden = true;
      event.target.previousElementSibling.hidden = false;
      event.target.previousElementSibling.focus();
  
      event.target.previousElementSibling.innerText = event.target.innerText
    }
  }

}
const blurTask = (event) => {
  taskText.blur();
  render()
}
const editTask = (event) => {
  if (event.code === ENTER) {
    const parentId = event.target.parentElement.id
    console.log(event)
    taskArray.forEach(task => {
      console.log(event)
      if (task.id === Number(parentId)) {
        task.taskText = event.target.value
      };
    });
    render()
  }
  else if (event.code === ESC) {
    render()
  }
}


list.addEventListener("blur", blurTask)
list.addEventListener("keydown", editTask);
list.addEventListener('click', handleClick);
buttonAdd.addEventListener("click", addTask)
