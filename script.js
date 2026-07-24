const tasks = [
    {
        id: 1,
        title: "HTML Layout",
        priority: "high",
        status: "todo"
    },
    {
        id: 2,
        title: "CSS Dizaynı",
        priority: "medium",
        status: "inprogress"
    },
    {
        id: 3,
        title: "JavaScript Render",
        priority: "low",
        status: "done"
    }
];

const todoTasks = document.getElementById("todoTasks");
const progressTasks = document.getElementById("progressTasks");
const doneTasks = document.getElementById("doneTasks");

function renderTasks() {

    tasks.forEach(function(task) {

        const card = document.createElement("div");

        card.className = "task-card";

        card.textContent = task.title;

        if (task.status === "todo") {
            todoTasks.appendChild(card);
        } else if (task.status === "inprogress") {
            progressTasks.appendChild(card);
        } else {
            doneTasks.appendChild(card);
        }

    });

}

renderTasks();