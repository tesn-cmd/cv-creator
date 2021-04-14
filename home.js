const btn = document.getElementById('logout');
const greet = document.querySelector('.greet');
const edit = document.querySelector('#edit');
const save = document.querySelector('#save');
const editSave = document.querySelector('.docs');
const imgSrc = document.querySelector('#imgOutput');
const aboutMe = document.querySelector('#personal');
const myTable = document.querySelector('.my-table');
const experience = document.querySelector('#experience');
const institution = document.querySelector('#institution');
const qualification = document.querySelector('#qualifications');
const years = document.querySelector('#years');
const hobbies = document.querySelector('#hobbies');
const button = document.querySelector('#submit');
const portfolio = document.querySelector('.cv');
const otherInfo = document.querySelector('#other-info');
const title = document.querySelector('#title');
const bottom = document.querySelector('.bottom');
const loginError = document.querySelector('.loginError');
const aboutOutput = document.querySelector('#about');
const experienceOutput = document.querySelector('#exp-output');
const resultsOutput = document.querySelector('#res-output');
const hobbyOutput = document.querySelector('#hob-output');

let people = localStorage.getItem('users');
users = JSON.parse(people);
active = [];
prevPic = [];

//greet and fill personal details
function greetUser() {
  if (users) {
    users.forEach(user=> {
      if (user.isLoggedIn === true) {
        active.push(user);
        greet.innerHTML = `<div class="welcome">Hi <span class="span">${user.firstName} ${user.lastName} </span></div>`;
        myTable.innerHTML = `
        <tr class="personal-details">
        <th>Personal Details</th>
        </tr>
        <tr>
        <th>firstName</th>
        <td>: ${user.firstName}</td>
        </tr>
        <tr>
        <th>lastName</th>
        <td>: ${user.lastName}</td>
        </tr>
        <tr>
        <th>birthDate</th>
        <td>: ${user.dateOfBirth}</td>
        </tr>
        <tr>
        <th>gender</th>
        <td>: ${user.gender}</td>
        </tr>
        <tr>
        <th>nationality</th>
        <td>: ${user.nationality}</td>
        </tr>
        <tr>
        <th>email</th>
        <td>: ${user.email}</td>
        </tr>
        <tr>
        <th>contacts</th>
        <td >: ${user.contacts}</td>
        </tr>
        `;
      }
    });
  }
}
greetUser();

document.getElementById('file').addEventListener('change',
  (event)=> {
    const file = event.target.files[0];
    document.getElementById('imgDetails').innerHTML = file.name;
    const reader = new FileReader();
    reader.onloadend = ()=> {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      active.push(base64String);
    };
    reader.readAsDataURL(file);
  });

button.addEventListener('click',
  myForm);
//validate and fill the form
function myForm(e) {
  e.preventDefault();
  console.log(active);
  if (aboutMe.value !== "" &&
    experience.value !== "" &&
    institution.value !== "" &&
    qualification.value !== "" &&
    hobbies.value !== "" &&
    years.value !== "") {
    const dataValue = {
      isActive: true,
      image: active[1],
      aboutMe: aboutMe.value,
      experience: experience.value,
      results: {
        institution: institution.value,
        qualification: qualification.value,
        years: years.value
      },
      hobbies: hobbies.value.split(",")
    };
    users.forEach(user=> {
      if (user.isLoggedIn === true) {
        user.portFolio = dataValue;
        storeUser(users);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  }
}
//save in localStorage
function storeUser(users) {
  if (localStorage.getItem('users') === "") {
    users = [];
  }
  localStorage.setItem('users', JSON.stringify(users));
  displayValue(users);
}

//get from localStorage
function retrieveData() {
  const storedData = localStorage.getItem('users');
  if (storedData) {
    users = JSON.parse(storedData);
  }
}
//display the CV
function displayValue(values) {
  values.forEach(value=> {
    if (value.isLoggedIn === true && value.portFolio !== "") {
      value.portFolio.isActive = true;
      imgSrc.src = `data:image/png;base64,${value.portFolio.image}`;
      aboutOutput.innerHTML = value.portFolio.aboutMe;
      experienceOutput.innerHTML = value.portFolio.experience;
      resultsOutput.innerHTML = `
      <tr>
      <th>institution</th>
      <th>program</th>
      <th>year</th>
      </tr>
      <tr>
      <td>${value.portFolio.results.institution}</td>
      <td>${value.portFolio.results.qualification}</td>
      <td>${value.portFolio.results.years}</td>
      </tr>
      `;
      value.portFolio.hobbies.forEach((hobby, index)=> {
        let output = `
        <li id=${index} class="hobby">=>${hobby}<li>
        `;
        hobbyOutput.innerHTML += output;
      });
      otherInfo.style.display = "none";
      editSave.style.display = "block";
      portfolio.style.display = "flex";
      return;
    }
  });
}
//display CV when page loads if user has already created CV
function showForm() {
  if (users) {
    users.forEach(user=> {
      if (user.isLoggedIn === true && user.portFolio !== "") {
        displayValue(users);
        return;
      }
    });
  }
}
//
//editing CV
edit.addEventListener('click', (e)=> {
  const tds = document.querySelectorAll('td');
  const Hobbies = document.querySelectorAll('.hobby');
  //get each table data
  tds.forEach((td)=> {
    td.setAttribute('contenteditable', 'true');
    tds[0].focus();
  });
  Hobbies.forEach(hobby=> {
    hobby.setAttribute('contenteditable', 'true');
  });
  aboutOutput.setAttribute('contenteditable',
    'true');
  experienceOutput.setAttribute('contenteditable',
    'true');

});

//edit image
imgOutput.addEventListener('click', ()=> {
  const input = document.createElement('input');
  const section = document.querySelector('.section');
  const label = document.createElement('label');
  label.setAttribute('for',
    'file');
  label.setAttribute('class',
    'file');
  label.innerHTML = 'please click here to select image, then save';
  input.type = 'file';
  input.style.display = 'none';
  section.insertBefore(input,
    myTable);
  section.insertBefore(label,
    input);
  section.removeChild(imgOutput);
  input.addEventListener('change',
    (e)=> {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = ()=> {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        active.push(base64String);
      }
      reader.readAsDataURL(file);
    });
});
//removeEdit
function removeEdit() {
  const tds = document.querySelectorAll('td');
  const Hobbies = document.querySelectorAll('.hobby');

  tds.forEach(td=> {
    td.setAttribute('contenteditable',
      'false');
  });
  Hobbies.forEach(hobby=> {
    hobby.setAttribute('contenteditable',
      'false');
  });
  aboutOutput.setAttribute('contenteditable',
    'false');
  experienceOutput.setAttribute('contenteditable',
    'false');
}

//save edited CV
save.addEventListener('click', ()=> {
  const tds = document.querySelectorAll('td');
  const Hobbies = document.querySelectorAll('.hobby');
  Hobbies.forEach(hobby=> {
    // updateHobbies(hobby);
    // console.log(hobby)
  })

  users.forEach(user=> {
    //create image to replace previous one
    const img = document.createElement('img');
    img.setAttribute('id', 'imgOutput');
    img.setAttribute('class', 'imgOutput')
    img.height = 250;
    img.width = 250;
    removeEdit();
    if (user.isLoggedIn === true) {
      let text = [];
      //add image to the prevPic array
      prevPic.push(user.portFolio.image);
      //check if there is a chosen image
      if (active.length > 1) {
        user.portFolio.image = active[1]
        img.src = `data:image/png;base64,${user.portFolio.image}`;
      } else {
        //if no chosen image upload previous one
        user.portFolio.image = prevPic[0]
        img.src = `data:image/png;base64,${user.portFolio.image}`;
      }
      //get each table data
      tds.forEach((td, index)=> {
        //push all table data values to the text array
        text.push(td.innerHTML);
      });

      //update the table data values
      user.firstName = text[0].replace(':', "").trim().trim();
      user.lastName = text[1].replace(':', "").trim();
      user.dateOfBirth = text[2].replace(':', "").trim();
      user.gender = text[3].replace(':', "").trim();
      user.nationality = text[4].replace(':', "").trim();
      user.email = text[5].replace(':', "").trim();
      user.contacts = text[6].replace(':', "").trim();
      user.portFolio.results.institution = text[7].replace(':', "").trim();
      user.portFolio.results.qualification = text[8].replace(':', "").trim();
      user.portFolio.results.years = text[9].replace(':', "").trim();
      user.portFolio.aboutMe = aboutOutput.innerHTML;
      user.portFolio.experience = experienceOutput.innerHTML;
      storeUser(users)

      //refresh the page to update the UI
      window.location.reload();
    }
  })
})

//logout event handler
btn.addEventListener('click',
  ()=> {
    for (let i = 0; i < users.length; i++) {
      if (users[i].isLoggedIn === true) {
        users[i].isLoggedIn = false;
        localStorage.setItem('users', JSON.stringify(users));
        users[i].portFolio.isActive = false;
        storeUser(users)
        document.location.pathname = 'index.html';
      }
    }
  });
function checkValue(arr) {
  if (arr.length < 1) {
    console.log(arr)
    loginError.style.display = "block";
    otherInfo.style.display = "none";
    editSave.style.display = "none";
    title.style.display = "none";
    bottom.style.display = "none";
    document.location.pathname = "index.html";
  }
}
console.log(users);
retrieveData();
checkValue(active);