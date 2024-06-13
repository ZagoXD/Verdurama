// função modal
function showModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "flex";
    var countdownElement = document.getElementById("countdown");
    var countdown = 3;
    var countdownInterval = setInterval(function() {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            window.location.href = "login.html";
        }
    }, 1000);
}

// evento de clicar no submit
document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var celularInput = document.getElementById("celular");
    var numeroCelular = celularInput.value.replace(/\D/g, '');

    var senhaInput = document.getElementById("senha");
    var confirmarSenhaInput = document.getElementById("confirmarSenha");

    var celularError = document.getElementById("celularError");
    var confirmarSenhaError = document.getElementById("confirmarSenhaError");

    // Limpar mensagens de erro anteriores :)
    celularError.textContent = "";
    confirmarSenhaError.textContent = "";

    // Verificar se os números de celular e senhas são válidos
    if (numeroCelular.length !== 11) {
        celularError.textContent = "Por favor, insira um número de celular válido.";
    } 
    if (senhaInput.value !== confirmarSenhaInput.value) {
        confirmarSenhaError.textContent = "As senhas não coincidem.";
    } 
    if (numeroCelular.length === 11 && senhaInput.value === confirmarSenhaInput.value) {
        showModal();
    } 
});

// input senha
var senhaInput = document.getElementById("senha");
var confirmarSenhaInput = document.getElementById("confirmarSenha");
var confirmarSenhaError = document.getElementById("confirmarSenhaError");


// Limpar erro se senha === confirmar senha
senhaInput.addEventListener("input", function() {
    if (senhaInput.value === confirmarSenhaInput.value) {
        confirmarSenhaError.textContent = "";
    }
});
confirmarSenhaInput.addEventListener("input", function() {
    if (senhaInput.value === confirmarSenhaInput.value) {
        confirmarSenhaError.textContent = "";
    }
});

// Função para formatar o número de telefone
function formatarNumeroTelefone(input) {
    var numero = input.value.replace(/\D/g, '');

    if (numero.length >= 2) {
        numero = '(' + numero.substring(0, 2) + ')' + numero.substring(2);
    }
    if (numero.length > 3 ) {
        numero = numero.substring(0, 4) + ' ' + numero.substring(4);
    }
    if (numero.length > 10) {
        numero = numero.substring(0, 10) + '-' + numero.substring(10);
    }

    input.value = numero;
}

// Limpar erro celular
document.getElementById("celular").addEventListener("input", function() {
    var celularError = document.getElementById("celularError");
    celularError.textContent = ""; 

    formatarNumeroTelefone(this);
});

var userList = [];
var count = 1;

function addUser(name, email) {
  var newUser = { id: count++, name: name, email: email };
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

function renderUserList() {
  var userListElement = document.getElementById('userList');
  userListElement.innerHTML = '';

  userList.forEach(function (user) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="user-name">' + user.name + '</span> Email: ' + user.email + '<button class="deleteButton" onclick="deleteUser(' + user.id + ')">Excluir</button>';
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
