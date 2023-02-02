const themeSwitch = document.querySelector(".themeSwitch");
const app = document.querySelector(".app");
const todoInput = document.querySelector(".todoInput");
let todo = document.querySelector(".todo");
const todos = document.querySelector(".todos");
const leftAndClear = document.querySelector(".leftAndClear");
let leftNum = document.querySelector(".leftNum");
let viewAllBtn = document.querySelector(".viewAllBtn");
let viewOps = document.querySelector(".viewOps");
let todoAll = document.querySelectorAll(".todo");

let todosData = [
  { todoText: "Walk a dog", status: "active", id: 1 },
  { todoText: "Jog around the park 3x", status: "active", id: 2 },
  { todoText: "Pick up groceries", status: "active", id: 3 },
];

let updateLeftNum = () => {
  let activeTodos = todosData.filter((data) => {
    return data.status === "active";
  });
  leftNum.innerText = activeTodos.length;
};

const loadTodos = () => {
  for (let todoData of todosData) {
    let newTodo = todo.cloneNode(true);
    newTodo.classList.add(todoData.status);
    let todoText = newTodo.children[1];
    todoText.innerText = todoData.todoText;
    newTodo.id = todoData.id;
    todos.insertBefore(newTodo, leftAndClear);
  }
  todoAll = document.querySelectorAll(".todo");
};

const clearViewOpSelection = () => {
  for (let op of viewOps.children) {
    if (op.classList.contains("viewOpSelected")) {
      op.classList.remove("viewOpSelected");
    }
  }
};
const addDragListeners = () => {
  for (let todo of todoAll) {
    todo.addEventListener("dragstart", (e) => {
      todo.classList.add("dragging");
      // removes dragging ghost image
      let img = new Image();
      img.src = "";
      e.dataTransfer.setDragImage(img, 0, 0);
    });

    todo.addEventListener("dragend", (e) => {
      todo.classList.remove("dragging");
    });
  }
};

loadTodos();
updateLeftNum();
viewAllBtn.classList.add("viewOpSelected");
addDragListeners();

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && todoInput.value !== "") {
    let newTodo = todo.cloneNode(true);
    let todoText = newTodo.children[1];
    todoText.innerText = todoInput.value;
    todoInput.value = "";
    todos.insertBefore(newTodo, leftAndClear);
    let newData = { todoText: todoText.innerText, status: "active" };
    todosData.push(newData);
    updateLeftNum();
    todoAll = document.querySelectorAll(".todo");
    addDragListeners();
  }
});

window.addEventListener("click", (e) => {
  let allTodos = document.querySelectorAll(".todo");

  if (e.target.classList.contains("crossBtn")) {
    +e.target.parentElement.id;
    todosData = todosData.filter((data) => {
      return data.id !== +e.target.parentElement.id;
    });
    e.target.parentElement.remove();
    updateLeftNum();
  } else if (e.target.classList.contains("taskCircle")) {
    let todoPar = e.target.parentElement;
    if (e.target.classList.contains("checked")) {
      e.target.classList.remove("checked");
      todoPar.classList.remove("completed");
      todoPar.classList.add("active");
      todosData = todosData.map((data) => {
        if (+todoPar.id === data.id) data.status = "active";
        return data;
      });
    } else {
      e.target.classList.add("checked");
      todoPar.classList.add("completed");
      todoPar.classList.remove("active");
      todosData = todosData.map((data) => {
        if (+todoPar.id === data.id) data.status = "completed";
        return data;
      });
    }
    updateLeftNum();
  } else if (e.target.classList.contains("clearBtn")) {
    let completedTodos = document.querySelectorAll(".completed");
    for (let todo of completedTodos) {
      todo.remove();
    }
    todosData = todosData.filter((data) => {
      return data.status !== "completed";
    });
  } else if (e.target.classList.contains("viewAllBtn")) {
    clearViewOpSelection();
    e.target.classList.add("viewOpSelected");
    for (let todo of allTodos) {
      if (todo.classList.contains("hide")) todo.classList.remove("hide");
    }
  } else if (e.target.classList.contains("viewActiveBtn")) {
    clearViewOpSelection();
    e.target.classList.add("viewOpSelected");
    for (let todo of allTodos) {
      if (todo.classList.contains("completed")) {
        todo.classList.add("hide");
      } else {
        todo.classList.remove("hide");
      }
    }
  } else if (e.target.classList.contains("viewCompletedBtn")) {
    clearViewOpSelection();
    e.target.classList.add("viewOpSelected");
    for (let todo of allTodos) {
      if (todo.classList.contains("completed")) {
        todo.classList.remove("hide");
      } else {
        todo.classList.add("hide");
      }
    }
  }
});

todos.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(e.clientY);
  const draggable = document.querySelector(".dragging");
  todos.insertBefore(draggable, afterElement);
  todos.appendChild(leftAndClear);
});

const getDragAfterElement = (y) => {
  const draggableElements = document.querySelectorAll(".todo:not(.dragging)");
  let closest = { offset: Number.NEGATIVE_INFINITY };

  for (let i = 0; i < draggableElements.length; i++) {
    let current = draggableElements[i];
    const box = current.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      closest = { offset: offset, element: current };
    }
  }
  return closest.element;
};


sessionStorage.setItem('myCat', 'Tsuki');

// console.log(localStorage.getItem('myCat'))



