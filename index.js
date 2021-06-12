const submitForm = document.querySelector("form");
const usernameMessage = document.querySelector("p#usernameMessage");
const passwordMessage = document.querySelector("p#passwordMessage");
const subPassMessage = document.querySelector("p#passwordSubMessage");
const emailMessage = document.getElementById("emailMessage");
const infoBox = document.querySelector(".infoBox");
const p = document.querySelectorAll(".infoBox p");
const sendingData = document.querySelector(".sendProcess");
const scrollArrow = document.querySelector(".scroll-arrow");
const infoModal = document.getElementById("info-modal");
const fixTheDocumentSize = () => {
  document.documentElement.style.setProperty(
    "--fixedHeight",
    `${window.innerHeight}px`
  );
};
fixTheDocumentSize();
const handleShowInputInfo = (e) => {
  const scrollInfo = e.currentTarget.parentElement;
  scrollInfo.classList.toggle("scroll-down");
  e.currentTarget.classList.toggle("scroll-down");
  infoBox.classList.toggle("active");
  infoModal.classList.toggle("active-modal");
};
scrollArrow.addEventListener("click", handleShowInputInfo);

const showMessage = () => {
  sendingData.style.display = "flex";

  setTimeout(() => {
    sendingData.style.display = "none";
  }, 3000);
};
const handleRemoveForm = () => {
  const mainTitle = submitForm.parentElement.firstElementChild;
  mainTitle.style.display = "none";
  console.log(mainTitle);
  const formElements = [...submitForm.children];
  formElements.forEach((item) => (item.style.display = "none"));
  setTimeout(() => {
    for (let element of formElements) {
      element.removeAttribute("style");
    }
    mainTitle.removeAttribute("style");
  }, 3000);
};
const validateData = (username, password, submitPass, email) => {
  const validateUsername = /[a-zA-Z]{3,}.[0-9]{2,}/;
  const validatePassword = /[A-Z]+[a-z]+[0-9]/;
  const validateEmail = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/;
  let usernameIsTrue = false;
  let passwordIsTrue = false;
  let subPassIsTrue = false;
  let subEmailisTrue = false;
  const storedData = {};
  if (validateUsername.test(username.value)) {
    usernameIsTrue = true;
    storedData.username = username.value;
    usernameMessage.textContent = "";
  } else {
    usernameMessage.textContent = "Error ! Invalid username";
  }

  if (validatePassword.test(password.value) && password.value.length > 7) {
    passwordIsTrue = true;
    storedData.password = password.value;
    passwordMessage.textContent = "";
  } else {
    passwordMessage.textContent = "Error ! Invalid password";
  }
  if (submitPass.value === password.value) {
    subPassIsTrue = true;
    storedData.submitPass = submitPass.value;
    subPassMessage.textContent = "";
  } else {
    subPassMessage.textContent = "Error ! Passwords do not match";
  }
  if (validateEmail.test(email.value)) {
    subEmailisTrue = true;
    storedData.email = email.value;
    emailMessage.textContent = "";
  } else {
    emailMessage.textContent = "Error ! Invalid email adress";
  }

  if (usernameIsTrue && passwordIsTrue && subPassIsTrue && subEmailisTrue) {
    username.value = "";
    password.value = "";
    submitPass.value = "";
    email.value = "";
    showMessage();
    handleRemoveForm();
    return storedData;
  }
  return;
};

const formSubmitFunc = (e) => {
  e.preventDefault();
  const inputElements = [...e.target.elements];
  const [username, password, submitPass, email] = inputElements;

  validateData(username, password, submitPass, email);
};
submitForm.addEventListener("submit", formSubmitFunc);
