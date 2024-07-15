
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
const counters = pages.querySelectorAll('.counter')
//const deleteAll = document.querySelector('#delete-button')
let tasksArray = []
let filterName = "All"
let currentPage = 1;
let totalPages = 1;

function addTask(event) {
  event.preventDefault();
  if (inputMain.value.trim() != "") {
    tasksArray.push(
      {
        id: Date.now(),
        taskText: replaced(inputMain.value),
        isCompleted: false,
      }
    )
  }
  countPages()
  renderPage()
  if (totalPages > currentPage) {
    currentPage += 1
  }

  inputMain.value = "";
  renderTask()
}

const renderTask = () => {
  counterButtons()
  renderPage()
  checkAllTask.checked = tasksArray.every(task => task.isCompleted) && tasksArray.length;
  const rend = slicePage()
  let renderElements = ""
  const createTask = () => {
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
  }
  createTask()
  list.innerHTML = renderElements;
  

}

function handleClick(event) {
  const parentId = event.target.parentElement.id;
    const filteredArray = filterArray();
  if (event.target.className === 'delete') {
    tasksArray = tasksArray.filter(task => (task.id != parentId))
    renderTask()
  }

  if (event.target.className === 'check-box') {
    tasksArray.forEach((task) => {
      if (task.id == parentId) task.isCompleted = event.target.checked;
    });
    renderTask()
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
    tasksArray.forEach(task => {
      if (task.id == event.target.parentElement.id) {
        task.taskText = replaced(event.target.value)
      }
    })
  }
  renderTask()
}

const editTask = (event) => {
  if (event.code === ENTER) {
    if (event.target.value.trim() != "") {
      const parentId = event.target.parentElement.id
      tasksArray.forEach(task => {
        if (task.id === Number(parentId)) {
          task.taskText = replaced(event.target.value)
        };
        
      });
    }
    renderTask()
  }
  else if (event.code === ESC) {
    renderTask()
  }
  else if (event.code === TAB){
    renderTask()
  }
  else if (event.target.className ==='checkbox'){
          task.taskText = event.target.value
  }
}

const allChecked = (event) => {
  tasksArray.forEach(task => {
    task.isCompleted = event.target.checked;
  });
  renderTask()
}

const filter = (event) => {
  if (event.target.className === 'flex-element') {
    filterName = event.target.id
    renderTask()
  }
  if (event.target.className == 'flex-element') {
    buttons.forEach(task => task.classList.remove('active'));
    event.target.classList.add("active")
    renderTask()
  }
}
const counterButtons = () => {
  const completedCount = tasksArray.filter(task => task.isCompleted).length;
  Bottom.children[2].innerText = `Completed (${completedCount})`
  Bottom.children[1].innerText = `Active (${tasksArray.length - completedCount})`
  Bottom.children[0].innerText = `All (${tasksArray.length})`
}
const filterArray = () => {
  if (filterName === "All") {
    return tasksArray
  }
  else if (filterName === "Active") {
    return tasksArray.filter(task => !task.isCompleted)
  }
  else if (filterName === "Completed") {
    return tasksArray.filter(task => task.isCompleted)
  }
}

const deleteCompleted = () => {
  tasksArray = tasksArray.filter(task => !task.isCompleted)
  countPages()
  renderTask()
}

const countPages = () => {
  const filteredArr = filterArray();
  totalPages = Math.ceil(filteredArr.length / TASK_PER_PAGE)
  if (currentPage > totalPages) {
    currentPage = totalPages
    renderTask()
  }
  if (currentPage < 1) {
    currentPage = 1;
  }
}

const renderPage = () => {
  countPages()
    let createPages = `<button class='counter${(currentPage<2) ? ' counter__active':''}' id = "1">1</button>`
  for (let i = 2; i <= totalPages; i++) {
    if(i<45){
    createPages += `<button class='counter${(currentPage === i)  ? ' counter__active' : ''}' id ="${i}">${i}</button>`;
    }
  }
  pages.innerHTML = createPages;
}

const replace = () => {
  return taskText.replace()
}

const changePage = (event) => {
  if (event.target.className === 'counter') {
    currentPage = Number(event.target.id);
    renderTask()
     
  }
  
}
const slicePage = () => {
  const filteredArray = filterArray()
  const firstElement = (currentPage - 1) * TASK_PER_PAGE;
  const elementOnEnd = TASK_PER_PAGE + firstElement;
  const pagination = filteredArray.slice(firstElement, elementOnEnd)
  return pagination;
}
const replaced = (string) => {
  return string
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// const filteredArray = filterArray();
//     const currentPageMin = (currentPage-1) * TASK_PER_PAGE
//     console.log(currentPageMin);
//     console.log(filteredArray.length)
//     if (currentPageMin>=filteredArray.length) {
//       currentPage--;
//     }

pages.addEventListener("click", changePage)
deleteAll.addEventListener("click", deleteCompleted);
Bottom.addEventListener("click", filter);
checkAllTask.addEventListener("click", allChecked);
list.addEventListener("blur", blurTask, true);
list.addEventListener("keydown", editTask);
list.addEventListener('click', handleClick);
buttonAdd.addEventListener("click", addTask)
