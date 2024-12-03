document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  // Adiciona a classe 'loaded' após 1 segundo
  setTimeout(() => {
    body.classList.add("loaded");
  }, 1000);

  // Inicia o carrossel para cada contêiner de carrossel
  document.querySelectorAll('.card .carousel').forEach(carousel => startCarousel(carousel));
});

function toggleInfo(element) {
  const card = element.closest('.card');
  const infoContainer = element.nextElementSibling;

  // Alterna a expansão do card e a rotação da seta
  if (card.classList.contains('expanded')) {
    card.classList.remove('expanded');
    element.classList.remove('rotated');
    infoContainer.style.height = '0';
  } else {
    card.classList.add('expanded');
    element.classList.add('rotated');
    infoContainer.style.height = infoContainer.scrollHeight + 'px';
  }
}

function startCarousel(carousel) {
  const images = carousel.querySelectorAll('img');

  // Oculta as imagens que não têm um src válido
  const validImages = Array.from(images).filter(img => img.getAttribute('src').trim() !== "");

  // Se houver mais de uma imagem válida, ativa o carrossel
  if (validImages.length > 1) {
    let currentIndex = 0;

    // Exibe apenas a primeira imagem válida
    validImages.forEach((img, index) => {
      img.style.display = (index === 0) ? 'block' : 'none';
    });

    // Troca as imagens a cada 3 segundos
    setInterval(() => {
      validImages[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % validImages.length;
      validImages[currentIndex].style.display = 'block';
    }, 3000); // Troca a cada 3 segundos
  } else if (validImages.length === 1) {
    // Se houver apenas uma imagem válida, exibe-a
    validImages[0].style.display = 'block';
  }
}



// Seleciona todos os elementos com a classe 'card'
const cards = document.querySelectorAll('.card');

// Adiciona o evento 'mousemove' a todos os cards
cards.forEach((card) => {
  const lightEffect = card.querySelector('.light-effect');

  // Função para atualizar a posição do efeito de luz
  const updateLightEffect = (e) => {
    const { offsetWidth: width, offsetHeight: height } = card;
    const { offsetX, offsetY } = e;

    const x = (offsetX / width) * 100; // Percentual da posição horizontal
    const y = (offsetY / height) * 100; // Percentual da posição vertical

    const lightSizeFactor = 0.5; // Ajuste para diminuir a área da luz
    lightEffect.style.transform = `translate(${(x - 50) * lightSizeFactor}%, ${(y - 50) * lightSizeFactor}%)`;

    // Aumentando a intensidade da rotação 3D
    const rotationSpeed = 10; // Reduzido para um efeito mais intenso
    const rotateY = (x - 50) / rotationSpeed * 2; // Multiplicado para intensificar
    const rotateX = (0.90 - y) / rotationSpeed * 2; // Multiplicado para intensificar
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  // Adiciona evento de movimento ao contêiner
  card.addEventListener('mousemove', updateLightEffect);

  // Evento de mouseenter para reiniciar a opacidade e permitir o efeito de luz
  card.addEventListener('mouseenter', () => {
    lightEffect.style.opacity = 1; // Mostra a luz ao entrar no contêiner
  });

  // Evento de mouseleave
  card.addEventListener('mouseleave', () => {
    lightEffect.style.transform = 'translate(-50%, -50%)'; // Reset
    lightEffect.style.opacity = 0; // Faz a luz desaparecer
    card.style.transform = 'rotateY(0deg) rotateX(0deg)'; // Reseta a rotação
  });

  // Para ocultar a luz ao passar sobre o botão ou link
  const handleMouseEnter = () => {
    lightEffect.style.opacity = 0; // Esconde a luz
  };

  const handleMouseLeave = () => {
    lightEffect.style.opacity = 1; // Mostra a luz de novo
  };

  // Seleciona todos os botões e links dentro do card
  const interactiveElements = card.querySelectorAll('.card-button, .card-link');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
});

const toggle = document.getElementById("toggle");
const body = document.body; // Muda para o body

toggle.addEventListener('change', () => {
  // Adiciona ou remove a classe 'dark' no body
  body.classList.toggle('dark');
});


const sideMenu = document.querySelector('.side-menu');
const voltarInicio = document.querySelector('.voltar-inicio');
const menuToggle = document.querySelector('.menu-toggle');

// Certifique-se de que o menu comece fechado
window.addEventListener('DOMContentLoaded', () => {
  sideMenu.classList.remove('active');
  document.body.style.overflow = 'auto';  // Permitir rolagem no início
});

// Abrir o menu ao clicar na imagem da direita
menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('active');
  document.body.style.overflowY = 'auto';  // Permitir o scroll
});

// Fechar o menu ao clicar no "Voltar ao Início"
voltarInicio.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  document.body.style.overflowY = 'auto';  // Restaurar o scroll
});



const logo = document.getElementById('logo');
const mouseLight = document.getElementById('mouse-light');

// Evento para o movimento do mouse sobre o contêiner da logo
document.querySelector('.header-content').addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight } = logo;

    // Calcula a posição relativa do mouse em relação ao centro da logo
    const rect = logo.getBoundingClientRect();
    const x = ((clientX - rect.left) / offsetWidth - 0.5) * 20; // Ajuste para girar para os lados
    const y = ((clientY - rect.top) / offsetHeight - 0.5) * -20; // Ajuste para girar para cima e para baixo

    // Aplica a transformação na logo
    logo.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;

    // Atualiza a posição do efeito de luz
    const lightX = (e.offsetX / offsetWidth) * 100 - 50; // Percentual da posição horizontal
    const lightY = (e.offsetY / offsetHeight) * 100 - 50; // Percentual da posição vertical
    mouseLight.style.transform = `translate(${lightX}%, ${lightY}%)`;
    mouseLight.style.opacity = 1; // Faz o efeito de luz aparecer
});

// Restaura a posição da logo quando o mouse sai
document.querySelector('.header-content').addEventListener('mouseleave', () => {
    logo.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    mouseLight.style.transform = 'translate(-50%, -50%)'; // Reset
    mouseLight.style.opacity = 0; // Faz o efeito desaparecer
});

// Evento para mostrar o efeito de luz ao entrar
document.querySelector('.header-content').addEventListener('mouseenter', () => {
    mouseLight.style.opacity = 1; // Mostra o efeito ao entrar
});



// Seleciona todos os itens do carrossel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0; // Índice do item atual

// Função para mostrar o item do carrossel com base no índice
function showCarouselItem(index) {
  // Oculta todos os itens
  carouselItems.forEach((item, i) => {
    item.classList.remove('active'); // Remove a classe 'active'
    item.style.display = 'none'; // Esconde o item
  });

  // Mostra o item atual
  carouselItems[index].classList.add('active');
  carouselItems[index].style.display = 'flex'; // Mostra o item com flexbox
}

// Função para mostrar o próximo item
function nextItem() {
  currentIndex = (currentIndex + 1) % carouselItems.length; // Incrementa o índice
  showCarouselItem(currentIndex); // Mostra o item atualizado
}

// Função para mostrar o item anterior
function prevItem() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length; // Decrementa o índice
  showCarouselItem(currentIndex); // Mostra o item atualizado
}

// Adiciona eventos de clique aos botões
document.querySelector('.next').addEventListener('click', nextItem);
document.querySelector('.prev').addEventListener('click', prevItem);

// Exibe o primeiro item no início
showCarouselItem(currentIndex);


const apiUrl = 'SUA_API_URL'; // Insira sua URL da API
const apiKey = 'SUA_API_KEY'; // Insira sua chave da API

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'none' || chatWindow.style.display === '' ? 'block' : 'none';

    // Ajuste a posição da janela do chat quando for mostrada
    if (chatWindow.style.display === 'block') {
        chatWindow.style.bottom = '350px'; // Ajuste conforme necessário
    }
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim(); // Remove espaços em branco

    // Verifica se a mensagem não está vazia antes de enviar
    if (userMessage === '') {
        return; // Não faz nada se a mensagem estiver vazia
    }

    // Adiciona a mensagem do usuário ao log de chat
    addMessageToChatLog(userMessage, 'user');

    // Limpa o campo de entrada
    userInput.value = '';

    // Envia a mensagem para a API
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}` // Para APIs que requerem autenticação
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    // Adiciona a resposta do bot ao log de chat
    addMessageToChatLog(data.reply, 'bot'); // Ajuste conforme a estrutura da resposta da sua API
}

function addMessageToChatLog(message, type) {
    const chatLog = document.getElementById('chatLog');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;

    // Adiciona a classe correspondente
    if (type === 'user') {
        messageElement.classList.add('user-message');
    } else if (type === 'bot') {
        messageElement.classList.add('bot-message');
    }

    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Rola para a parte inferior
}

// Adiciona um listener para a tecla "Enter"
document.getElementById('userInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é "Enter"
        event.preventDefault(); // Impede o comportamento padrão de nova linha
        sendMessage(); // Chama a função para enviar a mensagem
    }
});




document.addEventListener("DOMContentLoaded", function() {
  // Manter a tela de carregamento visível por 3 segundos
  setTimeout(function() {
      document.getElementById("loading-screen").style.transition = 'opacity 1s ease'; // Adiciona transição suave de opacidade
      document.getElementById("loading-screen").style.opacity = '0'; // Inicia a transição de fade out (opacidade 0)
      
      setTimeout(function() {
          document.getElementById("loading-screen").style.display = 'none'; // Remove a tela de carregamento após a transição
      }, 1000); // Espera 1 segundo para completar a transição antes de remover a tela
  }, 3000); // Mantém a tela de carregamento visível por 3 segundos
});
