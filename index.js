const userForm = document.querySelector("form#totalform");
const messagesForm = document.querySelector('form#messageForm');
const newPersonData = document.querySelector("#newPerson");
const generateButton = document.querySelector("#generate");
const formDivContainer = document.querySelector("div.form-style-3");
//lets grab our answers on our form
const nameField = document.querySelector("#namevalue");
const q1Answer = document.querySelector("input#q1value");
const q2Answer = document.querySelector("input#q2value");
const messageAnswer = document.querySelector('#messageValue');
const messageNameValue = document.querySelector('#messageNameValue');
const q3Answer = document.querySelector("select.select-field");
const quizForm = document.querySelector("form#quizForm");
const quizQ1Label = document.querySelector("#quizQ1"); //aray of questions
const questionUl = document.querySelector("#questions-list");
const submitAnswers = document.querySelector("#submit-answers");
const messagesContainer = document.querySelector("div#messages-container");

async function main() {
  messagesForm.addEventListener('submit', postUserMessage)
  userForm.addEventListener("submit", submitForm);
  generateButton.addEventListener("click", generateQuiz)
}

async function postUserMessage(submitFormEvent) {
  submitFormEvent.preventDefault();
  const resp = await fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({
      name: messageNameValue.value,
      messsage: messageAnswer.value
    }),
  });
  const receivedMessages = await resp.json();
  const messageReceived = await appendMessage(messageNameValue.value, messageAnswer.value);
}

function appendMessage(name, message) {
  const messageBox = document.createElement("div");
  messageBox.setAttribute("class", "message-box");
  const boxTop = document.createElement("div");
  boxTop.setAttribute("class", "box-top");
  const messageName = document.createElement("div");
  messageName.setAttribute("class", "message-name");
  const timeStamp = document.createElement("div");
  timeStamp.setAttribute("class", "time-stamp");
  const newMessage = document.createElement("div");
  newMessage.setAttribute("class", "message");

  messageName.textContent = name;
  newMessage.textContent = message;
  var dt = Date.now();
  timeStamp.textContent = `Epoch Time Stamp: ${dt}`;
  

  messagesContainer.appendChild(messageBox);
  messagesContainer.appendChild(newMessage);
  messageBox.appendChild(boxTop);
  boxTop.appendChild(messageName);
  boxTop.appendChild(timeStamp);
  messageBox.appendChild(newMessage);
}

async function submitForm(submitFormEvent) {
  submitFormEvent.preventDefault();
  const postForm = await fetch("http://localhost:3000/people", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      name: nameField.value.toLowerCase(),
      iceCream: q1Answer.value.toLowerCase(),
      season: q2Answer.value.toLowerCase(),
      teacher: q3Answer.value.toLowerCase(),
    }),
  });
  const formData = await postForm.json();
  alert("Thank you for submitting! Click the 'Generate Quiz' button below!");
}

async function generateQuiz(generateQuizEvent) {
  const quiz = await getQuiz();
  const quizInputs = renderQuiz(quiz);
  submitAnswers.addEventListener("click", (submitAnswersEvent) => {
    submitAnswersEvent.preventDefault();
    const correctAnswers = checkAnswers(quizInputs);
    alert(`You got ${correctAnswers} answers right!`);
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
        question: `What is ${person.name}'s favorite ice cream flavor?`,
        answer: person.iceCream, //add group here as a 3rd key-value pair to have multiple quiz's
      },
      {
        question: `What is ${person.name}'s favorite season of the year?`,
        answer: person.season,
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
    question.setAttribute("class", "populatedQuestion");
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
      inputField.style.fontWeight = "bolder";
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
// <div class="message-box">
//           <div class="box-top">
//             <div class="message-name">Elisa
//             </div>
//             <div class="time-stamp">3:52PM on 10/27/2022</div>
//           </div>
//           <div class="message">"I hate Jake, but I love this project."</div>
//         </div>

main();
