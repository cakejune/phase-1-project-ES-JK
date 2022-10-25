const nameField = document.querySelector('#namevalue');
const emailField = document.querySelector('#emailvalue');
const phoneField = document.querySelector('#phonevalue');
const userForm = document.querySelector('form#totalform');
const newPersonData = document.querySelector('#newPerson');
const generateButton = document.querySelector('#generate');

function main() {
    fetch('http://localhost:3000/people')
    .then(res=> res.json())
    .then(peopleList => {
        console.log(peopleList.length);
    })
}

main();
userForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    // console.log(nameField.value);
    // console.log(emailField.value);
    // console.log(phoneField.value);
    fetch('http://localhost:3000/people',
    {
        'method': "POST",
        'headers': {
            "content-type": "application/json",
            "accept": "application/json"
        },
        'body': JSON.stringify(
            {name: nameField.value,
            email: emailField.value,
            'phone-number': phoneField.value}
            )
    }
    )
    .then(res=>res.json())
    .then(newData => {
        const nameInList = document.createElement('li');
        nameInList.textContent = newData.name;
        console.log(nameInList);
        newPersonData.append(nameInList);
    })
})
generateButton.addEventListener('click', (e)=>{
    fetch('http://localhost:3000/people')
    .then(res=>res.json())
    .then(peopleList => {
        console.log(`Submission Count: ${peopleList.length}.`);
        if(peopleList.length >= 10) {
            const newCrossword = document.createElement('table');
            const crosswordPicture = document.createElement('img');
            const buttonContainerSpan = document.querySelector('#buttonContainerSpan');
            crosswordPicture.src = "https://umbc.edu/wp-content/uploads/2021/05/crossword.jpg";
            buttonContainerSpan.append(crosswordPicture);
        }
        else {
            console.log('Not enough submissions');
        }
    })
});