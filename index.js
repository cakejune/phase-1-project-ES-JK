const nameField = document.querySelector('#namevalue');
const emailField = document.querySelector('#emailvalue');
const phoneField = document.querySelector('#phonevalue');
const userForm = document.querySelector('form#totalform');
const newPersonData = document.querySelector('#newPerson');
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