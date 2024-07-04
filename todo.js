
const form = document.querySelector('#form');
const inputMain = document.querySelector('#input');
const buttonAdd = document.querySelector('#button');


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
  render()
}
function render() {
  let renderElements = ""
  taskArray.forEach((task) => {
    console.log(task);
    renderElements += `
    <li class="task-block" id="ToDoElements">
      <input class="check-box" type="checkbox">
      <pre class="task-name">${task.taskText}</pre>
      <div class="delete">X</div>
    </li>
    `
    console.log(renderElements)
  });
}

/*let inputTask= document.createElement('ToDoElement')
inputTask.innerHTML = `
<li class="task-block">
  <input class="check-box" type="checkbox">
  <pre class="task-name">${render}</pre>
  <div class="delete">X</div>
</li>`;
li.append(inputTask);*/

buttonAdd.addEventListener("click", addTask)
