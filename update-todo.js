let updateTodoModalObject;

const updateTodoModal = `<div class="modal fade" id="updateTodoModal" tabindex="-1" aria-labelledby="updateTodoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="updateTodoModalLabel">Update To Do</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="todo" class="col-form-label">To Do</label>
            <input type="text" class="form-control" id="todo_edit">
          </div>
          <div class="mb-3">
            <label for="status" class="col-form-label">Status </label>
            <select id="status_edit" class="form-select" aria-label="select-status">
              <option>Open this select menu</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
        <button type="button" onclick="updateTodo()" data-bs-dismiss="modal" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>`;

function showUpdateTodoModal(todoId) {
  document.getElementById("todoId").value = todoId; //set todo id to hidden parameter
  updateTodoModalObject = new bootstrap.Modal(
    document.getElementById("updateTodoModal"),
    {}
  );
  updateTodoModalObject.show();
}

async function setTodo(todoId) {
  try {
    console.log(todoId);
    const todo = await getTodoDataByTodoID(todoId);
    setTodoInModal(todo);
  } catch (e) {
    console.error(e);
    displayToast(`Error in update`, ERROR_MESSAGE_BACKGROUND)
  }
}

// const updateModalDomId = document.getElementById("updateTodoModal");
// updateModalDomId.removeEventListener("shown.bs.modal", () => { });
async function getTodoDataByTodoID(id) {
  try {
    const response = await callFetch({
      url: `http://localhost:3012/api/todo/id/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token-header": `${sessionStorage.getItem("token")}`,
      },
    });
    return response.body;
  } catch (e) {
    const errorMsg = e.message;
    displayToast(errorMsg, ERROR_MESSAGE_BACKGROUND);
    console.error(e);
  } finally {
  }

}

function setTodoInModal(todo) {
  try {
    document.getElementById("todoId").value = todo._id;
    document.getElementById("todo_edit").value = todo.todo;
    document.getElementById("status_edit").value = todo.status;

  } catch (e) {
    console.error(e);
  }
}

async function updateTodo() {
  try {
    const status = document.getElementById("status_edit").value;
    const date = new Date().toISOString().substring(0, 10);
    const data = {
      todo: document.getElementById("todo_edit").value,
      status,
      userID: sessionStorage.getItem("userID"),
      updatedOn: date,
    };
    await updateTodoImpl(data);
    await reloadTodos();
    displayToast(`To do successfully updated`, SUCCESS_MESSAGE_BACKGROUND);
  } catch (e) {
    console.error(e);
    displayToast(`${e.message}`, ERROR_MESSAGE_BACKGROUND);
  } finally {
  }
}

async function updateTodoImpl(dataArgs) {
  try {
    const id = document.getElementById("todoId").value;
    const response = await callFetch({
      url: `http://localhost:3012/api/todo/id/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token-header": `${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataArgs),
    });
  } catch (e) {
    throw e;
  } finally {
  }
}