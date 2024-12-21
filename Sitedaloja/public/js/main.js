// Obter o nome de usuário da sessão ou de outra fonte
const username = "JohnDoe";
document.getElementById("username").textContent = username;

// Adicionar evento de clique para o botão de logout
document.getElementById("logout-btn").addEventListener("click", () => {
  // Limpar a sessão ou qualquer informação de login
  localStorage.removeItem("loggedInUser");

  // Redirecionar o usuário para a página de login
  window.location.href = "/";
});
