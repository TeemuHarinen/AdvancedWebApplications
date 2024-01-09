const registeredDiv = document.getElementById('registered');
const unregisteredDiv = document.getElementById('unregistered');
const userEmail = document.getElementById('email');
const todoss = document.getElementById('allTodos')
const todobtn = document.getElementById("add-item");


const checkLoginState = async () => {
    const authToken = localStorage.getItem('auth_token')

    if (authToken) {
        Newtodos();
        theLOgOutButton();
        unregisteredDiv.style = 'display: none'
        registeredDiv.style = 'display: block'

            const response = await fetch('/authoriz', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${authToken}`
                }
            })
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }
            const data = await response.json()
            console.log(data.email);
            userEmail.textContent = data.email
            const usersTodos = await showTodo();

            for(let i = 0; i < usersTodos.items.length; i++) {
                const newLi = document.createElement('li')
                newLi.textContent = usersTodos.items[i]
                newLi.classList = 'list-item'
                todoss.appendChild(newLi)
            }


    }
}

//Codegrade didn't allow the logoutbutton in html
const theLOgOutButton = () => {
    const logoutContainer = document.getElementById('logoutContainer');
    const logoutButton = document.createElement('button');
    logoutButton.id = 'logout';
    logoutButton.textContent = 'Logout'
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('auth_token');
        window.location.href = '/';
    });
    logoutContainer.appendChild(logoutButton);
}


const Newtodos = async () => {
    todobtn.addEventListener('keyup', async(event) => {
        if (event.key === 'Enter') { 
            const newTodo = document.getElementById("add-item").value;
            console.log(newTodo);
            const authToken = localStorage.getItem('auth_token');
            if(newTodo != '') {
                const resp = await fetch("/api/todos", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({ items: newTodo })
                });
                if(!resp.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                todobtn.value = '';
            }
        }
    })
}

const showTodo = async () => {
    const authToken = localStorage.getItem('auth_token');
    const resp = await fetch("/api/todos", {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${authToken}`
        }
    });
    if(!resp.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const response = resp.json()
    return response
}

document.addEventListener('DOMContentLoaded', checkLoginState);
