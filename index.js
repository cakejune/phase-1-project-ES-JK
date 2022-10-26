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
const questionUl = document.querySelector('#questions-list');

async function main() {
  const quiz = await getQuiz();
  generateButton.addEventListener('click', () => {
    renderQuiz(quiz);
  })
    }


async function getQuiz() {
  const resp = await fetch("http://localhost:3000/people");
  const submissions = await resp.json();
  const QnAs = [];
  for (const person of submissions) {
    QnAs.push(
      {
        question: `What is ${person.name}'s favorite color?`,
        answer: person.color,
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
  return QnAs;
}

function renderQuiz(arrayOfQuestionsAndAnswers) {
    if(arrayOfQuestionsAndAnswers.length >= 25) {
    arrayOfQuestionsAndAnswers.forEach((qna)=>{
        const question = document.createElement('li');
        const questionInput = document.createElement('input');
        question.textContent = qna.question;
        questionUl.appendChild(question, questionInput);
        
    });
}
else {
    console.log("Not enough submissions.");
}
  // create questions based on the data
//   for (const qnapair of QnAs){
//     //create element
//     //make element's contents = question in the object
//     //assign this to a constant
//   }

}
// function writeQuestions(person, key) {

// }

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

function checkAnswer(inputField, actualAnswer) {
  //does q1 answer === listOfPeople[q1.getAttribute('data-id')].color?
  Q1.id;
  score = score + 1;
  return `You got ${score} answers right`;
  if (q1_val.value === name) return "Congratulations, your answer is correct";
  else return "Your answer is incorrect. Please try again";
}

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
