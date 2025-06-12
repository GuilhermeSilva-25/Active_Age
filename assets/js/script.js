var listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function cadastrar() {
  let nome = document.querySelector("#nome").value;
  let email = document.querySelector("#email").value;
  let login = document.querySelector("#login").value;
  let senha = document.querySelector("#senha").value;

  if (!nome || !senha || !email || !login) {
    alert("Preencha todos os campos.");
    return;
  }

  let user = {
    id: Date.now(),
    nome: nome,
    email: email,
    login: login,
    senha: senha,
  };

  listaUsuarios.push(user);
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
  window.location.href = "login.html";
  alert("Cadastro feito.");
}

function logar() {
  let usuarioEncontrado = false;
  let login = document.querySelector("#login-login").value;
  let senha = document.querySelector("#senha-login").value;
  let dados = JSON.parse(localStorage.getItem("usuarios"));

  for (let i = 0; i < dados.length; i++) {
    if (login == dados[i].login && senha == dados[i].senha) {
      sessionStorage.setItem("usuario_logado", dados[i].nome);
      window.location.href = "perfil.html";
      alert(`Bem vindo: ${dados[i].nome}`);
      usuarioEncontrado = true;
    }
  }

  if (!usuarioEncontrado) {
    alert("Login ou senha não encontrados!");
  }

  document.querySelector("#login").value = "";
  document.querySelector("#senha").value = "";
}

function verificar_se_logado() {
  if (sessionStorage.getItem("usuario_logado")) {
    return true;
  } else {
    return false;
  }
}

const link_login = document.getElementById("link_login");
const usuario = sessionStorage.getItem("usuario_logado");
if (usuario) {
  link_login.textContent = usuario;
  link_login.href = "#";
  link_login.onclick = () => {
    if (confirm(usuario + " você está logado, deseja sair?")) {
      deslogar();
    }
  };
}

function deslogar() {
  localStorage.removeItem("carrinho_superman");
  sessionStorage.removeItem("usuario_logado");
  window.location.href = "index.html";
  alert("Você foi desconectado.");
}
