import {
  initialTodos,
  todoTemplate,
  validationConfig,
} from "../utils/constants.js";
import { Todo } from "../components/todo.js";
import { FormValidator } from "../components/formvalidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const adjustForTimezone = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(
    adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset(),
  );
  return adjustedDate;
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getview(data);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const renderTodo = (data) => {
  const todo = generateTodo(data);
  todosList.append(todo);
}

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.elements.name.value;
  const date = adjustForTimezone(evt.target.elements.date.value);

  const values = { name, date, id: uuidv4(), completed: false };
  renderTodo(values);

  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});
