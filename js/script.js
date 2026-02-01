const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answer-container");
const $questionText = document.querySelector(".question");
const $equation = document.querySelector(".equation");
const $nextQuestionButton = document.querySelector(".next-question");
const $quizTitle = document.querySelector(".quiz-title"); // Seleciona o título
const $feedback = document.querySelector(".feedback"); // Seleciona o feedback
const $message = document.querySelector(".message"); // Seleciona a mensagem
const $controleContainer = document.querySelector(".controle-container");
const $barraContainer = document.querySelector(".barra-container");
const $barra = document.querySelector(".barra");
const $tempo = document.querySelector(".temp");
const $selectGameModeTitle = document.querySelector(".select-game-mode");
const $selectGameModeBox = document.querySelector(".select-game-mode-box");
const $indexPlayer = document.querySelector(".index");
const $nome1 = document.querySelector(".Nome1");
const $nome2 = document.querySelector(".Nome2");
const $nome3 = document.querySelector(".Nome3");
const $Nomezinho = document.querySelector(".Nomezinho");
const $nextContainer = document.querySelector(".next-container");
const $nextButton = $nextContainer.querySelector("button");
$startGameButton.addEventListener("click", selectedModeGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);
$nextButton.addEventListener("click", startGame);

let currentQuestionIndex = 0;
let totalCorrect = 0;
let totalCorrect1 = 0;
let totalCorrect2 = 0;
let totalCorrect3 = 0;
let playerindex = 0;
let contraContra = "";
let duracao = 30;
let tempo = duracao;
let intervaloTempo;
let nome1;
let nome2;
let nome3;

function atualizarBotao() {
  $nextButton.removeEventListener("click", startGame);
  nome1 = $nome1.value.trim();
  nome2 = $nome2.value.trim();
  nome3 = $nome3.value.trim();

  if (contraContra !== "1 jogador") {
    if ($nome3.classList.contains("hide")) {
      if (nome1 !== "" && nome2 !== "") {
        $nextButton.style.cursor = "pointer";
        $nextButton.style.background = "";
        $nextButton.disabled = false;
        $nextButton.addEventListener("click", startGame);
      } else {
        $nextButton.style.cursor = "not-allowed";
        $nextButton.style.background = "#1F1FFF";
        $nextButton.disabled = true;
      }
    } else {
      if (nome1 !== "" && nome2 !== "" && nome3 !== "") {
        $nextButton.style.cursor = "pointer";
        $nextButton.style.background = "";
        $nextButton.disabled = false;
        $nextButton.addEventListener("click", startGame);
      } else {
        $nextButton.style.cursor = "not-allowed";
        $nextButton.style.background = "#1F1FFF";
        $nextButton.disabled = true;
      }
    }
  } else {
    $nextButton.addEventListener("click", startGame);
  }
}

// Adiciona eventos para validar enquanto o usuário digita
$nome1.addEventListener("input", atualizarBotao);
$nome2.addEventListener("input", atualizarBotao);
$nome3.addEventListener("input", atualizarBotao);

const $player1 = document.querySelector(".Player1");
$player1.addEventListener("click", () => {
  contraContra = "1 jogador";
  $player3.style.backgroundColor = "blue";
  $player2.style.backgroundColor = "blue";
  $player1.style.backgroundColor = "green";
  $Nomezinho.classList.add("hide");
  $nome3.classList.add("hide");
  $nextButton.style.cursor = "pointer";
  $nextButton.style.background = "";
  $nextButton.disabled = false;
});

const $player2 = document.querySelector(".Player2");
$player2.addEventListener("click", () => {
  contraContra = "2 jogadores";
  $player3.style.backgroundColor = "blue";
  $player2.style.backgroundColor = "green";
  $player1.style.backgroundColor = "blue";
  $Nomezinho.classList.remove("hide");
  $nome3.classList.add("hide");
  atualizarBotao();
});

const $player3 = document.querySelector(".Player3");
$player3.addEventListener("click", () => {
  contraContra = "3 jogadores";
  $player3.style.backgroundColor = "green";
  $player2.style.backgroundColor = "blue";
  $player1.style.backgroundColor = "blue";
  $Nomezinho.classList.remove("hide");
  $nome3.classList.remove("hide");
  atualizarBotao();
});

function Timer() {
  $barraContainer.classList.remove("hide");
  $message.classList.add("hide");
  tempo = duracao;
  $barra.style.width = "100%";
  $tempo.textContent = tempo.toFixed(1) + "s";
  if (intervaloTempo) clearInterval(intervaloTempo);
  intervaloTempo = setInterval(() => {
    tempo = Math.max(0, +(tempo - 0.1).toFixed(1));
    $barra.style.width = (tempo / duracao) * 100 + "%";
    $tempo.textContent = tempo.toFixed(1) + "s";
    if (tempo <= 0) {
      clearInterval(intervaloTempo);
      playerindex = playerindex == 0 ? 1 : 0;
      $message.textContent = "Tempo esgotado";
      $barraContainer.classList.add("hide");
      $message.classList.remove("hide");
      document.querySelectorAll(".answer").forEach((btn) => {
        btn.disabled = true;
        btn.style.cursor = "not-allowed";
      });
      currentQuestionIndex++;
      // setTimeout(displayNextQuestion, 300)
      $nextQuestionButton.classList.remove("hide");
    }
  }, 100);
}

function selectedModeGame() {
  $selectGameModeTitle.classList.remove("hide");
  $selectGameModeBox.classList.remove("hide");
  $startGameButton.classList.add("hide");
  $quizTitle.classList.add("hide");
  $nextContainer.classList.remove("hide");
  $nextButton.style.cursor = "not-allowed";
  $nextButton.style.background = "#1F1FFF";
  $nextButton.disabled = true;
}

function startGame() {
  $questionsContainer.classList.remove("hide");
  $controleContainer.classList.add("hide");
  displayNextQuestion();
}

function getNamePlayer(i) {
  const nome1Valor = $nome1.value.trim();
  const nome2Valor = $nome2.value.trim();
  const nome3Valor = $nome3.value.trim();
  let nome;

  switch (i) {
    case 0:
      nome = nome1Valor;
      break;
    case 1:
      nome = nome2Valor;
      break;
    case 2:
      nome = nome3Valor;
      break;
    default:
      nome = "";
  }
  return nome;
}

function displayNextQuestion() {
  resetState();

  if (questions.length == currentQuestionIndex) {
    return finishGame();
  }
  Timer();
  $indexPlayer.textContent =
    contraContra != "1 jogador"
      ? `Pergunta para ${getNamePlayer(playerindex)}`
      : "";
  $questionText.textContent = questions[currentQuestionIndex].question;
  $equation.textContent = questions[currentQuestionIndex].equation;
  questions[currentQuestionIndex].answers.forEach((answers) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answers.text;
    if (answers.correct) {
      newAnswer.dataset.correct = answers.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");

  // Esconde o feedback a cada nova pergunta
  $feedback.classList.add("hide");
  $feedback.textContent = "";
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (contraContra == "1 jogador") {
    if (answerClicked.dataset.correct) {
      document.body.classList.add("correct");
      $feedback.textContent = "Resposta certa!";
      totalCorrect++;
    } else {
      document.body.classList.add("incorrect");
      answerClicked.classList.add("incorrect");
      $feedback.textContent = "Resposta errada!";
    }
  } else if (contraContra == "2 jogadores") {
    if (playerindex == 0) {
      if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        $feedback.textContent = "Resposta certa!";
        totalCorrect1++;
        playerindex = 1;
        console.log("Pontuação do Jogador 1: " + totalCorrect1);
      } else {
        document.body.classList.add("incorrect");
        answerClicked.classList.add("incorrect");
        $feedback.textContent = "Resposta errada!";
        playerindex = 1;
        console.log("Pontuação do Jogador 1: " + totalCorrect1);
      }
    } else if (playerindex == 1) {
      if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        $feedback.textContent = "Resposta certa!";
        totalCorrect2++;
        playerindex = 0;
        console.log("Pontuação do Jogador 2: " + totalCorrect2);
      } else {
        document.body.classList.add("incorrect");
        answerClicked.classList.add("incorrect");
        $feedback.textContent = "Resposta errada!";
        playerindex = 0;
        console.log("Pontuação do Jogador 2: " + totalCorrect2);
      }
    }
  } else {
    if (playerindex == 0) {
      if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        $feedback.textContent = "Resposta certa!";
        totalCorrect1++;
        playerindex = 1;
        console.log("Pontuação do Jogador 1: " + totalCorrect1);
      } else {
        document.body.classList.add("incorrect");
        answerClicked.classList.add("incorrect");
        $feedback.textContent = "Resposta errada!";
        playerindex = 1;
        console.log("Pontuação do Jogador 1: " + totalCorrect1);
      }
    } else if (playerindex == 1) {
      if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        $feedback.textContent = "Resposta certa!";
        totalCorrect2++;
        playerindex = 2;
        console.log("Pontuação do Jogador 2: " + totalCorrect2);
      } else {
        document.body.classList.add("incorrect");
        answerClicked.classList.add("incorrect");
        $feedback.textContent = "Resposta errada!";
        playerindex = 2;
        console.log("Pontuação do Jogador 2: " + totalCorrect2);
      }
    } else {
      if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        $feedback.textContent = "Resposta certa!";
        totalCorrect3++;
        playerindex = 0;
        console.log("Pontuação do Jogador 3: " + totalCorrect3);
      } else {
        document.body.classList.add("incorrect");
        answerClicked.classList.add("incorrect");
        $feedback.textContent = "Resposta errada!";
        playerindex = 0;
        console.log("Pontuação do Jogador 3: " + totalCorrect3);
      }
    }
  }
  // Exibe o feedback com base na resposta

  // Mostra o feedback
  $feedback.classList.remove("hide");

  // Desativa todos os botões de resposta
  document.querySelectorAll(".answer").forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}
function createConfetti() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];
  const container = document.body;

  for (let i = 0; i < 2000; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = -1;
    confetti.style.width = 5 + Math.random() * 10 + "px";
    confetti.style.height = 5 + Math.random() * 10 + "px";
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
    confetti.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(confetti);

    // Remover o confeti após a animação
    setTimeout(() => {
      confetti.remove();
    }, 10000);
  }
}
function finishGame() {
  const totalQuestion = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestion);
  const performancePlayer1 = Math.floor(totalCorrect1 * 20);
  const performancePlayer2 = Math.floor(totalCorrect2 * 20);
  const performancePlayer3 = Math.floor(totalCorrect3 * 20);

  let message = "";
  let desempenho1 = "";
  let desempenho2 = "";
  let desempenho3 = "";

  function scorePorCento() {
    const scorePC = Math.floor((totalCorrect * 100) / totalQuestion);
    return scorePC;
  }

  function rankPlayers(player1, score1, player2, score2, player3, score3) {
    // Cria array de objetos com nome e pontuação
    const players = [
      { name: player1, score: score1 },
      { name: player2, score: score2 },
      { name: player3, score: score3 },
    ];

    // Ordena do maior para o menor
    players.sort((a, b) => b.score - a.score);

    // Retorna objeto com a classificação
    return {
      primeiro: players[0],
      segundo: players[1],
      terceiro: players[2],
    };
  }

  // Como usar:
  const classificacao = rankPlayers(
    nome1,
    performancePlayer1,
    nome2,
    performancePlayer2,
    nome3,
    performancePlayer3,
  );

  let totalErrada = totalQuestion - totalCorrect;

  switch (true) {
    case performance >= 90:
      message = "Excelente :)";
      break;
    case performance >= 70:
      message = "Muito bom!";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode melhorar";
  }
  switch (true) {
    case performancePlayer1 >= 90:
      desempenho1 = "Excelente :)";
      break;
    case performancePlayer1 >= 70:
      desempenho1 = "Muito bom!";
      break;
    case performancePlayer1 >= 50:
      desempenho1 = "Bom";
      break;
    default:
      desempenho1 = "Pode melhorar";
  }
  switch (true) {
    case performancePlayer2 >= 90:
      desempenho2 = "Excelente :)";
      break;
    case performancePlayer2 >= 70:
      desempenho2 = "Muito bom!";
      break;
    case performancePlayer2 >= 50:
      desempenho2 = "Bom";
      break;
    default:
      desempenho2 = "Pode melhorar";
  }
  switch (true) {
    case performancePlayer3 >= 90:
      desempenho3 = "Excelente :)";
      break;
    case performancePlayer3 >= 70:
      desempenho3 = "Muito bom!";
      break;
    case performancePlayer3 >= 50:
      desempenho3 = "Bom";
      break;
    default:
      desempenho3 = "Pode melhorar";
  }
  if (contraContra == "3 jogadores") {
    setTimeout(() => {
      createConfetti();
      container.classList.remove("camada");
    }, 9000);
  } else {
    document.body.style.backgroundColor = "yellow";
    createConfetti();
  }
  function result() {
    if (performancePlayer1 > performancePlayer2) {
      return true;
    } else {
      return false;
    }
  }
  // Funções auxiliares que você precisa adicionar
  const performances = [
    performancePlayer1,
    performancePlayer2,
    performancePlayer3,
  ];
  const maiorDesempenho = Math.max(...performances);
  const desempenhosOrdenados = [...performances].sort((a, b) => b - a);
  const segundoDesempenho = desempenhosOrdenados[1];

  function getTrofeu(playerNum) {
    const performance = performances[playerNum - 1];
    if (performance === maiorDesempenho) {
      return "../images/trofeu_ouro.png"; // imagem do troféu de ouro
    } else if (performance === segundoDesempenho) {
      return "../images/trofeu_prata.png"; // imagem do troféu de prata
    } else {
      return "../images/trofeu_bronze.png"; // imagem do troféu de bronze
    }
  }

  // Função campeao atualizada para lidar com empates
  function campeao() {
    const performances = [
      performancePlayer1,
      performancePlayer2,
      performancePlayer3,
    ];
    const max = Math.max(...performances);
    const jogadoresComMax = performances.filter((p) => p === max).length;

    if (jogadoresComMax === 3) {
      return "EMPATE TRIPLO! 🏆🏆🏆";
    } else if (jogadoresComMax === 2) {
      const jogadoresEmpate = performances
        .map((p, i) => (p === max ? i + 1 : null))
        .filter((i) => i !== null);
      return `EMPATE! Jogadores ${jogadoresEmpate.join(" e ")} 🏆`;
    } else {
      const vencedor = performances.indexOf(max) + 1;
      return `JOGADOR ${vencedor} VENCEU! 🏆`;
    }
  }

  $questionsContainer.innerHTML =
    contraContra == "3 jogadores"
      ? `
    <div class="final-message">
      <div class="feedback-message">
        ${campeao()}
      </div>
    
      <div class="players-container">
        <!-- Jogador 1 -->
        <div class="player-box ${performancePlayer1 === maiorDesempenho ? "gold" : performancePlayer1 === segundoDesempenho ? "silver" : "bronze"}">
            <div class="player-title">${nome1}</div>
            <div class="player-score">${performancePlayer1}</div>
            <img src="${getTrofeu(1)}" class="trofeu-icon" />
            <div class="player-medal">
                ${performancePlayer1 === maiorDesempenho ? "🥇" : performancePlayer1 === segundoDesempenho ? "🥈" : "🥉"}
            </div>
        </div>
        
        <!-- Jogador 2 -->
        <div class="player-box ${performancePlayer2 === maiorDesempenho ? "gold" : performancePlayer2 === segundoDesempenho ? "silver" : "bronze"}">
            <div class="player-title">${nome2}</div>
            <div class="player-score">${performancePlayer2}</div>
            <img src="${getTrofeu(2)}" class="trofeu-icon" />
            <div class="player-medal">
                ${performancePlayer2 === maiorDesempenho ? "🥇" : performancePlayer2 === segundoDesempenho ? "🥈" : "🥉"}
            </div>
        </div>
        
        <!-- Jogador 3 -->
        <div class="player-box ${performancePlayer3 === maiorDesempenho ? "gold" : performancePlayer3 === segundoDesempenho ? "silver" : "bronze"}">
            <div class="player-title">${nome3}</div>
            <div class="player-score">${performancePlayer3}</div>
            <img src="${getTrofeu(3)}" class="trofeu-icon" />
            <div class="player-medal">
                ${performancePlayer3 === maiorDesempenho ? "🥇" : performancePlayer3 === segundoDesempenho ? "🥈" : "🥉"}
            </div>
        </div>
    </div>
    
    <button onclick="window.location.reload()" class="button">
        Refazer teste
    </button>
</div>
          `
      : contraContra == "2 jogadores"
        ? `
       <div class="table-responsive">
        <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Jogador</th>
                        <th>Pontuação</th>
                        <th>Desempenho</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="winner-row">
                        <td><i class="fas fa-trophy medal gold"></i>1º</td>
                        <td>${result() ? nome1 : nome2}</td>
                        <td>${
                          result() ? performancePlayer1 : performancePlayer2
                        }</td>
                        <td>${result() ? desempenho1 : desempenho2}</td>
                    </tr>
                    <tr class="winner-row">
                        <td><i class="fas fa-trophy medal gold"></i>2º</td>
                        <td>${result() ? nome2 : nome1}</td>
                        <td>${
                          result() ? performancePlayer2 : performancePlayer1
                        }</td>
                        <td>${result() ? desempenho2 : desempenho1}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <strong class="result" style="color: ${performancePlayer1 != performancePlayer2 ? "red" : "blue"}">Resultado: ${
              performancePlayer1 > performancePlayer2
                ? nome1 + " venceu"
                : performancePlayer2 > performancePlayer1
                  ? nome2 + " venceu"
                  : "Empate"
            }!</strong>
            <button onclick=window.location.reload() class="button">
            Refazer teste
            </button>
    `
        : `

     <div class="final-message">
        <img src="../images/trofeu.png" class="trofeu-icon" />
        <div class="feedback-message">
        ${message}
        </div>
        <div class="score-circle" style="--progress: ${scorePorCento()}%">
          <div class="score-inner">
            <div class="text-6xl">
            ${totalCorrect}
            </div>
            <div class="text-xl">
           / ${totalQuestion}
            </div>
          </div>
        </div>
        <div class="statics-container">
         <div class="acertos-box">
           <span id="correct-text">${totalCorrect}</span>
           <p>Corretas</p>
         </div>
         <div class="erros-box">
           <span id="wrong-text">${totalErrada}</span>
           <p>Erradas</p>
          </div>
        </div>
        
     </div>
     <button onclick=window.location.reload() class="button">
     Refazer teste
     </button>
    `;
}

const questions = [
  {
    question: "Diga o resultado da seguinte equação:",
    equation: "x² - 4 = 0",
    answers: [
      { text: "2", correct: true },
      { text: "4", correct: false },
      { text: "16", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "Resolva a equação exponencial:",
    equation: "2ˣ = 8",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "Qual é a média aritmética dos números 5, 7, 9 e 11?",
    equation: null,
    answers: [
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question: "Resolva a equação do primeiro grau:",
    equation: "2x + 8 = 20",
    answers: [
      { text: "x = 4", correct: false },
      { text: "x = 6", correct: true },
      { text: "x = 8", correct: false },
      { text: "x = 10", correct: false },
    ],
  },
  {
    question:
      "Em uma urna há 3 bolas vermelhas, 2 azuis e 5 verdes. Qual a probabilidade de tirar uma bola azul?",
    equation: null,
    answers: [
      { text: "20%", correct: true },
      { text: "30%", correct: false },
      { text: "40%", correct: false },
      { text: "50%", correct: false },
    ],
  },
  {
    question: "Qual é o valor de x na proporção:",
    equation: "3/5 = x/15",
    answers: [
      { text: "5", correct: false },
      { text: "7", correct: false },
      { text: "9", correct: true },
      { text: "11", correct: false },
    ],
  },
  {
    question: "Calcule o perímetro de um retângulo com lados de 8cm e 12cm:",
    equation: null,
    answers: [
      { text: "20cm", correct: false },
      { text: "40cm", correct: true },
      { text: "96cm", correct: false },
      { text: "80cm", correct: false },
    ],
  },
  {
    question: "Qual é a raiz quadrada de 144?",
    equation: null,
    answers: [
      { text: "12", correct: true },
      { text: "14", correct: false },
      { text: "16", correct: false },
      { text: "18", correct: false },
    ],
  },
  {
    question: "Resolva a expressão numérica:",
    equation: "10 + 5 × 2 - 8 ÷ 4",
    answers: [
      { text: "17", correct: false },
      { text: "18", correct: true },
      { text: "19", correct: false },
      { text: "20", correct: false },
    ],
  },
  {
    question: "Qual é o resultado de 30% de 150?",
    equation: null,
    answers: [
      { text: "30", correct: false },
      { text: "35", correct: false },
      { text: "40", correct: false },
      { text: "45", correct: true },
    ],
  },
  {
    question:
      "Em um triângulo retângulo, os catetos medem 3cm e 4cm. Quanto mede a hipotenusa?",
    equation: null,
    answers: [
      { text: "5cm", correct: true },
      { text: "6cm", correct: false },
      { text: "7cm", correct: false },
      { text: "8cm", correct: false },
    ],
  },
  {
    question: "Qual é o valor de y na equação:",
    equation: "3(y - 2) = 2(y + 4)",
    answers: [
      { text: "10", correct: false },
      { text: "12", correct: false },
      { text: "14", correct: true },
      { text: "16", correct: false },
    ],
  },
];
