const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const buttonAddTask = document.querySelector(".add");
buttonAddTask.addEventListener("click", () => {
  const valueOfInput = document.querySelector("input").value;
  tasks.push(valueOfInput);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
});

// hint
//local storage دلوقتى انا خزنت القيم ف
// (for each) كل اللى عليكى تعمليه تعرضيهم عن طريق استخدامك ل
