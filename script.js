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
  card.setAttribute("draggable", "true");   

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
  attachDragEvents();
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

  document.getElementById("modalTitle").textContent="Yeni Tapşırıq";
}

addTaskBtn.addEventListener("click", function () {
  editingTaskId = null;
  taskForm.reset();

  document.getElementById("modalTitle").textContent = "Yeni Tapşırıq";
  
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
    document.getElementById("modalTitle").textContent = "Tapşırığı Redaktə Et";

    openModal();
  }

  if (e.target.classList.contains("task-card__delete")) {
    const index = tasks.findIndex(function (t) { return t.id === id; });
  
    if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  
  }
}

});


let draggedTaskId = null;

function attachDragEvents() {
  document.querySelectorAll(".task-card").forEach(function (card) {
    card.addEventListener("dragstart", function () {
      draggedTaskId = Number(card.getAttribute("data-id"));
      card.classList.add("task-card--dragging");
    });

    card.addEventListener("dragend", function () {
      card.classList.remove("task-card--dragging");
    });
  });

  document.querySelectorAll(".board__tasks").forEach(function (column) {
    column.addEventListener("dragover", function (e) {
      e.preventDefault();
      column.classList.add("board__tasks--drag-over");
    });

    column.addEventListener("dragleave", function () {
      column.classList.remove("board__tasks--drag-over");
    });

    column.addEventListener("drop", function (e) {
      e.preventDefault();
      column.classList.remove("board__tasks--drag-over");

      const task = tasks.find(function (t) { return t.id === draggedTaskId; });
      const newStatus = column.parentElement.getAttribute("data-status");
      
      if (task) {
      task.status = newStatus;
      renderTasks();
      }
    });
  });
}
renderTasks ();