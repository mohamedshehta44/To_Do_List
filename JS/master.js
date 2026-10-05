const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let counter = 1;
const buttonAddTask = document.querySelector(".add");
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

  const valueOfInput = document.querySelector("input").value;
  const taskList = {
    id: counter,
    title: valueOfInput,
    numberDay: day,
    nameDay: nameDays[indexDay + 1],
    nameMonth: nameMonths[indexMonth],
  };
  tasks.push(taskList);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  counter++;
});


// hint
//local storage دلوقتى انا خزنت القيم ف
// (for each) كل اللى عليكى تعمليه تعرضيهم عن طريق استخدامك ل
