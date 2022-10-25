
const userForm = document.querySelector("form#totalform");
const newPersonData = document.querySelector("#newPerson");
const generateButton = document.querySelector("#generate");
const formDivContainer = document.querySelector("div.form-style-3");
//lets grab our answers on our form
const nameField = document.querySelector("#namevalue");
const q1Answer = document.querySelector('input#q1value');
const q2Answer = document.querySelector('input#q2value');
const q3Answer = document.querySelector('select.select-field');
const quizForm = document.querySelector('form#quiz');
const quizQ1Label = document.querySelector('#quizQ1');

function main() {
  fetch("http://localhost:3000/people")
    .then((res) => res.json())
    .then((peopleList) => {
      console.log(peopleList.length);
    });
}

main();
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/people", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      name: nameField.value,
      color: q1Answer.value,
      animal: q2Answer.value,
      teacher: q3Answer.value,
    }),
  })
    .then((res) => res.json())
    .then((newData) => {
      const nameInList = document.createElement("li");
      nameInList.textContent = newData.name;
      console.log(nameInList);
      newPersonData.append(nameInList);
    });
});
generateButton.addEventListener("click", (e) => {
  fetch("http://localhost:3000/people")
    .then((res) => res.json())
    .then((peopleList) => {
      console.log(`Submission Count: ${peopleList.length}.`);
      if (peopleList.length >= 10) {
        formDivContainer.style.display = "none";
        const newCrossword = document.createElement("table");
        const crosswordPicture = document.createElement("img");
        const buttonContainerSpan = document.querySelector(
          "#buttonContainerSpan"
        );
        crosswordPicture.src =
          "https://umbc.edu/wp-content/uploads/2021/05/crossword.jpg";
        buttonContainerSpan.append(crosswordPicture);
      } else {
        console.log("Not enough submissions");
      }
    //   quizQ1Label.textContent = `What is ${peopleList[0].name}'s favorite color?`;
      formDivContainer.style.display = 'none';
    });
});

function generateQuestions(arrayOfPeople) {
  return "a list of questions";
}

function populateQuestions(questions) {
  const quizDiv = document.createElement("div");
  quizDiv.setAttribute("class", "quiz");
  const quizSubmitButton = document.createElement("button");
  quizSubmitButton.setAttribute("class", "quiz");
  quizSubmitButton.addEventListener('click', (e) => {
    //push the form answers, check them against the real answers, spit out a result

  })
}


function showResult() {
}
