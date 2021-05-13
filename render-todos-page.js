const addTodoModal = `<div class="modal fade" id="addTodoModal" tabindex="-1" aria-labelledby="addTodoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addTodoModalLabel">Add a new To Do</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="todo" class="col-form-label">To Do</label>
            <input type="text" class="form-control" id="todo">
          </div>
          <div class="mb-3">
            <label for="status" class="col-form-label">Status </label>
            <select id="status" class="form-select" aria-label="select-status">
              <option selected>Open this select menu</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
        <button type="button" onclick="addTodos()" data-bs-dismiss="modal" class="btn btn-primary">Create</button>
      </div>
    </div>
  </div>
</div>`;

const zeroTodosPage = `<div>
  <div class="noTodosText">
    <h1>You don't have any todos</h1>
  </div>
  <button type="button" class="btn btn-dark btn-lg addTodoBtn" data-bs-toggle="modal" data-bs-target="#addTodoModal">
    Add a To Do
  </button>
  ${addTodoModal}
  <div id="toast">
  </div>
</div>`;

function populateZeroTodosPage() {
  document.getElementById("zone").innerHTML = zeroTodosPage;
}

function populateAvailableTodos(todoArgs) {
  todoArgs = todoArgs.reverse();
  const trStrings = todoArgs.map(
    (item) => `<tr><td class="completed">${item.todo}</td>
  <td>${item.status}</td>
  <td class="modifierButtons">
    <button type="button" onclick="showUpdateTodoModal(\'${item._id}\')" class="btn btn-outline-primary btn-sm">Edit</button>
    <button type="button" onclick="showDeleteTodoModal(\'${item._id}\',\'${item.todo}\')" class="btn btn-outline-danger btn-sm deleteButton">Delete</button>
  </td></tr>`
  );
  const trHTMLString = trStrings.reduce((acc, curr) => acc + curr);
  document.getElementById("zone").innerHTML = `<div">
  <button type="button" class="btn btn-dark btn-lg addTodoBtn" data-bs-toggle="modal" data-bs-target="#addTodoModal">
    Add a To Do
  </button>
  ${addTodoModal}
  ${updateTodoModal}
  ${deleteTodoModal}
  <table class="table table-bordered todosTable">
    <thead>
      <tr>
        <th scope="col">To Do</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    ${trHTMLString}
  </table>
</div>`;

  const updateModalDomId = document.getElementById("updateTodoModal");
  updateModalDomId.addEventListener("show.bs.modal", async () => {
    const todoId = document.getElementById("todoId").value; //get the todo id from hidden parameter
    await setTodo(todoId);
  }
  );

  const deleteModalDomId = document.getElementById("deleteTodoModal");
  deleteModalDomId.addEventListener("show.bs.modal", () => {
    const modalHeaderText = document.getElementById("modalHeaderText").value;
    document.getElementById("modalHeaderZone").innerHTML = modalHeaderText;
    console.log(modalHeaderText);
  }
  );

}
