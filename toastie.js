function displayToast(message, messageType) {
  showToastHTML(message, messageType);
  showToast();
}

function showToastHTML(message, messageType) {
    document.getElementById("toast").innerHTML = `<div id="element" class="position-fixed bottom-0 end-0 p-1" style="z-index: 5">
    <div class="toast align-items-center text-white bg-${messageType} border-0" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>`;
}

function showToast() {
  const toastElList = [].slice.call(document.querySelectorAll(".toast"));
  const toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  toastList.forEach((toast) => toast.show()); // This show them
}


