
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
let taskArray = []
let filterName = "All"
let currentPage = 1;
let totalPages = 1;

function addTask(event) {
  event.preventDefault();
  if (inputMain.value.trim() != "") {
    taskArray.push(
      {
        id: Date.now(),
        taskText: replaced(inputMain.value),
        isCompleted: false,
      }
    )
  }
  renderPages()
  renderPage()
  if (totalPages > currentPage) {
    currentPage += 1
  }

  inputMain.value = "";
  render()
}

const render = () => {
  counter()
  checkAllTask.checked = taskArray.every(task => task.isCompleted) && taskArray.length;
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
  renderPages()
  renderPage()


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
        task.taskText = replaced(event.target.value)
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
          task.taskText = replaced(event.target.value)
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
  if (currentPage > totalPages) {
    currentPage = totalPages
  }
  if (currentPage < 1) {
    currentPage = 1;
  }
}

const renderPage = () => {
  renderPages()
    let createPages = `<button class='counter${(currentPage<2) ? ' counter__active':''}' id = "1">1</button>`
  for (let i = 2; i <= totalPages; i++) {
    createPages += `<button class='counter${(currentPage === i)  ? ' counter__active' : ''}' id ="${i}">${i}</button>`;
  }
  pages.innerHTML = createPages;
}

const replace = () => {
  return taskText.replace()
}

const changePage = (event) => {
  if (event.target.className === 'counter') {
    currentPage = Number(event.target.id);
    render()
     
  }
  
}
const slicePage = () => {
  const filteredArray = filterArray()
  const currentPageMin = (currentPage-1) * TASK_PER_PAGE
  if (currentPageMin>filteredArray.length && filteredArray.length) currentPage--;
  const firstElement = (currentPage - 1) * TASK_PER_PAGE;
  const elementOnEnd = TASK_PER_PAGE + firstElement;
  const pagination = filteredArray.slice(firstElement, elementOnEnd)
  return pagination;
}
const replaced=(string)=>{
    return string
    .replace(/№/g, '&#8470;')
    .replace(/</g, '&#60;')
    .replace(/>/g, '&#62;')
    .replace(/!/g, '&#33;')
    .replace(/:/g, '&#58;')
    .replace(/#/g, '&#35;')
    .replace(/%/g, '&#37;')

}

// 
// return String.replace(/[<>!?$%#*№:()]/g,(lookFor) =>{
// switch(lookFor){
//   case  "<": return "&#60;";
//   case  ">": return "&#62;";
//   case  "!": return "&#62;";
//   case  "?": return "&#62;";
//   case  "$": return "&#62;";
//   case  "%": return "&#62;";
//   case  "#": return "&#62;";
//   case  "*": return "&#8727;";
//   case  "№": return "&#62;";
//   case  ":": return "&#62;";
//   case  "(": return "&#62;";
//   case  ")": return "&#62;";
// }
// })}
// const inputReplaced =(input) =>{
//   return replaced(input.replace(/\s+g/,''))
// }


pages.addEventListener("click", changePage)
deleteAll.addEventListener("click", deleteCompleted);
Bottom.addEventListener("click", filter);
checkAllTask.addEventListener("click", allChecked);
list.addEventListener("blur", blurTask, true);
list.addEventListener("keydown", editTask);
list.addEventListener('click', handleClick);
buttonAdd.addEventListener("click", addTask)
