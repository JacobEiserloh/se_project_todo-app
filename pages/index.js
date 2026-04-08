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

// constants
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// functions
const openModal = (modal) => {
  modal.classList.add("popup_visible");
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

const renderTodo = (data) => {
  const todo = generateTodo(data);
  todosList.append(todo);
};

// initialization
const addToDoPopupInstance = new PopupWithForm("#add-todo-popup",
    (inputValues) => {
      const name = inputValues.name;
      const date = adjustForTimezone(inputValues.date);

      const todoValues = { name, date, id: uuidv4(), completed: false };
      renderTodo(todoValues);
      addToDoPopupInstance.close();
      formValidator.resetValidation();
    }
);

const formValidator = new FormValidator(validationConfig, addTodoForm);

const todos = new Section({items: initialTodos,
   renderer : (item) => {
  const todo = new Todo(item, "#todo-template");
  todos.addItem(todo.getview(item));
},
 containerSelector : todosList});

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});
formValidator.enableValidation();
addToDoPopupInstance.setEventListeners();
todos.renderItems();