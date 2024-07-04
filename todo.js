
const form = document.querySelector('#form');
const inputMain = document.querySelector('#input');
const buttonAdd = document.querySelector('#button')


const taskArray = []

function addTask(event){
  event.preventDefault();
  taskArray.push(
    {
      id: Date.now(),
      taskText: inputMain.value,
      isComplited: false
    }
  )
  console.log(taskArray)
}
function render() {
  taskArray.forEach(function(id){
    console.log(id);
  });
}



buttonAdd.addEventListener("click", addTask)
