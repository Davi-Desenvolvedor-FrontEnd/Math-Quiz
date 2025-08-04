const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answer-container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next-question");
const $quizTitle = document.querySelector(".quiz-title"); // Seleciona o título
const $feedback = document.querySelector(".feedback"); // Seleciona o feedback

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;

function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    $quizTitle.classList.add("hide"); // Esconde o título
    displayNextQuestion();
}

function displayNextQuestion() {
    resetState();

    if (questions.length == currentQuestionIndex) {
        return finishGame();
    }

    $questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach(answers => {
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
    document.querySelectorAll(".answer").forEach(button => {
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
    const performance = Math.floor(totalCorrect * 100 / totalQuestion);

    let message = "";

    switch (true) {
        case (performance >= 90):
            message = "Excelente :)";
            break;
        case (performance >= 70):
            message = "Muito bom!";
            break;
        case (performance >= 50):
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
        question: "Qual a capital da França?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Brasília", correct: false },
            { text: "Tóquio", correct: false },
            { text: "Pequim", correct: false },
        ],
    },
    {
        question: "Quando o Brasil foi descoberto?",
        answers: [
            {text: "1980" , correct: false},
            {text: "1821" , correct: false},
            {text: "1500" , correct: true},
            {text: "1945" , correct: false},
        ]
    } ,

    {
        question: "Quem foi o primeiro presidente do Brasil?",
        answers: [
            {text: "Getulio Vargas" , correct: false},
            {text: "Juscelino Kubitschek" , correct: false},
            {text: "Deodoro da Fonseca" , correct: true},
            {text: "Pedro Alvares Cabral" , correct: false},
        ]
    },
       
    {
        question: "Em que ano ocorreu a Proclamação da República no Brasil?",
        answers: [
            {text: "1888" , correct: false},
            {text: "1889" , correct: true},
            {text: "1891" , correct: false},
            {text: "1900" , correct: false},
        ]
    },

    {
        question: "Qual civilização antiga construiu as pirâmides de Gizé?",
        answers: [
            {text: "Romanos" , correct: false},
            {text: "Gregos" , correct: false},
            {text: "Mesopotamios" , correct: false},
            {text: "Egicpios" , correct: true},
        ]
    },

    {
        question: "Qual foi o principal motivo das Cruzadas na Idade Média?",
        answers: [
            {text: "Expansão do comércio europeu" , correct: false},
            {text: "Conquista de novas terras na Ásia" , correct: false},
            {text: "Reconquista da Terra Santa (Jerusalém)" , correct: true},
            {text: "Difusão da cultura grega" , correct: false},
        ]
    },

    {
        question: "Em que ano a Segunda Guerra Mundial terminou?",
        answers: [
            {text: "1943" , correct: false},
            {text: "1944" , correct: false},
            {text: "1945" , correct: true},
            {text: "1946" , correct: false},
        ]
    },

    {
        question: "Quem descobriu o Brasil em 1500?",
        answers: [
            {text: "Cristóvão Colombo" , correct: false},
            {text: "Vasco da Gama" , correct: false},
            {text: "Pedro Álvares Cabral" , correct: true},
            {text: "Fernão de Magalhães" , correct: false},
        ]
    },

    {
        question: "Qual foi o tratado que dividiu as terras descobertas entre Portugal e Espanha?",
        answers: [
            {text: "Tratado de Versalhes" , correct: false},
            {text: "Tratado de Tordesilhas" , correct: true},
            {text: "Tratado de Madrid" , correct: false},
            {text: "Tratado de Utrecht" , correct: false},
        ]
    },

    {
        question: "Quem foi o líder da Revolução Francesa que instaurou o período conhecido como o Reinado do Terror?",
        answers: [
            {text: "Napoleão Bonaparte" , correct: false},
            {text: "Luís XVI" , correct: false},
            {text: "Maximilien Robespierre" , correct: true},
            {text: "Jean-Paul Marat" , correct: false},
        ]
    },
    
    {
        question: "Qual foi o principal evento que desencadeou a Primeira Guerra Mundial?",
        answers: [
            {text: "A queda da Bolsa de Valores" , correct: false},
            {text: "A invasão da Polônia" , correct: false},
            {text: "O assassinato do arquiduque Francisco Ferdinando" , correct: true},
            {text: "O ataque a Pearl Harbor" , correct: false},
        ]
    },

    {
        question: "A Guerra Fria foi uma disputa entre quais blocos políticos?",
        answers: [
            {text: "Estados Unidos e Alemanha" , correct: false},
            {text: "União Soviética e Japão" , correct: false},
            {text: "Estados Unidos e União Soviética" , correct: true},
            {text: "Reino Unido e China" , correct: false},
        ]
    },

    {
        question: "Qual foi o marco inicial da Revolução Industrial?",
        answers: [
            {text: "A invenção da máquina a vapor" , correct: true},
            {text: "A descoberta do petróleo" , correct: false},
            {text: "A invenção do motor a combustão" , correct: false},
            {text: "O surgimento das fábricas têxteis" , correct: false},
        ]
    },

    {
        question: "Qual país foi o berço do Renascimento?",
        answers: [
            {text: "França" , correct: false},
            {text: "Alemanha" , correct: false},
            {text: "Itália" , correct: true},
            {text: "Inglaterra" , correct: false},
        ]
    },

    {
        question: "Qual foi o presidente do Brasil no início da ditadura?",
        answers: [
            {text: "Juscelino Kubitschek" , correct: false},
            {text: "João Goulart" , correct: false},
            {text: "Castelo Branco" , correct: true},
            {text: "Ernesto Geisel" , correct: false},
        ]
    },

    {
        question: "Qual figura histórica descobriu que a Terra é redonda?",
        answers: [
            {text: "Nicolau Copérnico" , correct: false},
            {text: "Galileu Galilei" , correct: false},
            {text: "Cristóvão Colombo" , correct: false},
            {text: "Pitágoras" , correct: true},
        ]
    },

    {
        question: "Quem foi o primeiro presidente dos Estados Unidos?",
        answers: [
            {text: "Thomas Jefferson" , correct: false},
            {text: "Abraham Lincoln" , correct: false},
            {text: "George Washington" , correct: true},
            {text: "John Adams" , correct: false},
        ]
    },

];
