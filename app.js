const todoTierList = document.querySelectorAll("ul");
const todoForm = document.querySelector("form");
const emergencyCheck = document.getElementById("emergency-check");
const importantCheck = document.getElementById("important-check");
const todoText = document.getElementById("to-do-text");

const TODOS_KEY = "toDos";
let todos = [];

function todoTier() {
  const isEmergencyTodo = emergencyCheck.checked;
  const isImportantTodo = importantCheck.checked;
  let tier;

  if (isImportantTodo) {
    tier = isEmergencyTodo ? 1 : 2;
  } else {
    tier = isEmergencyTodo ? 3 : 4;
  }

  return tier;
}

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  li.id = newTodo.id;
  span.innerText = newTodo.text;
  button.innerText = "X";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  const todoTierUl = todoTierList[newTodo.tier - 1];
  todoTierUl.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();

  const newTodoObj = {
    id: Date.now(),
    tier: todoTier(),
    text: todoText.value,
  };

  if (todoTierList[newTodoObj.tier - 1].childElementCount >= 10) {
    alert(
      "할 일은 항목 당 10개까지만 생성 가능합니다. 다른 할 일을 지우고 추가하세요."
    );
  } else {
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodo();
  }

  emergencyCheck.checked = false;
  importantCheck.checked = false;
  todoText.value = null;
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  todos = JSON.parse(savedTodos);
  todos.forEach(paintTodo);
}
