const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configuração da sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret", // Use um segredo forte em produção
    resave: false,
    saveUninitialized: true,
  })
);

// Função para ler usuários do arquivo JSON
const readUsers = () => {
  const data = fs.readFileSync("./db/users.json");
  return JSON.parse(data);
};

// Rota para ler o arquivo JSON
app.get("/dados-produtos", (req, res) => {
  fs.readFile(path.join("db", "produtos.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler o arquivo JSON");
    }
    res.json(JSON.parse(data));
  });
});

// Rota para exibir o formulário de login
app.get("/", (req, res) => {
  res.render("login");
});

// Rota para registrar usuario
app.get("/register", (req, res) => {
  res.render("register");
});

// Rota para logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

// Rota para login
app.post("/login", async (req, res) => {
  const { username, password, email } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.username === username || u.email === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user; // Armazena o usuário na sessão
    if (user.role === "admin") {
      res.render("admin");
    } else {
      res.render("result", {
        message: "Login bem-sucedido!",
        role: user.role,
      });
    }
  } else {
    res.render("result", {
      message: "Usuário ou senha inválidos!",
      role: null,
    });
  }
});

// Rota para registro de usuário
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const users = readUsers();

  // Verifica se o usuário já existe
  if (users.find((u) => u.username === username)) {
    return res.render("result", {
      message: "Usuário já existe!",
      role: null,
    });
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Adiciona o novo usuário com role padrão "user"
  users.push({ username, password: hashedPassword, role: "user", email });
  fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

  res.render("result", {
    message: "Registro bem-sucedido!",
    role: null,
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
