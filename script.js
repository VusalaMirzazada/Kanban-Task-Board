function loadTasks() {
  try {
    const saved = localStorage.getItem("kanbanTasks");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("localStorage-dan oxumaq mümkün olmadı:", error);
  }

  return [
    { id: 1, title: "HTML Layout", description: "Əsas struktur", priority: "high", date: "2026-07-20", status: "todo" },
    { id: 2, title: "CSS Dizaynı", description: "Rənglər və düzülüş", priority: "medium", date: "2026-07-22", status: "inprogress" },
    { id: 3, title: "JavaScript Render", description: "Dinamik massiv render", priority: "low", date: "2026-07-18", status: "done" }
  ];
}

function saveTasks() {
  try {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("localStorage-a yazmaq mümkün olmadı:", error);
  }
}

const tasks = loadTasks();
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

  const priority = document.createElement("span");
  priority.className = `task-card__priority task-card__priority--${task.priority}`;
  priority.textContent = task.priority;

  const title = document.createElement("h3");
  title.className = "task-card__title";
  title.textContent = task.title;

  const desc = document.createElement("p");
  desc.className = "task-card__desc";
  desc.textContent = task.description;

  const date = document.createElement("div");
  date.className = "task-card__date";
  date.textContent = task.date;

  const actions = document.createElement("div");
  actions.className = "task-card__actions";

  const editBtn = document.createElement("button");
  editBtn.className = "task-card__edit";
  editBtn.setAttribute("data-id", task.id);
  editBtn.textContent = "✏️";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "task-card__delete";
  deleteBtn.setAttribute("data-id", task.id);
  deleteBtn.textContent = "🗑️";

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(priority);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(date);
  card.appendChild(actions);

  return card;
}

function renderTasks() {
  todoTasks.innerHTML = "";
  progressTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    todoTasks.innerHTML = "<p class='empty-state'>Tapşırıq yoxdur</p>";
    progressTasks.innerHTML = "<p class='empty-state'>Tapşırıq yoxdur</p>";
    doneTasks.innerHTML = "<p class='empty-state'>Tapşırıq yoxdur</p>";
  } else {
    filteredTasks.forEach(function (task) {
      const card = createTaskCard(task);
      const targetColumn = task.status === "todo" ? todoTasks
        : task.status === "inprogress" ? progressTasks
        : doneTasks;

      targetColumn.appendChild(card);

    });
  }
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

  document.getElementById("modalTitle").textContent = "Yeni Tapşırıq";
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
    title: document.getElementById("taskTitle").value.trim(),
    description: document.getElementById("taskDesc").value.trim(),
    priority: document.getElementById("taskPriority").value,
    date: document.getElementById("taskDate").value
  };

  const duplicateTask = tasks.find(function (task) {
    return (
      task.title.toLowerCase() === formData.title.toLowerCase() && task.id !== editingTaskId
    );
  });

   if (duplicateTask) {
    alert("Bu adda tapşırıq artıq mövcuddur.");
    return;
}

  if (editingTaskId === null) {
    tasks.push({ id: Date.now(), status: "todo", ...formData });
  } else {
    const task = tasks.find(function (t) { return t.id === editingTaskId; });
    Object.assign(task, formData);
  }
   
  saveTasks();
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

      const confirmDelete = confirm("Bu tapşırığı silmək istədiyinizə əminsinizmi?");
   
      if (confirmDelete) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
  
  }
}
}

});


let draggedTaskId = null;

document.querySelector(".board").addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("task-card")) {
    draggedTaskId = Number(e.target.getAttribute("data-id"));
    e.target.classList.add("task-card--dragging");
  }
});

document.querySelector(".board").addEventListener("dragend", function (e) {
  if (e.target.classList.contains("task-card")) {
    e.target.classList.remove("task-card--dragging");
  }
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
      saveTasks();
      renderTasks();
    }
  });
});

const searchInput = document.getElementById("searchInput");
const priorityFilter = document.getElementById("priorityFilter");

function getFilteredTasks() {
  const searchText = searchInput.value.toLowerCase ();
  const selectedPriority = priorityFilter.value;

  return tasks.filter(function (task) {
    const matchesSearch = task.title.toLowerCase().includes (searchText) || task.description.toLowerCase().includes(searchText);
    
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority;                       
  
   return matchesSearch && matchesPriority;
  });
}

searchInput.addEventListener("input", renderTasks);
priorityFilter.addEventListener("change", renderTasks);

renderTasks();