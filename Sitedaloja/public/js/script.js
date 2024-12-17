document.addEventListener("DOMContentLoaded", () => {
  // Carregar os itens de produtos de forma assíncrona
  fetch("public/js/produtos.json") // Caminho do arquivo JSON
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o arquivo JSON");
      }
      return response.json(); // Converter a resposta para JSON
    })
    .then((items) => {
      console.log("Dados carregados:", items); // Manipule os dados aqui

      // Renderizar os itens na galeria
      function renderGallery(items) {
        const gallery = document.querySelector(".gallery");

        items.forEach((item, index) => {
          const div = document.createElement("div");
          div.classList.add("gallery-item");
          div.innerHTML = `
            <div class="div-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
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
            ${item.details
              .map((img) => `<img src="${img}" alt="Detalhe de ${item.name}" class="detail-image">`)
              .join("")}
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

      // Chamar a função para renderizar a galeria
      renderGallery(items);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });

  // Adiciona uma imagem de fundo ao body usando JavaScript
  document.body.style.backgroundImage =
    "url('https://i.pinimg.com/736x/e0/81/6a/e0816ab72c8d7413714d8b83315af83a.jpg')"; // Substitua pelo link desejado
  document.body.style.backgroundSize = "cover"; // Ajusta a imagem para cobrir toda a tela
  document.body.style.backgroundPosition = "center -800px"; // Centraliza a imagem
  document.body.style.backgroundRepeat = "no-repeat"; // Evita repetição
});
