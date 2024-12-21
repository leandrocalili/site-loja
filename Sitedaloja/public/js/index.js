fetch("/dados-produtos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados");
    }
    return response.json();
  })
  .then((data) => {})
  .catch((error) => {
    console.error("Erro:", error);
  });

// Exibir a lista de usuários
const userList = document.getElementById("user-list");
users.forEach((user) => {
  const li = document.createElement("li");
  li.textContent = `${user.username} (${user.email})`;
  userList.appendChild(li);
});

// Adicionar evento de clique para o botão de logout
document.getElementById("logout-btn").addEventListener("click", () => {
  // Limpar a sessão ou qualquer informação de login
  localStorage.removeItem("loggedInUser");

  // Redirecionar o usuário para a página de login
  window.location.href = "/";
});

// Adicionar evento de clique para o botão de deletar usuário
const deleteUserBtn = document.getElementById("delete-user-btn");
deleteUserBtn.addEventListener("click", () => {
  // Obter o índice do usuário selecionado
  const selectedIndex = Array.from(userList.children).findIndex((li) =>
    li.classList.contains("selected")
  );

  if (selectedIndex !== -1) {
    // Remover o usuário da lista
    users.splice(selectedIndex, 1);

    // Atualizar a lista de usuários
    userList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.username} (${user.email})`;
      userList.appendChild(li);
    });
  } else {
    alert("Please select a user to delete.");
  }
});

// Adicionar evento de envio do formulário de criação de usuário
const createUserForm = document.getElementById("create-user-form");
createUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newUsername = document.getElementById("new-username").value;
  const newEmail = document.getElementById("new-email").value;

  // Criar um novo usuário
  const newUser = { id: users.length + 1, username: newUsername, email: newEmail };
  users.push(newUser);

  // Atualizar a lista de usuários
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.username} (${user.email})`;
    userList.appendChild(li);
  });

  // Limpar os campos de entrada
  document.getElementById("new-username").value = "";
  document.getElementById("new-email").value = "";
});

// Adicionar evento de clique para selecionar um usuário na lista
userList.addEventListener("click", (event) => {
  // Remover a seleção anterior
  const selectedLi = userList.querySelector(".selected");
  if (selectedLi) {
    selectedLi.classList.remove("selected");
  }

  // Selecionar o usuário clicado
  event.target.classList.add("selected");
});
