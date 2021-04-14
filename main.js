const tabs = document.querySelectorAll("[data-tab-for]");
const tabContents = document.querySelectorAll(".container");

tabs.forEach(tab=> {
  tab.addEventListener("click", (e)=> {
    const target = tab.dataset.tabFor;
    const activeTab = document.getElementById(target);
    tabContents.forEach(tabContent=> {
      tabContent.classList.remove("active-tab");
    });
    activeTab.classList.add("active-tab");
    if (activeTab.id === "login") {
      document.getElementById("logbtn").style.display = "none";
      document.getElementById("signbtn").style.display = "block";
    } else {
      document.getElementById("logbtn").style.display = "block";
      document.getElementById("signbtn").style.display = "none";
    }
  });
});

//register user
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const phone = document.querySelector("#contacts");
const username = document.querySelector("#username");
const nationality = document.querySelector("#nationality");
const email = document.querySelector("#email");
const dateOfBirth = document.querySelector("#date");
const gender = document.querySelector("#gender");
const password = document.querySelector("#password");
const lpassword = document.querySelector("#lpassword");
const submit = document.querySelector("#submit");
const regError = document.querySelector(".regError");
const header = document.querySelector(".header");
const direct = document.querySelector("#direct");
const bottom = document.querySelector(".bottom");
const showbtn = document.querySelector('.faEye');
const logDisplay = document.querySelector(".active-tab");

let users = [];
submit.addEventListener('click', (e)=> {
  //e.preventDefault();
  if (fname.value !== "" &&
    lname.value !== "" &&
    phone.value !== "" &&
    nationality.value !== "" &&
    email.value !== "" &&
    username.value !== "" &&
    gender.value !== "" &&
    dateOfBirth.value !== "" &&
    password.value !== "" &&
    lpassword.value !== "") {
    if (password.value === lpassword.value) {
      const user = {
        firstName: fname.value,
        lastName: lname.value,
        nationality: nationality.value,
        contacts: phone.value,
        username: username.value,
        id: Date.now(),
        isLoggedIn: false,
        portFolio: "",
        email: email.value,
        gender: gender.value,
        dateOfBirth: dateOfBirth.value,
        password: password.value,
        lpassword: lpassword.value
      }
      users.push(user);
      storeUsers(users)
    } else {
      regAlert('password dont match', 'red');
      remove();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      e.preventDefault();
      return;
    }
  } else {

    regAlert("please fill all the fields", "#f13232e9");
    remove();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    e.preventDefault();
    return;
  }
});
function validateEmail(email) {}

function validateName(name) {
  if (name.length < 3) {}
}

function validatePassword(password) {}
function validateUsername(username) {
  if (username.length < 5) {
    alert("username is too short");
    return;
  }
}

function storeUsers(users) {
  if (localStorage.getItem('users') === "") {
    users = [];
  }
  localStorage.setItem('users', JSON.stringify(users))
}
function getUsers() {
  const people = localStorage.getItem('users');
  if (people) {
    users = JSON.parse(people);
  }
}

//login
const myName = document.querySelector("#my-name");
const userPass = document.querySelector("#userpass");
const login = document.querySelector("#log");
const logError = document.querySelector("#logError");

login.addEventListener('click', (e)=> {
  e.preventDefault();
  if (myName.value !== "" && userpass.value !== "") {
    const user = {
      myName: myName.value,
      userpass: userpass.value
    };
    //console.log(user)
    validateUser(user, e);
    //myName.value = "";
    //userpass.value = "";
  } else {
    alertUser("please fill all the fields", '#c23434');
    remove();
    return;
  }
});

showbtn.addEventListener('click', (e)=> {
  const input = e.target.previousElementSibling;
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';

  }
})

function validateUser(user, e) {
  for (let i = 0; i < users.length; i++) {
    if (user.myName === users[i].username && user.userpass === users[i].password || user.myName === users[i].email && user.userpass === users[i].password) {

      users[i].isLoggedIn = true;
      alertUser(`welcome ${users[i].lastName}`, 'blue');
      remove();
      storeUsers(users);
      console.log(users[i]);
      document.location.pathname = "home.html";
      return;
    }
  }
  alertUser('please enter correct details',
    '#f93e1d');
  remove();

}

getUsers();
function alertUser(msg, color) {
  logError.style.display = "block";
  logError.innerHTML = msg;
  logError.style.color = color;
  return;
}
function regAlert(msg, col) {
  regError.style.display = "block";
  regError.innerHTML = msg;
  regError.style.color = col;

}
function remove() {
  setTimeout(()=> {
    logError.style.display = "none";
    regError.style.display = "none";
  },
    3000);
}
function redirect() {
  users.forEach(user=> {
    if (user.isLoggedIn === true) {
      user.portFolio.isActive = true;
      direct.style.display = "block";
      logDisplay.style.display = "none";
      bottom.style.display = "none";
      header.style.display = "none";
      document.location.pathname = 'home.html';
      return;
    }
  })
}
console.log(users)