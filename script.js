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

    if (numeroCelular.length === 11) {
        showModal();
    } else {
        var celularError = document.getElementById("celularError");
        celularError.textContent = "Por favor, insira um número de celular válido.";
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

// Evento chamada input
document.getElementById("celular").addEventListener("input", function() {
    formatarNumeroTelefone(this);
});