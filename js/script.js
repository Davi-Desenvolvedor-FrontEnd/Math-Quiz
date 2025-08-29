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
const $selectGameMode = document.querySelector(".select-game-mode");
const $indexPlayer = document.querySelector(".index");
const $nome1 = document.querySelector(".Nome1");
const $nome2 = document.querySelector(".Nome2");
const $Nomezinho = document.querySelector(".Nomezinho");
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;
let totalCorrect1 = 0;
let totalCorrect2 = 0;
let playerindex = 0;
let contraContra = "";
let duracao = 30;
let tempo = duracao;
let nome1;
let nome2;
const $player1 = document.querySelector(".Player1");
$player1.addEventListener("click", () => {
  contraContra = "1 jogador";
  $player1.style.backgroundColor = "green";
  $player2.style.backgroundColor = "blue";
  $Nomezinho.classList.add("hide");
});
const $player2 = document.querySelector(".Player2");
$player2.addEventListener("click", () => {
  $player2.style.backgroundColor = "green";
  $player1.style.backgroundColor = "blue";
  contraContra = "2 jogadores";
  $Nomezinho.classList.remove("hide");
});
let intervaloTempo;
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
      playerindex = playerindex==0?1:0;
      $message.textContent = "Tempo esgotado";
      $barraContainer.classList.add("hide");
      $message.classList.remove("hide");
      document
        .querySelectorAll(".answer")
        .forEach((btn) => (btn.disabled = true));
      currentQuestionIndex++;
      // setTimeout(displayNextQuestion, 300)
      $nextQuestionButton.classList.remove("hide");
    }
  }, 100);
}
function startGame() {
  if (contraContra == "") return null;
  nome1 = $nome1.value;
  nome2 = $nome2.value;
  $questionsContainer.classList.remove("hide");
  $controleContainer.classList.add("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();

  if (questions.length == currentQuestionIndex) {
    return finishGame();
  }
  Timer();
  $indexPlayer.textContent =
    contraContra == "2 jogadores"
      ? `Pergunta para ${playerindex == 0 ? nome1 : nome2}`
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
    confetti.style.zIndex = 2;
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

  let message = "";
  let desempenho1 = "";
  let desempenho2 = "";

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
  document.body.style.backgroundColor =
    performancePlayer1 != performancePlayer2 ? "red" : "blue";

  createConfetti();
  function result() {
    if (performancePlayer1 > performancePlayer2) {
      return true;
    } else {
      return false;
    }
  }
  $questionsContainer.innerHTML =
    contraContra == "2 jogadores"
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
            <strong class="result" style="color: ${performancePlayer1 != performancePlayer2?"red":"blue"}">Resultado: ${
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

     <p class="final-message">
        Você acertou ${totalCorrect} de ${totalQuestion} questões!
        <span>Resultado: ${message}</span>
     </p>
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
