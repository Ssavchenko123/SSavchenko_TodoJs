
const form = document.querySelector('#form');
const inputMain = document.querySelector('#input');
const buttonAdd = document.querySelector('#button');
const list = document.querySelector('#todo-elements')
let taskArray = []

function addTask(event) {
  event.preventDefault();
  taskArray.push(
    {
      id: Date.now(),
      taskText: inputMain.value,
      isComplited: false
    }
  )
  inputMain.value = ""; 
  render()
}

const render = () =>{
  let renderElements = ""
  taskArray.forEach((task) => {
    renderElements += `
    <li class="task-block" id="${task.id}">
      <input class="check-box" type="checkbox">
      <pre class="task-name">${task.taskText}</pre>
      <button class="delete" id>X</button>
    </li>
    `
  });
  list.innerHTML = renderElements ;
}

function handleClick(event) {
  const parentId = event.target.parentElement.id;
  if (event.target.className === 'delete') {
    taskArray = taskArray.filter(task => (task.id != parentId))
    render()
  }
  if (event.target.className === 'check-box'){
  taskArray.forEach((task) => {
    if(task.id == parentId)task.isComplited = event.target.checked;
  //  const checked = event.target.parentElement.isComplited;
  //  taskArray = task.isComplited === false ?  
  });
  }
  console.log(taskArray);
}

list.addEventListener('click', handleClick);
buttonAdd.addEventListener("click", addTask)
