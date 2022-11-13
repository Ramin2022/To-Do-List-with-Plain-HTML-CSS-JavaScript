// selecting elements
const addtaskBtn = document.getElementById("addtask");
const modal = document.querySelector(".modal-outer");
const submitBtn = document.querySelector(".modal-inner form");
const list = document.querySelector(".list");
const taskInput = modal.querySelector("form").task;
const closeModalBtn = document.querySelector('#closemodal span');
// array for saving task text
let taskList = [];
// console.log(closeModalBtn)
// --------- events -----------
addtaskBtn.addEventListener("click", () => {
  modal.classList.add("open");
});
modal.addEventListener("click", removemodal);
submitBtn.addEventListener("submit", addTask);
closeModalBtn.addEventListener('click',()=>{
  modal.classList.remove('open')

})
// list.addEventListener("click", taskAction);
// -------- functions---------

// ---- removing modal ------
function removemodal(e) {
  const outerModal = !e.target.closest(".modal-inner");
  if (outerModal) {
    modal.classList.remove("open");
  }
}

// --- add task form function -----
function addTask(e) {
  e.preventDefault();
  const taskValue = taskInput.value;

  if (taskInput.value === "" || taskInput.value.trim() === "") {
    return;
  }
  taskList.push(taskValue);
  taskUI(taskList);
  saveToLocalStorage(taskList);
  modal.classList.remove("open");
  taskInput.value = "";
}
/// creating tasks UI
function taskUI(taskList) {
  list.innerHTML = "";
  taskList.forEach((task) => {
    list.insertAdjacentHTML(
      "beforeend",
      `
        <li>
            <p class="task_text">${task}</p>
            <div class="btns">
                <button class="edit">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="delete">
                    <i class="fa fa-trash-alt"></i>
                </button>
            </div>
        </li>
        `
    );
    taskAction(task);
  });
}

// ---------- delete and edit events function -------

function taskAction(taskName) {
  const tasks = list.querySelectorAll("li");
  tasks.forEach((task) => {
    if (task.querySelector(".task_text").textContent === taskName) {
      // editing task
      task.querySelector(".edit").addEventListener("click", () => {
        modal.classList.add("open");
        taskInput.value = taskName;
        list.removeChild(task);

        taskList = taskList.filter((taskItem) => {
          return taskItem !== taskName;
        });
      });
      // deleting task
      task.querySelector(".delete").addEventListener("click", () => {
        list.removeChild(task);
        removetaskFromLocalStorage(taskName);
        taskList = taskList.filter((taskItem) => {
          return taskItem !== taskName;
        });
      });
    }
  });
}

// ------------- save to storage function------------

function saveToLocalStorage(taskList) {
  localStorage.setItem("taskslist", JSON.stringify(taskList));
}
// --- --- get task out from local storage-----
function getTasksFromStorage() {
  const taskStorage = localStorage.getItem("taskslist");
  if (taskStorage === "undefined" || taskStorage === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(taskStorage);
    taskUI(taskList);
  }
}
// calling gettaskfrom storage function 
getTasksFromStorage();

// ---------- remove form storage ----------

function removetaskFromLocalStorage(task) {
  taskList.forEach((taskItem, idx) => {
    if (taskItem === task) {
      taskList.splice(idx, 1);
    }
  });
  localStorage.setItem("taskslist", JSON.stringify(taskList));
}
