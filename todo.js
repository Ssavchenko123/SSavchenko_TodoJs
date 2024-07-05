
const form = document.querySelector('#form');
const inputMain = document.querySelector('#input');
const buttonAdd = document.querySelector('#button');
const list = document.querySelector('#todo-elements')
const taskArray = []

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

function render() {
  let renderElements = ""
  taskArray.forEach((task) => {
    renderElements += `
    <li class="task-block" id="${task.id}">
      <input class="check-box" type="checkbox">
      <pre class="task-name">${task.taskText}</pre>
      <button class="delete" id>X</button>
    </li>
    `
    list.innerHTML = renderElements ;
  });
}

document.querySelector('ul').addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    let target = event.target;
    let parent = target.parentElement;
    taskArray.filter(function callbackFn(element) {
      element.id != parent.id
      render()
    });
    
  
  }
});


buttonAdd.addEventListener("click", addTask)
