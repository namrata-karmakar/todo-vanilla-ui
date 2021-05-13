const ERROR_MESSAGE_BACKGROUND = `danger`;        //TODO capitalize with underscore
const SUCCESS_MESSAGE_BACKGROUND = `success`;

function isEmailValid(argsUsername) {
  const username = document.getElementById(argsUsername).value;
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegEx.test(username)) {
    displayToast(`Email invalid`, ERROR_MESSAGE_BACKGROUND);
    return false;
  } else {
    displayToast(`OK`, SUCCESS_MESSAGE_BACKGROUND);
    return true;
  }
}

function isPasswordValid(argsPassword) {
  const password = document.getElementById(argsPassword).value;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (!passwordRegEx.test(password)) {
    displayToast(
      `Password must contain 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and must be atleast 8 characters in length`,
      ERROR_MESSAGE_BACKGROUND
    );
    return false;
  } else {
    displayToast(`OK`, SUCCESS_MESSAGE_BACKGROUND);
    return true;
  }
}

function doesConfirmPasswordMatch(argsPassword, argsConfirmPassword) {
  const password = document.getElementById(argsPassword).value;
  const confirmPassword = document.getElementById(argsConfirmPassword).value;
  if (confirmPassword !== password) {
    displayToast(`Password does not match. Try again.`, ERROR_MESSAGE_BACKGROUND);
    return false;
  } else {
    displayToast(`OK`, SUCCESS_MESSAGE_BACKGROUND);
    return true;
  }
}

function isDOBWithinRange(argsUserDomDobId, limitInYears) {
  const userDob = document.getElementById(argsUserDomDobId).value;
  const todayDateInMillis = new Date().getTime();
  const userDOBInMillis = new Date(userDob).getTime();
  const differenceInYears = (todayDateInMillis - userDOBInMillis) / 31556952000;
  const result = differenceInYears >= limitInYears;
  if (result) {
    displayToast(`OK`, SUCCESS_MESSAGE_BACKGROUND);
    return true;
  } else {
    displayToast(`Age must be above ${limitInYears}`, ERROR_MESSAGE_BACKGROUND);
    return false;
  }
}

function isTNCValid(argsTNC) {
  const tnc = document.getElementById(argsTNC).checked;
  if (!tnc) {
    displayToast(
      `Terms and Conditions must be accepted`,
      ERROR_MESSAGE_BACKGROUND
    );
    return false;
  } else {
    displayToast(`OK`, SUCCESS_MESSAGE_BACKGROUND);
    return true;
  }
}
