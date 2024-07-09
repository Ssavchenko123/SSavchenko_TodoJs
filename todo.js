
const ENTER = 'Enter';
const ESC = 'Escape';
const checkAllTask = document.querySelector('#check-box-up');
const form = document.querySelector('#form');
const inputMain = document.querySelector('#input');
const buttonAdd = document.querySelector('#button');
const list = document.querySelector('#todo-elements')
const newTask = document.querySelector('#newText')
const Bottom = document.querySelector('#bottom-buttons')
let taskArray = []
let filterName = "All"

function addTask(event) {
  event.preventDefault();
if(inputMain.value.trim() !=""){
  taskArray.push(
    {
      id: Date.now(),
      taskText: inputMain.value,
      isCompleted: false,
    }
  )
}
  inputMain.value = "";
  render()
}

const render = () => {
  let renderElements = ""
  taskArray.forEach((task) => {
    renderElements += `
    <li class="task-block" id="${task.id}">
      <input class="check-box" type="checkbox" ${task.isCompleted ? 'checked' : ''}>
      <input hidden class = "newText" value = "${task.taskText}" required>
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
      if (task.id == parentId) task.isCompleted = event.target.checked;
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
  if(event.target.value.trim() !="" && event.target.className === 'input'){
  taskArray.forEach(task => {
    if(task.id == event.target.parentElement.id){
      task.taskText = event.target.value
    }
  })
}
  render()
}

const editTask = (event) => {
  if (event.code === ENTER) {
    if(event.target.value.trim() !=""){
    const parentId = event.target.parentElement.id
    taskArray.forEach(task => {
      if (task.id === Number(parentId)) {
        task.taskText = event.target.value
      };
    });
  }
    render()
  }
  else if (event.code === ESC) {
    render()
  }
}
const allChecked = (event) => {
  taskArray.forEach(task => {
    task.isCompleted = event.target.checked;
  });
  render()
} 
const filter = (event)=>{
  if ( event.target.className === 'flex-element'){
    console.log(event.target.id)
    filterName = event.target.id
    console.log(filterName)
  
  }

}
Bottom.addEventListener("click", filter)
checkAllTask.addEventListener("click", allChecked);
list.addEventListener("blur", blurTask, true);
list.addEventListener("keydown", editTask);
list.addEventListener('click', handleClick);
buttonAdd.addEventListener("click", addTask)
