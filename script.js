const questions = [
    {
        question: "HTML ka full form kya hai?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "CSS ka use kis liye hota hai?",
        answers: [
            { text: "Website ko style karne ke liye", correct: true },
            { text: "Database banane ke liye", correct: false },
            { text: "Server create karne ke liye", correct: false },
            { text: "File delete karne ke liye", correct: false }
        ]
    },
    {
        question: "JavaScript kis type ki language hai?",
        answers: [
            { text: "Programming language", correct: true },
            { text: "Markup language", correct: false },
            { text: "Styling language", correct: false },
            { text: "Database", correct: false }
        ]
    },
    {
        question: "CSS mein text ka color change karne ke liye kya use hota hai?",
        answers: [
            { text: "color", correct: true },
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "background-color", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    quizElement.classList.remove("hide");
    resultElement.classList.add("hide");

    nextButton.innerHTML = "Next";

    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showResult() {
    quizElement.classList.add("hide");
    resultElement.classList.remove("hide");

    scoreElement.innerHTML =
        `Aapka score: ${score} / ${questions.length}`;
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

nextButton.addEventListener("click", handleNextButton);

startQuiz();
