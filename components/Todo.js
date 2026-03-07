export { Todo };

class Todo {
    constructor(data, selector) {
        this.todoElement = selector.content
            .querySelector(".todo")
            .cloneNode(true);
        this.todoNameEl = this.todoElement.querySelector(".todo__name");
        this.todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
        this.todoLabel = this.todoElement.querySelector(".todo__label");
        this.todoDate = this.todoElement.querySelector(".todo__date");
        this.todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");
    }

    _setEventListeners() {
        this.todoDeleteBtn.addEventListener("click", () => {
            this.todoElement.remove();
        });
    }

    _setDueDate(data) {
        const dueDate = new Date(data.date);
        if (!isNaN(dueDate)) {
            this.todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            })}`;
        }
    }

    getview(data) {
        this.todoNameEl.textContent = data.name;
        this.todoCheckboxEl.checked = data.completed;

        // Apply id and for attributes.
        // The id will initially be undefined for new todos.
        this.todoCheckboxEl.id = `todo-${data.id}`;
        this.todoLabel.setAttribute("for", `todo-${data.id}`);

        this._setEventListeners();
        this._setDueDate(data);
        
        return this.todoElement;
    }
}