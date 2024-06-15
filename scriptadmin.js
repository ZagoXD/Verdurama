var userList = [];
var count = parseInt(localStorage.getItem('lastId')) || 1; // Inicializa o count com o valor salvo no localStorage ou 1

function addUser(name, email) {
    var currentDate = new Date().toLocaleDateString();
    var newUser = { id: count++, name: name, email: email, date: currentDate };
    userList.push(newUser);
    localStorage.setItem('userList', JSON.stringify(userList));
    localStorage.setItem('lastId', count); // Salva o último ID no localStorage
    renderUserList();
}

function deleteUser(userId) {
    var updatedUserList = userList.filter(function (user) {
        return user.id !== userId;
    });

    if (updatedUserList.length < userList.length) {
        userList = updatedUserList;
        localStorage.setItem('userList', JSON.stringify(userList));
        renderUserList();
    } else {
        alert('Usuário não encontrado.');
    }
}

function getUserList() {
    var storedList = JSON.parse(localStorage.getItem('userList'));
    userList = storedList || [];
}

function renderUserList(users) {
    var userListElement = document.getElementById('userList');
    userListElement.innerHTML = '';

    var usersToRender = users || userList;

    usersToRender.forEach(function (user) {
        var listItem = document.createElement('li');
        listItem.innerHTML = '<div class="itemList"> <span class="user-name">' + user.name + '</span> <span><span class= "email"> Email: </span>' + user.email + '</span><span><span class = "data-cadastro"> Data de Cadastro: </span>' + user.date + '</span><button class="deleteButton" onclick="deleteUser(' + user.id + ')">Excluir</button></div>';
        userListElement.appendChild(listItem);
    });
}

getUserList();
renderUserList();

document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var nameInput = document.getElementById('nameInput');
    var emailInput = document.getElementById('emailInput');
    addUser(nameInput.value, emailInput.value);
    nameInput.value = '';
    emailInput.value = '';
});

function clearFields() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
}

document.getElementById('deleteAllButton').addEventListener('click', function () {
    userList = [];
    count = 1;
    localStorage.setItem('userList', JSON.stringify(userList));
    localStorage.setItem('lastId', count); // Reseta o último ID no localStorage
    renderUserList(userList);
});

document.getElementById('searchInput').addEventListener('input', function (event) {
    var searchValue = event.target.value.trim().toLowerCase();
    var filteredUsers = userList.filter(function (user) {
        return user.name.toLowerCase().includes(searchValue);
    });
    renderUserList(filteredUsers);
});