
const form = document.querySelector('#form');
const input = document.querySelector('#input');
let a7 = []

form.addEventListener('submit', function(event) {
event.preventDefault();
const taskText = input.value
console.log(taskText);
})
function inputarr(){
  let input = document.querySelector('#input')

  a7.push(input.value)
  console.log(a7)

}

document.querySelector('#input').onclick = inputarr


