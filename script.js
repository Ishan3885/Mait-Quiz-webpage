// Load questions from localStorage or default
let quizData = JSON.parse(localStorage.getItem("quizData")) || [
  {
    question: "Which year was the college established?",
    options: ["1990", "1985", "2000", "1975"],
    answer: 1,
    explanation: "The college was founded in 1985."
  },
  {
    question: "Which department offers AI courses?",
    options: ["Mechanical", "Civil", "Computer Science", "Biology"],
    answer: 2,
    explanation: "AI is under Computer Science."
  }
];

let currentQuestion = 0;
let score = 0;
let selected = null;

// Screens
const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const adminScreen = document.getElementById("admin-screen");

// Buttons
document.getElementById("startQuizBtn").onclick = startQuiz;
document.getElementById("adminLoginBtn").onclick = adminLogin;
document.getElementById("submitBtn").onclick = submitAnswer;
document.getElementById("restartBtn").onclick = goHome;
document.getElementById("adminBackBtn").onclick = goHome;
document.getElementById("saveQuestionsBtn").onclick = saveQuestions;

// Quiz Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreText = document.getElementById("scoreText");

// Start Quiz
function startQuiz() {
  homeScreen.style.display = "none";
  quizScreen.style.display = "block";
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

// Load Question
function loadQuestion() {
  selected = null;
  feedbackEl.textContent = "";

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => {
      document.querySelectorAll(".options button")
        .forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selected = index;
    };

    optionsEl.appendChild(btn);
  });
}

// Submit Answer
function submitAnswer() {
  if (selected === null) {
    alert("Please select an option");
    return;
  }

  const q = quizData[currentQuestion];

  if (selected === q.answer) {
    score++;
    feedbackEl.textContent = "Correct! " + q.explanation;
  } else {
    feedbackEl.textContent = "Wrong! " + q.explanation;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1200);
}

// Show Result
function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  scoreText.textContent = `Your Score: ${score} / ${quizData.length}`;
}

// Go Home
function goHome() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "none";
  adminScreen.style.display = "none";
  homeScreen.style.display = "block";
}

// Admin Login
function adminLogin() {
  const pass = prompt("Enter admin password:");
  if (pass === "admin123") {
    homeScreen.style.display = "none";
    adminScreen.style.display = "block";
    document.getElementById("questionEditor").value =
      JSON.stringify(quizData, null, 2);
  } else {
    alert("Incorrect password");
  }
}

// Save Questions
function saveQuestions() {
  try {
    const updated = JSON.parse(
      document.getElementById("questionEditor").value
    );
    quizData = updated;
    localStorage.setItem("quizData", JSON.stringify(quizData));
    alert("Questions Updated!");
  } catch {
    alert("Invalid JSON format");
  }
}