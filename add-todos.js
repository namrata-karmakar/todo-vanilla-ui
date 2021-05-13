async function addTodos() {
  try {
    const status = document.getElementById("status").value;
    const date = new Date().toISOString().substring(0, 10);
    const data = {
      todo: document.getElementById("todo").value,
      status,
      userID: sessionStorage.getItem("userID"),
      createdOn: date,
    };
    await addTodosImpl(data);
    await reloadTodos();
    displayToast(`To do successfully added`, SUCCESS_MESSAGE_BACKGROUND);
  } catch (e) {
    console.error(e);
    displayToast(`${e.message}`, ERROR_MESSAGE_BACKGROUND);
  } finally {
  }
}

async function reloadTodos() {
  try {
    const todos = await getTodos();
    renderTodos(todos);
  } catch (e) {
    throw e;
  }
  
}

async function addTodosImpl(dataArgs) {
  try {
    const response = await callFetch({
      url: `http://localhost:3012/api/todo`,
      method: "POST",
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
// N$dnoq2jie
