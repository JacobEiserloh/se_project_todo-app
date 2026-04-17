// imports
import { initialTodos, validationConfig, formSelectors, } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import PopupWithForm from "../components/popupWithForm.js";
import Section from "../components/section.js";
import adjustForTimezone from "../utils/adjustfortimezone.js";
import TodoCounter from "../components/todocounter.js";

// todo counter
const todoCount = new TodoCounter(initialTodos, ".counter__text");

// add todo popup
const addToDoPopupInstance = new PopupWithForm(
  "#add-todo-popup",
  // form submit handler
  (inputValues) => {
    const name = inputValues.name;
    const date = adjustForTimezone(inputValues.date);
    const todoValues = { name, date, id: uuidv4(), completed: false };

    const todo = new Todo(todoValues, "#todo-template", todoCount);
    todos.addItem(todo.getview(todoValues));

    todoCount.updateTotal(true);

    addToDoPopupInstance.close();
    formValidator.resetValidation();
  },
);

// form validator
const formValidator = new FormValidator(validationConfig, formSelectors.addTodoForm);

// todo section
const todos = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", todoCount);
    todos.addItem(todo.getview(item));
  },
  containerSelector: ".todos__list",
});

formSelectors.addTodoButton.addEventListener("click", () => {
  addToDoPopupInstance.open();
});

// activate validation and render intial todos
formValidator.enableValidation();
addToDoPopupInstance.setEventListeners();
todos.renderItems();
