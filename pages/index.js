// imports
import {
  initialTodos,
  todoTemplate,
  validationConfig,
} from "../utils/constants.js";
import { Todo } from "../components/todo.js";
import { FormValidator } from "../components/formvalidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import PopupWithForm from "../components/popupWithForm.js";
import Section from "../components/section.js";
import adjustForTimezone from "../utils/adjustfortimezone.js";

// constants
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// add todo popup
const addToDoPopupInstance = new PopupWithForm(
  "#add-todo-popup",
  (inputValues) => {
    const name = inputValues.name;
    const date = adjustForTimezone(inputValues.date);
    const todoValues = { name, date, id: uuidv4(), completed: false };

    const todo = new Todo(todoValues, "#todo-template");
    todosList.append(todo.getview(todoValues));

    addToDoPopupInstance.close();
    formValidator.resetValidation();
  },
);

// form validator
const formValidator = new FormValidator(validationConfig, addTodoForm);

// todo section
const todos = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    todos.addItem(todo.getview(item));
  },
  containerSelector: todosList,
});

addTodoButton.addEventListener("click", () => {
  addToDoPopupInstance.open();
});

// activate validation and render intial todos
formValidator.enableValidation();
addToDoPopupInstance.setEventListeners();
todos.renderItems();
