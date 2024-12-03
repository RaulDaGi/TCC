<?php
include_once('config.php');

// Array para armazenar os destaques
$destaques = [];

// Query para buscar os destaques
$sql = "SELECT destaque, titulo, legenda FROM destaques";
$result = $conexao->query($sql);

// Verificar se existem resultados
if ($result->num_rows > 0) {
    // Loop pelos resultados para armazená-los no array
    while($row = $result->fetch_assoc()) {
        $destaques[] = $row; // Adiciona cada destaque ao array
    }
} else {
    echo "Nenhum destaque encontrado.";
}

// -------- Projetos e Imagens --------
// Array para armazenar os projetos e suas imagens
$projetos = [];

// Query para buscar projetos e suas imagens
$sql_projetos = "SELECT p.id_projeto, p.nome, p.localidade, p.descricao, i.img
                 FROM projetos p
                 LEFT JOIN imagens i ON p.id_projeto = i.id_projeto
                 ORDER BY p.id_projeto";
$result_projetos = $conexao->query($sql_projetos);

// Verificar se existem resultados de projetos
if ($result_projetos->num_rows > 0) {
    while ($row = $result_projetos->fetch_assoc()) {
        // Se o projeto já está no array, adiciona a imagem
        if (isset($projetos[$row['id_projeto']])) {
            $projetos[$row['id_projeto']]['imagens'][] = $row['img'];
        } else {
            // Se o projeto ainda não está no array, cria uma nova entrada
            $projetos[$row['id_projeto']] = [
                'nome' => $row['nome'],
                'localidade' => $row['localidade'],
                'descricao' => $row['descricao'],
                'imagens' => [$row['img']] // Adiciona a primeira imagem
            ];
        }
    }
} else {
    echo "Nenhum projeto encontrado.";
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuidado ao Próximo</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/logoss.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Poppins:wght@400;700&family=Roboto:wght@400;700&family=Lato:wght@400;700&family=Open+Sans:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">

</head>
<body>

    <div id="scrollBar"></div>



    <div id="loading-screen">
        <img src="img/Untitled__1_-removebg-preview.png" alt="Logo" class="loading-logo">
    </div>
    <header class="header">
        <video autoplay muted loop class="shared-video">
            <source src="img/videoinicialC.mp4" type="video/mp4">
        </video>
        <div class="header-content">
            <img src="img/menu_ft-removebg-preview.png" alt="Imagem Direita" class="small-img menu-toggle"> 
            <div id="mouse-light"></div>
            <img id="logo" src="img/Untitled__1_-removebg-preview.png" alt="Logo" class="logo">
            <main id="small-img">
                <label class="containe">
                  <input type="checkbox" id="toggle"/>
                  <span class="slider round">
                    <div class="background"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                  </span>
                </label>
              </main>
        </div>
        <div class="central-content">
            <h1>Um Prato Cheio  Uma Vida Nova</h1>
        </div>

        <div class="side-menu">
            <div class="menu-content">
                <span class="close-menu">&times;</span>
                <ul>
                    <center><h1>MENU</h1></center>
                    <li><button class="button-action" onclick="window.location.href='doacoes.html'">DOAR</button></li>
                    <li><button class="button-action" onclick="window.location.href='voluntario.html'">VOLUNTARIO</button></li>
                    <li><button class="button-action" onclick="window.location.href='sobrenos.html'">SOBRE NÓS</button></li>
                </ul>
                <p class="voltar-inicio">VOLTAR</p> 
            </div>
        </div>
    </header>
    <div class="section">
        <div class="highlight-container">
            <div class="carousel">
                <?php $index = 0; // Variável para controlar o índice dos itens ?>
                <?php foreach ($destaques as $destaque_item): ?>
                    <div class="carousel-item <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo $index; ?>">
                        <?php
                        // Verifica a extensão do arquivo
                        $file_extension = pathinfo($destaque_item['destaque'], PATHINFO_EXTENSION);
                        
                        // Renderizar de acordo com o tipo de arquivo (apenas imagens)
                        if (in_array(strtolower($file_extension), ['jpg', 'jpeg', 'png', 'gif'])) {
                            // Exibir imagem ou gif
                            echo '<img class="img-destaque" src="destaque/' . htmlspecialchars($destaque_item['destaque']) . '" alt="' . htmlspecialchars($destaque_item['titulo']) . '">';
                        }
                        ?>
                        <div class="text-content">
                        <h2><?php echo mb_strtoupper(htmlspecialchars($destaque_item['titulo'])); ?></h2>
                            <p><?php echo htmlspecialchars($destaque_item['legenda']); ?></p>
                        </div>
                    </div>
                    <?php $index++; ?>
                <?php endforeach; ?>
            </div>
            <button class="prev">←</button>
            <button class="next">→</button>
        </div>
    </div>
  <div id="pro-section">
    <h1>NOSSOS PROJETOS </h1>
  </div> 

  <section class="card-container">
    <?php foreach ($projetos as $projeto): ?>
        <div class="card">
            <div class="light-effect"></div>
            <div class="card-inner">
                <div class="carousel">
                    <?php foreach ($projeto['imagens'] as $index => $imagem): ?>
                        <img src="uploads/<?php echo $imagem; ?>" alt="Imagem do Projeto" <?php echo $index === 0 ? '' : 'style="display:none;"'; ?>>
                    <?php endforeach; ?>
                </div>
                <!-- Nome do Projeto -->
                <h2 class="card-title"><?php echo mb_strtoupper(htmlspecialchars($projeto['nome'])); ?></h2>
                
                <!-- Localidade do Projeto -->
                <p class="card-location">
                    Localização: <a href="https://www.google.com/maps/search/?api=1&query=<?php echo urlencode($projeto['localidade']); ?>" target="_blank" class="location-link">
                        <?php echo $projeto['localidade']; ?>
                    </a>
                </p>
                
                <button class="button-see-more" onclick="window.location.href='doacoes.html'">DOAR</button>
                
                <div class="seta" onclick="toggleInfo(this)">▲</div>
                
                <!-- Descrição do Projeto -->
                <div class="info-container">
                    <p class="info-text"><?php echo $projeto['descricao']; ?></p>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</section>

    <body>
        <div class="chat-icon" onclick="toggleChat()">
            <img src="img/assistent ai.jpeg" alt="Chatbot Icon">
        </div>
        
        <div id="chatWindow" class="chat-window" style="display: none;">
            <div class="chat-header">
                <span>Assistent AI</span>
                <button class="close-btn" onclick="toggleChat()">✖</button> <!-- Botão de fechar -->
            </div>
            
            <!-- Substituí o log de chat e o campo de input pelo iframe do chatbot -->
            <iframe src="https://dash.superagentes.ai/agents/cm2nd2wxc00ejby5xpheesw47/iframe" ></iframe>
        </div>
        
  <footer class="footer" id="footer">
  <div class="footer-content">
    <div class="footer-section social">
      <h4><b>Redes Sociais</b></h4>
      <a href="https://www.facebook.com/profile.php?id=100075605076567&mibextid=ZbWKwL" target="_blank"><i class="fab fa-facebook-f"></i></a>
      <a href="https://www.instagram.com/cuidadoproximo?igsh=bjQ1YjdhOTh2MmFs" target="_blank"><i class="fab fa-instagram"></i></a>
    </div>

    <div class="footer-section contact">
      <h4><b>Contato</b></h4>
      <p>Endereço: Rua Mil Oitocentos e Vinte e Dois, 368 Ipiranga - São Paulo (SP)</p>
      <p>Email: cuidadoaoproximo@gmail.com</p>
      <p>Whats: (11) 9 7736-4837 / Fone: (11) 2274-4136</p>
    </div>

    <div class="footer-section credits">
      <p>&copy; 2024 ONG Cuidado ao Próximo. Todos os direitos reservados.</p>
      <p>Desenvolvido por <b>BDRR</b></p>
    </div>
  </div>
</footer>


  
    <script src="scripts.js"></script>
    
</body>
</html>
    