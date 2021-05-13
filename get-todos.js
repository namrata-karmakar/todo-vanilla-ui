function populateAvailableTodos() {
  document.getElementById("zone").innerHTML = availableTodos;
}

async function getUserID(argsUsername) {
  try {
    const response = await callFetch({
      url: `http://localhost:3012/api/user/username/${argsUsername}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token-header": `${sessionStorage.getItem("token")}`,
      },
    });
    const userID = response.body;
    sessionStorage.setItem("userID", userID);
  } catch (e) {
    const errorMsg = e.message;
    displayToast(errorMsg, ERROR_MESSAGE_BACKGROUND);
    console.error(e);
  } finally {
  }
}

async function getTodos() {
  try {
    const userID = sessionStorage.getItem("userID");
    const response = await callFetch({
      url: `http://localhost:3012/api/todo/user/${userID}`,
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
