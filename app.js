//define UI variables
const form = document.querySelector("#task-form"),
      taskList = document.querySelector(".collection"),
      clearBtn = document.querySelector(".clear-tasks"),
      filter = document.querySelector("#filter"),
      taskInput = document.querySelector("#task");

// load all Event listeners

loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create a delete link elelment
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // appenf link to li
    li.appendChild(link);
    // append li to the ul
    taskList.appendChild(li);
    //store in local storage
  });
}
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
  }
  var tdy = new Date().toDateString();
  //create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create a delete link elelment
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // add icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // appenf link to li
  li.appendChild(link);
  // append li to the ul
  taskList.appendChild(li);
  //store in local storage
  storeInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";

  e.preventDefault();
}

function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      // remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  if (confirm("Are you sure you want to delete all lists?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  //while loop is fastet than
  // taskList.innerHTML = "";
  clearTasksFromLocalStorage();
}

//clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"; ///show the item
    } else {
      task.style.display = "none";
    }
  });
}
