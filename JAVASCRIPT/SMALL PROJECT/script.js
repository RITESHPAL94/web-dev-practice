const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    // Create list item
    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Complete task
    checkbox.addEventListener("change", function() {
        li.classList.toggle("completed", checkbox.checked);
    });

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    // Delete task
    deleteBtn.addEventListener("click", function() {
        li.remove();
    });

    // Add everything to the list item
    li.append(checkbox, span, deleteBtn);

    // Show task on the page
    taskList.appendChild(li);

    // Clear input
    form.reset();
    input.focus();
});
