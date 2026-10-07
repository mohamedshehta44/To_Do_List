const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let counter = 1;
const buttonAddTask = document.querySelector(".add");
const taskListContainer = document.getElementById("taskList")

function displayTasks() {
  taskListContainer.innerHTML ="";
  tasks.forEach(task => {
    taskListContainer.innerHTML +=`
         <div class ="task-item">
         <div>
         <span>${task.title}</span>
         <small>${task.date} at ${task.time}</small>
         </div>
         </div>
        <div class="task-buttons">
         <button><i class="fa-solid fa-check"></i></i></button>
         <button><i class="fa-solid fa-edit"></i></button>
         <button><i class="fa-solid fa-trash"></i></button>

        </div>
`;
    
  });

  
}
const nameDays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
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

buttonAddTask.addEventListener("click", () => {
  const date = new Date();
  const indexDay = date.getDay();
  const day = date.getDate();
  const indexMonth = date.getMonth();

  const input = document.querySelector("input");
  const valueOfInput = input.value.trim()
    if (valueOfInput === "") {
    alert("please enter a task.")
    input.value ="";
    return;
    
  }
  if (valueOfInput.length >100) {
    alert("task text is too long please enter a task with less than 100 character .")
    input.value ="";
    return;
    
  }
  const taskExists = tasks.some((task)=>{
    return  task.title.trim().toLowerCase() === valueOfInput.toLowerCase();});
  if (taskExists) {
    alert("Task already exists!")
    input.value = "";
    return;
    
  }
  const taskList = {
    id: counter,
    title: valueOfInput,
    isCompleted: false,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    numberDay: day,
    nameDay: nameDays[indexDay + 1],
    nameMonth: nameMonths[indexMonth],
  };
  tasks.push(taskList);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  counter++;
  input.value = "";
});
displayTasks();



