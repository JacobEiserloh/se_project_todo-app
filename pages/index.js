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
  // this should now be creating a new instance of the Todo class, which will generate the todo element in its constructor and return it.
  const todo = new Todo(data, todoTemplate);
  return todo.getview(data);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// adding todos to list on form submit
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const date = adjustForTimezone(evt.target.date.value);

  const values = { name, date, id: uuidv4(), completed: false };
  const todo = generateTodo(values);
  todosList.append(todo);

  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
