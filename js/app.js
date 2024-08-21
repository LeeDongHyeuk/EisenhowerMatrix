const LOCAL_STORAGE_TASKS_KEY = "tasks";

const PRIORITY = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third",
  FOURTH: "fourth",
};

let tasks = [];

const taskList = document.querySelector("ul");

const taskForm = document.querySelector("form");
const emergencyCheckbox = document.getElementById("emergency-checkbox");
const importantCheckbox = document.getElementById("important-checkbox");
const taskInput = document.getElementById("task-input");

taskForm.addEventListener("submit", handleTaskSubmit);

function handleTaskSubmit(event) {
  event.preventDefault();

  const newTask = createTaskObj();
  tasks.push(newTask);
  renderTask(newTask);
  saveTasksToStorage();

  taskForm.reset();
}

function createTaskObj() {
  return {
    id: Date.now(),
    priority: getTaskPriority(),
    text: taskInput.value,
  };
}

function getTaskPriority() {
  const isEmergency = emergencyCheckbox.checked;
  const isImportant = importantCheckbox.checked;

  if (isImportant && isEmergency) {
    return PRIORITY.FIRST;
  }

  if (isImportant) {
    return PRIORITY.SECOND;
  }

  if (isEmergency) {
    return PRIORITY.THIRD;
  }

  return PRIORITY.FOURTH;
}

function renderTask(newTask) {
  const li = document.createElement("li");
  li.id = newTask.id;
  li.className = newTask.priority;

  const span = document.createElement("span");
  span.innerText = newTask.text;

  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteTask);

  li.appendChild(span);
  li.appendChild(button);

  taskList.prepend(li);
}

function deleteTask(event) {
  const li = event.target.parentElement;
  li.remove();

  tasks = tasks.filter((todo) => todo.id !== parseInt(li.id, 10));

  saveTasksToStorage();
}

function saveTasksToStorage() {
  localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
}

function loadSavedTasks() {
  const savedTasks = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);

  if (savedTasks !== null) {
    try {
      tasks = JSON.parse(savedTasks);
      tasks.forEach(renderTask);
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
  }
}

loadSavedTasks();
