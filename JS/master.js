let tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
const dateItem = document.querySelector(".date");
const buttonAddTask = document.querySelector(".add");
const toggleBTN = document.querySelector("#theme");
const taskListContainer = document.getElementById("taskList");
const sortButton = document.querySelectorAll(".tab");
const totalCount = document.querySelector(".totalCount");
const completedCount = document.querySelector(".completedCount");
const remainingCount = document.querySelector(".remainingCount");
const buttons = document.querySelectorAll(".tab");

const nameDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const nameMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Head section
function setDataInHeadSection() {
  const dateNow = new Date();
  dateItem.innerHTML += `${nameDays[dateNow.getDay()]} , ${dateNow.getDate()} ${nameMonths[dateNow.getMonth()]}`;
}
setDataInHeadSection();

// Add Task
function handleAddTask() {
  document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("input[type=text]").value.trim();
    const date = new Date();
    const indexDay = date.getDay();
    const day = date.getDate();
    const indexMonth = date.getMonth();
    const taskList = {
      id: Date.now(),
      title: inputValue,
      isCompleted: false,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      numberDay: day,
      nameDay: nameDays[indexDay + 1],
      nameMonth: nameMonths[indexMonth],
    };
    tasks.push(taskList);
    window.localStorage.setItem("Tasks", JSON.stringify(tasks));
    displayTasks();
    setDataInStatisticsSection();
    document.querySelector("input[type=text]").value = "";
  });
}
handleAddTask();

function setDataInStatisticsSection() {
  const completedTasks = tasks.filter((task) => {
    return task.isCompleted === true;
  });

  const incompleteTasks = tasks.filter((task) => {
    return task.isCompleted === false;
  });
  const numberOfCompletedTasks = completedTasks.length;
  const numberOfRemainingTasks = incompleteTasks.length;
  const numberOfTotalTasks = tasks.length;
  totalCount.innerHTML = numberOfTotalTasks;
  completedCount.innerHTML = numberOfCompletedTasks;
  remainingCount.innerHTML = numberOfRemainingTasks;
}
setDataInStatisticsSection();

// Active Current Click
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

// Function to display tasks in the task list container
let tasksList = tasks;
function displayTasks() {
  taskListContainer.innerHTML = "";
  if (tasksList.length === 0) {
    taskListContainer.innerHTML = `<div class ="empty-task" style="display:grid;place-items:center ;padding:20px">No tasks add</div>`;
  } else {
    tasksList.forEach((task) => {
      taskListContainer.innerHTML += `
        <div class ="task-item">
          <div class="info">
            <h4>${task.title}</h4>
            <span> <i class="fa-regular fa-clock"></i> ${task.date} at ${task.time}</span>
          </div>
          <div class="task-buttons">
            <button class = "state ${task.isCompleted ? "completed" : ""}" data-id=${task.id}>${task.isCompleted ? "completed" : "remaining"}</button>
            <button type = "button" class="delete"  data-id="${task.id}" aria-label="Delete task : ${task.title}"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
          </div>
        </div>
`;
    });
  }
}
displayTasks();

// Delete Of Task
function handleDelete() {
  taskListContainer.addEventListener("click", (event) => {
    if (!event.target.closest(".delete")) return;
    const check = window.confirm("Are you sure you want to delete this task?");
    if (check) {
      const newList = tasks.filter((task) => {
        return task.id != event.target.closest(".delete").dataset.id;
      });
      tasks = newList;
      tasksList = tasks;
      localStorage.setItem("Tasks", JSON.stringify(tasks));
    }
    displayTasks();
    setDataInStatisticsSection();
  });
}
handleDelete();

// Change State
function handleChangeState() {
  taskListContainer.addEventListener("click", (event) => {
    if (!event.target.closest(".state")) return;
    const newList = tasks.map((task) => {
      if (task.id == event.target.closest(".state").dataset.id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    tasks = newList;
    tasksList = tasks;
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    
    displayTasks();
    setDataInStatisticsSection();
  });
}
handleChangeState();

// Sorting Tasks
let sort;
function handleSortTasks() {
  sortButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      const completedTasks = tasks.filter((task) => {
        return task.isCompleted === true;
      });

      const incompleteTasks = tasks.filter((task) => {
        return task.isCompleted === false;
      });
      sort = btn.innerHTML;
      if (sort === "completed") {
        tasksList = completedTasks;
      } else if (sort === "remaining") {
        tasksList = incompleteTasks;
      } else {
        tasksList = tasks;
      }

      displayTasks();
    });
  });
}
handleSortTasks();
