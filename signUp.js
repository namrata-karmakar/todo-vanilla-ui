const SIGN_UP_AGE_LIMIT = 18;
const signUpForm = `<form id="signup" class="form">
  <div class="container ml-auto">
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <input type="email" onchange="onInputUsernameHandler()" class="form-control" id="username">
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" onchange="onInputPasswordHandler()" class="form-control" id="password">
    </div>
    <div class="mb-3">
      <label class="form-label">Confirm Password</label>
      <input type="password" onchange="onInputConfirmPasswordHandler()" class="form-control" id="confirmPassword">
    </div>
    <div class="mb-3">
      <label class="form-label">Date of Birth</label>
      <input type="date" onchange="onInputDOBHandler()" class="form-control" id="dob">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" onclick="onInputTNCHandler()" class="form-check-input" id="tnc">
      <label class="form-check-label">I have read and agree with the Terms and Conditions</label>
    </div>
    <button type="button" onclick="signUp()" class="btn btn-primary">Submit</button>
    <button type="reset" class="btn btn-outline-primary">Reset</button>
  </div>
</form>`;

function onInputUsernameHandler() {
  isEmailValid("username");
}

function onInputPasswordHandler() {
  isPasswordValid("password");
}
function onInputConfirmPasswordHandler() {
  doesConfirmPasswordMatch("password", "confirmPassword");
}
function onInputDOBHandler() {
  isDOBWithinRange("dob", SIGN_UP_AGE_LIMIT);
}
function onInputTNCHandler() {
  isTNCValid("tnc");
}

function populateSignUpForm() {
  document.getElementById("zone").innerHTML = signUpForm;
}

function signUp() {
  const isFormValid = isSignUpFormValid();
  if (isFormValid) {
    signUpImpl();
  } else {
    displayToast(`Form Invalid!`, ERROR_MESSAGE_BACKGROUND);
  }
}

function isSignUpFormValid() {
  let isFormValid = false;
  const emailFlag = isEmailValid("username");
  const passwordFlag = isPasswordValid("password");
  const confirmPasswordFlag = doesConfirmPasswordMatch(
    "password",
    "confirmPassword"
  );
  const tncFlag = isTNCValid("tnc");
  const ageFlag = isDOBWithinRange("dob", SIGN_UP_AGE_LIMIT);
  isFormValid = [emailFlag, passwordFlag, confirmPasswordFlag, tncFlag, ageFlag].reduce(
    (acc, curr) => acc && curr
  );
  return isFormValid;
}

async function signUpImpl() {
  try {
    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      dob: document.getElementById("dob").value,
      tnc: document.getElementById("tnc").checked,
    };
    const response = await newCallFetch({
    url: "http://localhost:3012/user/signUp",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      populateLoginForm();
      displayToast(`${data.username} Created`, SUCCESS_MESSAGE_BACKGROUND);
    } else {
      const { msg } = response.body.errors.reduce((acc, curr) => {
        if (acc.hasOwnProperty("msg")) {
          acc.msg += `<br>${curr.msg}`; 
        } else {
          acc.msg = `<br>${curr.msg}`;
        }
        return acc;
      });
      displayToast(msg, ERROR_MESSAGE_BACKGROUND);
    }
    return response;
  } catch (e) {
    const errorMsg = e.message;
    displayToast(errorMsg, ERROR_MESSAGE_BACKGROUND);
    console.error(e);
  } finally {
  }
}
