// JavaScript source code
//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOptions.addEventListener('click',filterTodo)

//Functions

function addTodo(event){
	//Prevent form from submitting
	event.preventDefault();
	//add todo item
	if(todoInput.value.trim()===""){
		alert("Please enter some text");
	}else{

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//create li
	const newTodo = document.createElement("li");
	newTodo.innerText= todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//Add to local storage
	saveLocalTodos(todoInput.value);
	//check mark button
	const completeButton=document.createElement("button");
	completeButton.innerHTML='<i class="fas fa-check" ></i>';
	completeButton.classList.add("complete-btn");
	todoDiv.appendChild(completeButton);

	//delete button
	const deleteButton=document.createElement("button");
	deleteButton.innerHTML='<i class="fas fa-trash" ></i>';
	deleteButton.classList.add("delete-btn");
	todoDiv.appendChild(deleteButton);

	//append to list
	todoList.appendChild(todoDiv);

	//clear input
	todoInput.value= "";
	}
}

function deleteCheck(e){
	const item=e.target;
	if(item.classList[0]==="delete-btn"){
	const todo = item.parentElement;
	todo.classList.add("fall");
	removeLocalTodos(todo);
	todo.addEventListener("transitionend",function(){
		todo.remove();
	});
	}
	
	if(item.classList[0]==="complete-btn"){
	const todo = item.parentElement;
	todo.classList.toggle('completed');
	}

}
function filterTodo(e){
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
				todo.style.display='flex';
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display='flex';
				}else{
					todo.style.display ='none';
				}
				break;
			case "uncompleted":
				if(!todo.classList.contains("completed")){
					todo.style.display='flex';
				}else{
					todo.style.display ='none';
				}
				break;
		}

	});
}

function saveLocalTodos(todo){
	//CHECK--existing?
	let todos;
	if(localStorage.getItem('todos')===null){
		todos=[];

	}else{
		todos =JSON.parse(localStorage.getItem('todos'));

	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}else{
		todos =JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function(todo){
		const todoDiv =document.createElement("div");
		todoDiv.classList.add("todo");
		//create li
		const newTodo = document.createElement("li");
		newTodo.innerText= todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		//check mark button
		const completeButton=document.createElement("button");
		completeButton.innerHTML='<i class="fas fa-check" ></i>';
		completeButton.classList.add("complete-btn");
		todoDiv.appendChild(completeButton);

		//delete button
		const deleteButton=document.createElement("button");
		deleteButton.innerHTML='<i class="fas fa-trash" ></i>';
		deleteButton.classList.add("delete-btn");
		todoDiv.appendChild(deleteButton);

		//append to list
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos=[];
	}else{
		todos =JSON.parse(localStorage.getItem("todos"));
	}

	const todoIndex = todo.children[0].innerText;
	console.log(todos.indexOf(todoIndex));
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos",JSON.stringify(todos));
}