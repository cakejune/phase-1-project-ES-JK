const userForm = document.querySelector("form#totalform");
const newPersonData = document.querySelector("#newPerson");
const generateButton = document.querySelector("#generate");
const formDivContainer = document.querySelector("div.form-style-3");
//lets grab our answers on our form
const nameField = document.querySelector("#namevalue");

const q1Answer = document.querySelector("input#q1value");
const q2Answer = document.querySelector("input#q2value");
const q3Answer = document.querySelector("select.select-field");
const quizForm = document.querySelector("form#quizForm");
const quizQ1Label = document.querySelector("#quizQ1"); //aray of questions
const questionUl = document.querySelector("#questions-list");
const submitAnswers = document.querySelector("#submit-answers");

async function main() {
  generateButton.addEventListener("click", generateQuiz);
}

async function generateQuiz(generateQuizEvent) {
  const quiz = await getQuiz();
  const quizInputs = renderQuiz(quiz);
  submitAnswers.addEventListener("click", (submitAnswersEvent) => {
    submitAnswersEvent.preventDefault();
    const correctAnswers = checkAnswers(quizInputs);
    console.log(`You got ${correctAnswers} answers right!`);
  });
}

async function getQuiz() {
  const resp = await fetch("http://localhost:3000/people");
  const submissions = await resp.json();
  const QnAs = [];
  const selectedQnAs = [];
  for (const person of submissions) {
    QnAs.push(
      {
        question: `What is ${person.name}'s favorite color?`,
        answer: person.color, //add group here as a 3rd key-value pair to have multiple quiz's
      },
      {
        question: `What is ${person.name}'s favorite animal?`,
        answer: person.animal,
      },
      {
        question: `Who is ${person.name}'s favorite teacher?`,
        answer: person.teacher,
      }
    );
  }

  for (let i = 0; i < 10; i++) {
    //get 10 random QnAs from the array I created above (QnAs) and adding them to a new array (selectedQnAs)
    const index = Math.floor(Math.random() * (QnAs.length - 1));
    selectedQnAs.push(QnAs[index]);
    QnAs.splice(index, 1);
  }

  return selectedQnAs;
}

function renderQuiz(arrayOfQuestionsAndAnswers) {
  while (questionUl.firstChild) {
    questionUl.removeChild(questionUl.firstChild);
  }
  const allInputs = [];

  arrayOfQuestionsAndAnswers.forEach((singleQnA) => {
    const question = document.createElement("li");
    question.setAttribute('class','populatedQuestion');
    const questionInput = document.createElement("input");
    questionInput.setAttribute("answer", singleQnA.answer);
    question.textContent = singleQnA.question;
    questionUl.appendChild(question);
    question.appendChild(questionInput);
    allInputs.push(questionInput);
  });

  return allInputs;
}

function checkAnswers(quizInputs) {
  let correctAnswers = 0;
  for (const inputField of quizInputs) {
    if (
      inputField.attributes.answer.value.toLowerCase() ===
      inputField.value.toLowerCase()
    ) {
      inputField.style.color = "green";
      correctAnswers++;
    } else {
      inputField.style.color = "red";
    }
  }
  return correctAnswers;
}

function RestrictSpace() {
  if (event.keyCode == 32) {
    return false;
  }

}

document.querySelectorAll('group','no-spaces').forEach((element)=> element.on({
  keydown: function(e) {
    if (e.which === 32)
    return false;
  },
  change: function() {
    this.value = this.value.replace(/\s+/g
  }


main();

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if(fghjkjhgfrgb) {
  fetch("http://localhost:3000/people",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      name: nameField.value.toLowerCase(),
      color: q1Answer.value.toLowerCase(),
      animal: q2Answer.value.toLowerCase(),
      teacher: q3Answer.value.toLowerCase(),
    }),
  })
}

    .then((res) => res.json())
    .then((newData) => {
      console.log(newData);
    });
});

// generateButton.addEventListener("click", (e) => {

//     fetch("http://localhost:3000/people")
//     .then((res) => res.json())
//     .then((listOfPeople) => {
//         if(listOfPeople.length >= 25) {
//             renderQuiz(quiz);
//         }
//       //   if (peopleList.length >= 25) {
//       //     //THIS IS WHERE WE BUILD THE QUIZ ELISA AND CONNOR
//       //     formDivContainer.style.display = "none";
//       //     const newCrossword = document.createElement("table");
//       //     const crosswordPicture = document.createElement("img");
//       //     const buttonContainerSpan = document.querySelector(
//       //       "#buttonContainerSpan"
//       //     );
//       //     crosswordPicture.src =
//       //       "https://1.bp.blogspot.com/-XJJhIqBrLbg/Vd7TXWcxtmI/AAAAAAAAGdc/sK2h1V2_gOc/s1600/Jo%2Bquiz.PNG";
//       //     buttonContainerSpan.append(crosswordPicture);

//       //     // THIS IS WHERE WE BUILD THE QUIZ ^^^^
//       //   } else {
//       //     //TELL THE USER THAT WE CAN'T GENERATE A QUIZ UNTIL WE HAVE MORE SUBMISSIONS!

//       //     console.log("Not enough submissions");
//       //   }
//       for (let i = 0; i < listOfPeople.length; i++) {
//         const newQuestion = document.createElement("li");
//         newQuestion.setAttribute("data-id", listOfPeople[i].id);
//         newQuestion.textContent = `What is ${listOfPeople[i].name}'s favorite color?`;
//         console.log(newQuestion);
//       }
//       // Elisa's code below
//       // questions.forEach((eachQuestion) => {
//       //   for (let i = 0; i < listOfPeople.length; i++) {
//       //     eachQuestion.setAttribute('data-id', listOfPeople[i].id);
//       //     eachQuestion.setAttribute('group', 'populatedQuestion');
//       //   }
//       if (eachQuestion.id) {
//         eachQuestion.textContent = `what is ${listOfPeople[0]}'s favorite color?`;
//         eachQuestion.setAttribute("data-id", listOfPeople[0].id);
//       } else {
//         eachQuestion.style.display = "none";
//       }
//       // });
//     });
// });

// function generateQuestions(arrayOfPeople) {
//   return "a list of questions";
// }

// function populateQuestions(questions) {
//   const quizDiv = document.createElement("div");
//   quizDiv.setAttribute("class", "quiz");
//   const quizSubmitButton = document.createElement("button");
//   quizSubmitButton.setAttribute("class", "quiz");
//   quizSubmitButton.addEventListener('click', (e) => {
//     //push the form answers, check them against the real answers, spit out a result

//   })
// }

// function showResult() {
// }
