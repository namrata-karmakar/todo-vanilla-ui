async function callFetch(fetchParams) {
  try {
    let body, status;
    let response = await fetch(fetchParams.url, {
      method: fetchParams.method,
      headers: fetchParams.headers,
      body: fetchParams.body, // body data type must match "Content-Type" header
    });
    //console.log(response.status != 200 && !response.ok);
    if (!response.ok) {
      throw new Error("Server did not send 200");
    } else {
      body = await response.json();
      status = response.status;
    }
    return { body, status };
  } catch (e) {
    throw e;
  }
}

async function newCallFetch(fetchParams) {
  try {
    let body, status;
    let response = await fetch(fetchParams.url, {
      method: fetchParams.method,
      headers: fetchParams.headers,
      body: fetchParams.body, // body data type must match "Content-Type" header
    });
    body = await response.json();
    status = response.status;
    return { body, status };
  } catch (e) {
    throw e;
  }
}

async function callFetchWithTextInResponse(fetchParams) {
  try {
    let body, status;
    let response = await fetch(fetchParams.url, {
      method: fetchParams.method,
      headers: fetchParams.headers,
      body: fetchParams.body, // body data type must match "Content-Type" header
    });

    if (response.status != 200 && !response.ok) {
      throw new Error("Server did not send 200");
    } else {
      body = await response.text();
      status = response.status;
    }
    return { body, status };
  } catch (e) {
    throw e;
  }
}
