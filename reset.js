const account = document.getElementById('email-checker');
const search_btn = document.getElementById('search');
const resetForm = document.querySelector('.reset-form');
const searchText = document.querySelector('.search-text');
const searchError = document.querySelector('#search-error');
const passError = document.querySelector('#pass-error');
const showPass = document.querySelectorAll('.forms');
const searchContainer = document.querySelector('.search-div');
const first_password = document.getElementById('new-password');
const second_password = document.getElementById('re-entered-password');
const btn = document.getElementById('btn');
const back = document.getElementById('back');

const savedUsers = localStorage.getItem('users');
const users = JSON.parse(savedUsers);
userAcc = [];
/*
back.addEventListener('click', ()=> {
  window.location.pathname = 'index.html';
})
*/
search_btn.addEventListener('click', searchEmail);

showPass.forEach(showbtn=> {
  showbtn.addEventListener('click', (e)=> {
    const input = e.target.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';

    }
  })
})
function searchEmail() {
  for (let i = 0; i < users.length; i++) {
    if (account.value !== "" && account.value === users[i].email) {
      userAcc.push(users[i]);
      resetForm.style.display = 'block';
      searchContainer.style.display = 'none';
      searchText.innerHTML = `<span class='user-info'> Account:</span> ${users[i].firstName} ${users[i].lastName}`;
      console.log('success..')
      return;
    }
  }
  console.log('fail twice');
  searchError.style.display = 'block';
  alertError(searchError,
    'invalid Account...',
    '#c6340e');
  removeAlert(searchError);
  return;
}

btn.addEventListener('click', (e)=> {
  e.preventDefault();
  const fpass = first_password.value;
  const lpass = second_password.value;
  if (fpass !== "" && lpass !== "") {
    validatePass(fpass, lpass);
    return;
  } else {
    passError.style.display = 'block';
    alertError(passError, 'please fill all the fields...', '#c6340e');
    removeAlert(passError)
  }
})

function validatePass(pass1, pass2) {
  if (pass1 === pass2) {
    const password = pass1;
    console.log("success...")
    resetPss(password);
  } else {
    console.log('fail...')
    passError.style.display = 'block';
    alertError(passError, 'password do not match', '#f83735');
    removeAlert(passError);
  }
}
function resetPss(value) {
  users.forEach(user=> {
    if (userAcc.length > 0 && user === userAcc[0]) {
      user.password = value;
      user.lpassword = value;
      updatePass(users);
      window.location.pathname = 'index.html';
    }
  });
}


function updatePass(users) {
  localStorage.setItem('users',
    JSON.stringify(users));
}
function alertError(el, msg, col) {
  el.innerHTML = msg;
  el.style.color = col;
}
function removeAlert(el) {
  setTimeout(()=> {
    el.style.display = 'none';
    //  window.location.reload();
  },
    3000);
}
console.log(userAcc)
