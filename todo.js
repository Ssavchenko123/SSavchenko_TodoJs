
const ENTER = 'Enter';
const ESC = 'Escape';
const TASK_PER_PAGE = 5;
const checkAllTask = document.querySelector('#check-box-up');
const form = document.querySelector('#form');
const inputMain = document.querySelector('#input');
const buttonAdd = document.querySelector('#button');
const list = document.querySelector('#todo-elements')
const Bottom = document.querySelector('#bottom-buttons')
const buttons = Bottom.querySelectorAll('.flex-element')
const newTask = document.querySelector('#newText')
const pages = document.querySelector('.pages')
//const deleteAll = document.querySelector('#delete-button')
let taskArray = []
let filterName = "All"
const firstPage = 1;
let totalPages = 1;

function addTask(event) {
  event.preventDefault();
  if (inputMain.value.trim() != "") {
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
  counter()
  checkAllTask.checked = taskArray.every(task => task.isCompleted) && taskArray.length;
  const rend = slicePage()

  if (taskArray.length <= 0) {
    pages.innerHTML = '';
  }
  let renderElements = ""
  rend.forEach((task) => {
    renderElements += `
    <li class="task-block" id="${task.id}">
      <input class="check-box" type="checkbox" ${task.isCompleted ? 'checked' : ''}>
      <input hidden class = "newText" value = "${task.taskText}" >
      <pre class="task-name">${task.taskText}</pre>
      <button class="delete">X</button>
    </li>
    `
  });

  list.innerHTML = renderElements;
  renderPage()
  renderPages()

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
    render()
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
  if (event.target.value.trim() != "" && event.target.className === 'newText') {
    taskArray.forEach(task => {
      if (task.id == event.target.parentElement.id) {
        task.taskText = event.target.value
      }
    })
  }
  render()
}

const editTask = (event) => {
  if (event.code === ENTER) {
    if (event.target.value.trim() != "") {
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
const filter = (event) => {
  if (event.target.className === 'flex-element') {
    filterName = event.target.id
    render()
  }
  if (event.target.className == 'flex-element') {
    buttons.forEach(task => task.classList.remove('active'));
    event.target.classList.add("active")
    render()
  }
}
const counter = () => {
  const completedCount = taskArray.filter(task => task.isCompleted).length;
  Bottom.children[2].innerText = `Completed (${completedCount})`
  Bottom.children[1].innerText = `Active (${taskArray.length - completedCount})`
  Bottom.children[0].innerText = `All (${taskArray.length})`
}
const filterArray = () => {
  if (filterName === "All") {
    return taskArray
  }
  else if (filterName === "Active") {
    return taskArray.filter(task => !task.isCompleted)
  }
  else if (filterName === "Completed") {
    return taskArray.filter(task => task.isCompleted)
  }
}
const deleteCompleted = () => {
  taskArray = taskArray.filter(task => !task.isCompleted)
  render()
}
const renderPages = () => {
  const filteredArr = filterArray();
  totalPages = Math.ceil(filteredArr.length / TASK_PER_PAGE)
  console.log(totalPages)

}
const renderPage = () => {
  let createPages = `<button class="counter">1</button>`
  //console.log(createPages)
  for (let i = 2; i <= totalPages; i++) {
    createPages += `<button class="counter">${i}</button>`;
  }
  pages.innerHTML = createPages;
}
const replace = () => {
  return taskText.replace()
}

const slicePage = () => {
  const filteredArray = filterArray()
  const elementOnEnd = TASK_PER_PAGE * totalPages;
  console.log(elementOnEnd)
  const firstElement = elementOnEnd - TASK_PER_PAGE;
  console.log(firstElement)
  const pagination = filteredArray.slice(firstElement, elementOnEnd)
  console.log(pagination)
  return pagination;
}
// const selected = (event) =>{
//   if (event.target.className =='flex-element') {
//     buttons.forEach(task=>task.classList.remove('active'));
//     event.target.classList.add("active")
//     render()
//   }
// }

//Bottom.querySelectorAll(".bottom-buttons").forEach(task=>{
    //   if (task.id == event.target.id) {
    //     console.log(task)
    //   task.classList.remove('flex-element-changed')
    // }
    
    // })
    // 


// const a = Bottom.querySelectorAll('.flex-element')
    // console.log(a);
// Bottom.addEventListener("click", selected);
deleteAll.addEventListener("click", deleteCompleted);
Bottom.addEventListener("click", filter);
checkAllTask.addEventListener("click", allChecked);
list.addEventListener("blur", blurTask, true);
list.addEventListener("keydown", editTask);
list.addEventListener('click', handleClick);
buttonAdd.addEventListener("click", addTask)
