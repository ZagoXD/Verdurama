var userList = [];
var count=1

function addUser(name, email) {
  var currentDate = new Date().toLocaleDateString(); // Obtém a data atual
  var newUser = { id: count++, name: name, email: email, date: currentDate }; // Adiciona a data ao novo usuário
  userList.push(newUser); 
  localStorage.setItem('userList', JSON.stringify(userList));
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

  var usersToRender = users || userList; // Se não for fornecida uma lista de usuários, use a lista completa

  usersToRender.forEach(function (user) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<div class="itemList"> <span class="user-name">' + user.name + '</span> Email: ' + user.email + ' Data de Cadastro: ' + user.date + '<button class="deleteButton" onclick="deleteUser(' + user.id + ')">Excluir</button></div>';
    //listItem.innerHTML = '<div class="itemList"> Data de Cadastro: ' + user.date + ' <span class="user-name">' + user.name + '</span> Email: ' + user.email + '<button class="deleteButton" onclick="deleteUser(' + user.id + ')">Excluir</button></div>';
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

function clearFields(){
  document.getElementById('nameInput').value = '';
  document.getElementById('emailInput').value = '';
}

document.getElementById('deleteAllButton').addEventListener('click', function() {
  // Limpa a lista de usuários
  userList = [];
  count = 1
  localStorage.setItem('userList', JSON.stringify(userList));
  // Renderiza a lista de usuários vazia
  renderUserList(userList);
});

document.getElementById('searchInput').addEventListener('input', function(event) {
  var searchValue = event.target.value.trim().toLowerCase(); // Obtém o valor digitado e converte para minúsculas
  var filteredUsers = userList.filter(function(user) {
    return user.name.toLowerCase().includes(searchValue); // Filtra os usuários com base no nome
  });
  renderUserList(filteredUsers); // Renderiza a lista filtrada de usuários
});