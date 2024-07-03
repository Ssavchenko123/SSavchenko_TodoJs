
const form = document.querySelector('#form');
const input = document.querySelector('#input');

form.addEventListener('submit', function(event) {
event.preventDefault();
const taskText = input.value
console.log(taskText);
})

