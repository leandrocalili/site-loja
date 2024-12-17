
const items = [
  { 
    name: "Camisa Básica", 
    price: "R$ 49,90", 
    image: "https://i.pinimg.com/736x/14/b8/c2/14b8c21b2f67e0255a3c865f2c95b230.jpg", 
    details: [
      "https://via.placeholder.com/200", "https://via.placeholder.com/200", 
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200",  "https://via.placeholder.com/200",
    ],
    
    description: "Camisa de algodão confortável para o dia a dia.",
    sizes: ["P", "M", "G", "GG"]
  },
  { 
    name: "Calça Jeans", 
    price: "R$ 119,90", 
    image: "https://i.pinimg.com/736x/f5/23/b9/f523b9629f72af386acc59b0bc50c5b5.jpg", 
    details: [
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200"
    ],
    description: "Calça jeans clássica, ideal para diversas ocasiões.",
    sizes: ["36", "38", "40", "42"]
  },

  { 
    name: "Camisas de time", 
    price: "R$ 119,90", 
    image: "https://i.pinimg.com/736x/83/e2/6f/83e26f6b28d61f5a3209b197902afaf3.jpg", 
    details: [
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200",  "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200",  "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200",  "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://via.placeholder.com/200", "https://via.placeholder.com/200",
      "https://i.pinimg.com/736x/e3/09/6e/e3096e27c62dce0b4e68e310a15b0d86.jpg", "https://via.placeholder.com/200",
      
    ],
    description: "Camisas de time para voce torcedor apaixonado",
    sizes: ["P", "M", "G", "GG"]
  },
  // Adicione mais produtos conforme necessário
];

document.addEventListener("DOMContentLoaded", () => {
  // Renderizar os itens na galeria
  function renderGallery(items) {
    const gallery = document.querySelector(".gallery");

    items.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("gallery-item");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="view-details" data-index="${index}">Ver Mais</button>
      `;

      gallery.appendChild(div);
    });
  }

  // Abrir modal com detalhes do produto
  function openModal(item) {
    const modal = document.getElementById("detailsModal");
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
      <span class="close" id="closeModal">&times;</span>
      <h2>${item.name}</h2>
      <p><strong>Preço:</strong> ${item.price}</p>
      <p><strong>Descrição:</strong> ${item.description}</p>
      <p><strong>Tamanhos disponíveis:</strong> ${item.sizes.join(", ")}</p>
      <div class="details-images">
        <h3>Imagens do Produto</h3>
        ${item.details.map(img => `<img src="${img}" alt="Detalhe de ${item.name}" class="detail-image">`).join("")}
      </div>
    `;
    modal.style.display = "flex";

    // Fechar modal
    document.getElementById("closeModal").onclick = () => {
      modal.style.display = "none";
    };
  }

  // Adicionar evento ao botão "Ver Mais"
  document.querySelector(".gallery").addEventListener("click", (e) => {
    if (e.target.classList.contains("view-details")) {
      const index = e.target.getAttribute("data-index");
      openModal(items[index]);
    }
  });

  renderGallery(items);
// Adiciona uma imagem de fundo ao body usando JavaScript
document.body.style.backgroundImage = "url('https://i.pinimg.com/736x/e0/81/6a/e0816ab72c8d7413714d8b83315af83a.jpg')"; // Substitua pelo link desejado
document.body.style.backgroundSize = "cover"; // Ajusta a imagem para cobrir toda a tela
document.body.style.backgroundPosition = "center 200px"; // Centraliza a imagem
document.body.style.backgroundRepeat = "no-repeat"; // Evita repetição


});