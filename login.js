const loginForm = `<form class="form">
  <div class="container ml-auto">
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <input type="email" onchange="onInputUsernameHandler()" class="form-control" id="username" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" onchange="onInputPasswordHandler()" class="form-control" id="password">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="keepMeLoggedIn">
      <label class="form-check-label" for="keepMeLoggedIn">Keep me logged in</label>
    </div>
    <button type="button" onclick="login()" class="btn btn-primary">Submit</button>
    <button type="button" onclick="populateSignUpForm()" class="btn btn-outline-primary">Sign Up</button>
  </div>
</form>`;

function populateLoginForm() {
  document.getElementById("zone").innerHTML = loginForm;
}

async function login() {
  try {
    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    await loginImpl(data);
    await getUserID(data.username);
    const todos = await getTodos();
    renderTodos(todos);
    displayToast(`Successfully logged in`, SUCCESS_MESSAGE_BACKGROUND);
  } catch (e) {
    console.error(e);
    displayToast(`Please enter valid credentials!`, ERROR_MESSAGE_BACKGROUND);
  } finally {
  }
}

function renderTodos(todoArgs) {
  if (todoArgs.length !== 0) {
    populateAvailableTodos(todoArgs);
  } else {
    populateZeroTodosPage();
  }
}

async function loginImpl(dataArgs) {
  try {
    const response = await callFetchWithTextInResponse({
      url: "http://localhost:3012/user/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataArgs),
    });
    const { body } = response;
    sessionStorage.setItem("token", body);
  } catch (e) {
    throw e;
  } finally {
  }
}
