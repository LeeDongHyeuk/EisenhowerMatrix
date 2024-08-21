const TASKS_KEY = "tasks";
let tasks = [];

const taskForm = document.querySelector("form");
const emergencyCheckbox = document.getElementById("emergency-checkbox");
const importantCheckbox = document.getElementById("important-checkbox");
const taskText = document.getElementById("to-do-text");

taskForm.addEventListener("submit", handleTaskSubmit);

function handleTaskSubmit(event) {
  event.preventDefault();

  const newTaskObj = createTaskObj();
  tasks.push(newTaskObj);
  paintTask(newTaskObj);
  saveTask();

  taskForm.reset();
}

function createTaskObj() {
  return {
    id: Date.now(),
    tier: returnTaskTier(),
    text: taskText.value,
  };
}

function returnTaskTier() {
  const isEmergency = emergencyCheckbox.checked;
  const isImportant = importantCheckbox.checked;

  if (isImportant && isEmergency) {
    return "first";
  }

  if (isImportant) {
    return "second";
  }

  if (isEmergency) {
    return "third";
  }

  return "fourth";
}

function paintTask(newTaskObj) {
  const li = document.createElement("li");
  li.id = newTaskObj.id;

  const span = document.createElement("span");
  span.innerText = newTaskObj.text;

  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteTask);

  li.appendChild(span);
  li.appendChild(button);
  li.className = newTaskObj.tier;

  const taskList = document.querySelector("ul");
  taskList.prepend(li);
}

function deleteTask(event) {
  const li = event.target.parentElement;
  li.remove();

  tasks = tasks.filter((todo) => todo.id !== parseInt(li.id));

  saveTask();
}

function saveTask() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

const savedTasks = localStorage.getItem(TASKS_KEY);

if (savedTasks !== null) {
  tasks = JSON.parse(savedTasks);
  tasks.forEach(paintTask);
}
