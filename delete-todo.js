let deleteTodoModalObject;

const deleteTodoModal = `<div class="modal fade" id="deleteTodoModal" tabindex="-1" aria-labelledby="deleteTodoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Deletion Warning!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Deleting a todo is permanent and cannot be undone. Are you sure you wish to delete the todo <span id="modalHeaderZone">
        </span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
        <button type="button" onclick="deleteTodo()" data-bs-dismiss="modal" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>`;

function showDeleteTodoModal(todoId, todoDescription) {
  document.getElementById("todoId").value = todoId;
  document.getElementById("modalHeaderText").value = `"${todoDescription.toLowerCase()}"?`;
  deleteTodoModalObject = new bootstrap.Modal(
    document.getElementById("deleteTodoModal"),
    {}
  );
  deleteTodoModalObject.show();
}

async function deleteTodo() {
  try {
    const id = document.getElementById("todoId").value;
    const response = await callFetch({
      url: `http://localhost:3012/api/todo/id/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token-header": `${sessionStorage.getItem("token")}`,
      },
    });
    deleteTodoModalObject.hide();
    await reloadTodos();
    return response;
  } catch (e) {
    throw e;
  } finally {
  }
}
