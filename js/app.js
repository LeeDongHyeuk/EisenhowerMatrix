const LOCAL_STORAGE_TASKS_KEY = "tasks";
const PRIORITY = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third",
  FOURTH: "fourth",
};
const TASK_LIMIT = 10;

let tasks = [];

const taskList = document.querySelector("ul");

const taskForm = document.querySelector("form");
const emergencyCheckbox = document.getElementById("emergency-checkbox");
const importantCheckbox = document.getElementById("important-checkbox");
const taskInput = document.getElementById("task-input");

taskForm.addEventListener("submit", handleTaskSubmit);

function handleTaskSubmit(event) {
  event.preventDefault();

  const newTask = createNewTask();

  if (checkTaskLimitAndNotify(newTask.priority)) {
    return;
  }

  addTaskToList(newTask);

  taskForm.reset();
}

function createNewTask() {
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

function checkTaskLimitAndNotify(priority) {
  if (isTaskCountAtLimit(priority)) {
    alert(
      `우선순위별 할 일 개수는 각 ${TASK_LIMIT}개까지만 등록 가능해요!\n목록을 정리하고 다시 기록하세요`
    );
    return true;
  }

  return false;
}

function isTaskCountAtLimit(priority) {
  const taskCount = document.querySelectorAll(`.${priority}`).length;
  return taskCount === TASK_LIMIT;
}

function addTaskToList(newTask) {
  tasks.push(newTask);
  renderTask(newTask);
  saveTasksToStorage();
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
