const tasks = [
  { id: 1, title: "HTML Layout", description: "Əsas struktur", priority: "high", date: "2026-07-20", status: "todo" },
  { id: 2, title: "CSS Dizaynı", description: "Rənglər və düzülüş", priority: "medium", date: "2026-07-22", status: "inprogress" },
  { id: 3, title: "JavaScript Render", description: "Dinamik massiv render", priority: "low", date: "2026-07-18", status: "done" }
];

let editingTaskId = null;

const todoTasks = document.getElementById("todoTasks");
const progressTasks = document.getElementById("progressTasks");
const doneTasks = document.getElementById("doneTasks");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const addTaskBtn = document.getElementById("addTaskBtn");
const cancelBtn = document.getElementById("cancelBtn");


function createTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.setAttribute("data-id", task.id);

  card.innerHTML = `
    <span class="task-card__priority task-card__priority--${task.priority}">${task.priority}</span>
    <h3 class="task-card__title">${task.title}</h3>
    <p class="task-card__desc">${task.description}</p>
    <div class="task-card__date">${task.date}</div>
    <div class="task-card__actions">
      <button class="task-card__edit" data-id="${task.id}">✏️</button>
      <button class="task-card__delete" data-id="${task.id}">🗑️</button>
    </div>
  `;

  return card;
}

function renderTasks() {
  todoTasks.innerHTML = "";
  progressTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  tasks.forEach(function (task) {
    const card = createTaskCard(task);
    const targetColumn = task.status === "todo" ? todoTasks
      : task.status === "inprogress" ? progressTasks
      : doneTasks;

    targetColumn.appendChild(card);
  });

  updateCounts();
}

function updateCounts() {
  document.querySelectorAll(".board__column").forEach(function (column) {
    const status = column.getAttribute("data-status");
    const count = tasks.filter(function (t) { return t.status === status; }).length;
    column.querySelector(".board__count").textContent = count;
  });
}


function openModal() {
  taskModal.hidden = false;
}

function closeModal() {
  taskModal.hidden = true;
  taskForm.reset();
  editingTaskId = null;
}

addTaskBtn.addEventListener("click", function () {
  editingTaskId = null;
  taskForm.reset();
  openModal();
});

cancelBtn.addEventListener("click", closeModal);


taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDesc").value,
    priority: document.getElementById("taskPriority").value,
    date: document.getElementById("taskDate").value
  };

  if (editingTaskId === null) {
    tasks.push({ id: Date.now(), status: "todo", ...formData });
  } else {
    const task = tasks.find(function (t) { return t.id === editingTaskId; });
    Object.assign(task, formData);
  }

  renderTasks();
  closeModal();
});


document.querySelector(".board").addEventListener("click", function (e) {
  const id = Number(e.target.getAttribute("data-id"));

  if (e.target.classList.contains("task-card__edit")) {
    const task = tasks.find(function (t) { return t.id === id; });

    editingTaskId = id;
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDesc").value = task.description;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskDate").value = task.date;

    openModal();
  }

  if (e.target.classList.contains("task-card__delete")) {
    const index = tasks.findIndex(function (t) { return t.id === id; });
    tasks.splice(index, 1);
    renderTasks();
  }
});


renderTasks();