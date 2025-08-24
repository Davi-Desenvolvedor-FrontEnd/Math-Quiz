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
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;
let duracao = 30;
let tempo = duracao;
const $player1 = document.querySelector(".Player1");
const $player2 = document.querySelector(".Player2");
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
      $message.textContent = "Tempo esgotado!";
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

  // Exibe o feedback com base na resposta
  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    $feedback.textContent = "Resposta certa!";
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
    answerClicked.classList.add("incorrect");
    $feedback.textContent = "Resposta errada!";
  }

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

function finishGame() {
  const totalQuestion = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestion);

  let message = "";

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

  $questionsContainer.innerHTML = `
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
    question: "Qual é a derivada de f(x) = 3x² + 2x?",
    equation: null,
    answers: [
      { text: "6x + 2", correct: true },
      { text: "3x + 2", correct: false },
      { text: "6x", correct: false },
      { text: "5x + 2", correct: false },
    ],
  },
  {
    question: "Resolva a inequação:",
    equation: "2x - 5 > 3",
    answers: [
      { text: "x > 4", correct: true },
      { text: "x < 4", correct: false },
      { text: "x > 5", correct: false },
      { text: "x < 5", correct: false },
    ],
  },
  {
    question: "Qual é o valor de sen(π/2)?",
    equation: null,
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: true },
      { text: "-1", correct: false },
      { text: "π/2", correct: false },
    ],
  },
  {
    question: "Simplifique a expressão:",
    equation: "(x² • x³) / x⁴",
    answers: [
      { text: "x", correct: true },
      { text: "x²", correct: false },
      { text: "x⁵", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "Qual é a solução para:",
    equation: "log₂(8) = ?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "Resolva o sistema:",
    equation: "x + y = 10\nx - y = 2",
    answers: [
      { text: "x=6, y=4", correct: true },
      { text: "x=5, y=5", correct: false },
      { text: "x=8, y=2", correct: false },
      { text: "x=7, y=3", correct: false },
    ],
  },
  {
    question: "Calcule a integral indefinida:",
    equation: "∫(2x dx)",
    answers: [
      { text: "x² + C", correct: true },
      { text: "2x² + C", correct: false },
      { text: "x²", correct: false },
      { text: "2x + C", correct: false },
    ],
  },
  {
    question: "Qual é o valor de:",
    equation: "cos(60°)",
    answers: [
      { text: "√3/2", correct: false },
      { text: "1/2", correct: true },
      { text: "√2/2", correct: false },
      { text: "0", correct: false },
    ],
  },
  {
    question: "Fatorize a expressão:",
    equation: "x² - 9",
    answers: [
      { text: "(x-3)(x+3)", correct: true },
      { text: "(x-9)(x+1)", correct: false },
      { text: "(x-3)²", correct: false },
      { text: "(x+3)²", correct: false },
    ],
  },
  {
    question: "Qual é a fórmula de Bhaskara?",
    equation: null,
    answers: [
      { text: "x = (-b ± √(b² - 4ac))/2a", correct: true },
      { text: "x = b² - 4ac", correct: false },
      { text: "x = (-b ± b²)/2a", correct: false },
      { text: "x = ±√(b² - 4ac)", correct: false },
    ],
  },
  {
    question: "Resolva a equação logarítmica:",
    equation: "log₅(25) = ?",
    answers: [
      { text: "5", correct: false },
      { text: "2", correct: true },
      { text: "25", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "Qual é o domínio da função:",
    equation: "f(x) = √(x - 4)",
    answers: [
      { text: "x ≥ 4", correct: true },
      { text: "x > 4", correct: false },
      { text: "x ∈ ℝ", correct: false },
      { text: "x ≤ 4", correct: false },
    ],
  },
  {
    question: "Calcule o limite:",
    equation: "lim(x→0) (sen(x)/x)",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: true },
      { text: "∞", correct: false },
      { text: "Não existe", correct: false },
    ],
  },
];