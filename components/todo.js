export class Todo {
  constructor(data, selector) {
    this._data = data;
    const template = document.querySelector(selector);
    this.todoElement = template.content.querySelector(".todo").cloneNode(true);
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
    this.todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this.todoCheckboxEl.checked;
    });
  }

  _setDueDate() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this.todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getview() {
    this.todoNameEl.textContent = this._data.name;
    this.todoCheckboxEl.checked = this._data.completed;

    this.todoCheckboxEl.id = `todo-${this._data.id}`;
    this.todoLabel.setAttribute("for", `todo-${this._data.id}`);

    this._setEventListeners();
    this._setDueDate();

    return this.todoElement;
  }
}
